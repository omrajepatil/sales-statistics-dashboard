import axios from "axios";
// const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:3000/api/fetch";

const baseURL = "https://sales-statistics-dashboard.onrender.com/api/fetch"



export const fetchData = async()=>{
    try{
        const response = await axios.get(`${baseURL}/getFromDatabase`)
        // console.log(response.data.data);
        return response.data;
        
    }
    catch(e){
        console.log(e);
    }
}


export const fetchByMonth = async(month)=>{
    try{
        const response = await axios.get(`${baseURL}/get/${month}`)
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}

export const fetchByTitle = async(title)=>{
    try{
        const response = await axios.get(`${baseURL}/title?title=${title}`)
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}


export const statsByMonth = async(month)=>{
    try{
        const response = await axios.get(`${baseURL}/stats/${month}`)
        console.log(response.data);
        return response.data
    }
    catch(e){
        console.log(e);
    }
}

export const barChart = async(month)=>{
    try{
        const response = await axios.get(`${baseURL}/bar-chart/${month}`)
        console.log(response.data)
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}


export const PieChart = async(month)=>{
    try{
        const response = await axios.get(`${baseURL}/pie-chart/${month}`)
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}
