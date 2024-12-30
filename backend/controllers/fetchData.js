import axios from "axios";
import data from "../models/data.model.js";


export const fetchData = async(req,res)=>{
    try{
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json')
        const fetchedData = response.data;

        await data.deleteMany({});
        await data.insertMany(fetchedData);
        res.json({message: "Data fetched and inserted successfully"});
        
    }
    catch(e){
        console.log(e);
        res.status(500).json({status:false,message:"error ocuurs whi;e fetching"})
    }
}


export const getData = async(req,res)=>{
    try{
        const response = await data.find({})
       
        res.status(200).json({response});
    }
    catch{
        res.status(500).json({status:false,message:"error ocuurs while fetching"})
    }
}
