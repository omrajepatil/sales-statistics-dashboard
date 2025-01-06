import axios from "axios";
import data from "../models/data.model.js";


export const fetchAndStore = async(req,res)=>{
    try{
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json')
        const fetchedData = response.data;

        await data.deleteMany({});
        
        await data.insertMany(fetchedData);
        res.json({message: "Data fetched and inserted successfully"});
        
    }
    catch(e){
        console.log(e);
        res.status(500).json({status:false,message:"error ocuurs while fetching"})
    }
}


export const getData = async(req,res)=>{
    try{
        const response = await data.find({})
       
        res.status(200).json({status:true,data:response,message:"data fetched successfully"});
    }
    catch{
        res.status(500).json({status:false,message:"error ocuurs while fetching"})
    }
}

const monthMapping = {
    january: 1,
    february: 2,
    march: 3,
    april: 4,
    may: 5,
    june: 6,
    july: 7,
    august: 8,
    september: 9,
    october: 10,
    november: 11,
    december: 12,
  };


// Fetch data by month
export const getByMonth = async (req, res) => {
    try {
      // Get the month parameter and normalize it
      const { month } = req.params;
      const normalizedMonth = month.toLowerCase();
  
      // Check if the month is valid
      const monthNo = monthMapping[normalizedMonth];
      if (!monthNo) {
        return res.status(400).json({
          status: false,
          message: "Invalid month provided",
        });
      }
  
      // Run aggregation query
const transactions = await data.aggregate([
        {
          $addFields: {
            monthOfSale: { $month: "$dateOfSale" }, // Extract month
          },
        },
        {
          $match: {
            monthOfSale: monthNo, // Filter by month
          },
        },
      ]);
  
      res.status(200).json({
        data: transactions,
        status: true,
        message: "Data fetched by month",
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        status: false,
        message: "Error occurred while fetching data by month",
      });
    }
  };


export const getBytitle = async(req,res)=>{
    try{
        const {title} = req.query;
        const response = await data.find({title});
        res.json({data:response,status:true,message:"data fetched by title"});
    }
    catch(e){
        console.error(e);
    }
}

export const statistics = async(req,res)=>{
  try{
    const {month} = req.params;
    const normalMonth = month.toLowerCase();
    const monthNo = monthMapping[normalMonth];
    const response = await data.aggregate([
      {
        $addFields:{
          monthOfSale:{$month:"$dateOfSale"},
          
          },
      } ,     
    
      {
        
        $match: { monthOfSale: monthNo },
        
      },
      {
      $group:{
        _id: null,
        totalPrice : {$sum:"$price"},
        soldCount:{
          $sum:{ $cond:[{$eq: ["$sold", true]}, 1, 0]},
        },
        unsoldCount:{
          $sum:{ $cond:[{$eq: ["$sold", false]}, 1, 0]},
        },
      },

    },
    ]);
   
    res.json({data:response,status:true,message:"month Stastics"});
  }
  catch(e){
    console.log(e);
    res.status(500).json({status:false,message:"Something wrong"});
  }
}



export const barChartData = async (req, res) => {
  try {
    const { month } = req.params;
    const normalMonth = month.toLowerCase();
    const monthNo = monthMapping[normalMonth]; // Map month name to number

    if (!monthNo) {
      return res.status(400).json({ status: false, message: "Invalid month provided" });
    }

    const response = await data.aggregate([
      {
        $addFields: {
          monthOfSale: { $month: "$dateOfSale" }, // Extract the month from `dateOfSale`
        },
      },
      {
        $match: { monthOfSale: monthNo }, // Match items for the specified month
      },
      {
        $bucket: {
          groupBy: "$price", // Group items based on their price
          boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
          default: "901-above", // Label for items with price > 900
          output: {
            count: { $sum: 1 }, // Count the number of items in each bucket
          },
        },
      },
    ]);

    const formattedResponse = response.map((item, index) => {
      const ranges = [
        "0-100",
        "101-200",
        "201-300",
        "301-400",
        "401-500",
        "501-600",
        "601-700",
        "701-800",
        "801-900",
        "901-above",
      ];
      return {
        range: ranges[index] || item._id,
        count: item.count,
      };
    });

    res.json({
      data: formattedResponse,
      status: true,
      message: "Bar chart data generated successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
};


export const pieChartData = async (req, res) => {
  try {
    const { month } = req.params;
    const normalMonth = month.toLowerCase();
    const monthNo = monthMapping[normalMonth]; // Map month name to number

    if (!monthNo) {
      return res.status(400).json({ status: false, message: "Invalid month provided" });
    }

    const response = await data.aggregate([
      {
        $addFields: {
          monthOfSale: { $month: "$dateOfSale" }, // Extract the month from `dateOfSale`
        },
      },
      {
        $match: { monthOfSale: monthNo }, // Match items for the specified month
      },
      {
        $group: {
          _id: "$category", // Group by category
          itemCount: { $sum: 1 }, // Count the number of items in each category
        },
      },
      {
        $project: {
          _id: 0, // Exclude the MongoDB default `_id` field
          category: "$_id", // Include category
          itemCount: 1, // Include item count
        },
      },
    ]);

    res.json({
      data: response,
      status: true,
      message: "Pie chart data generated successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
};




