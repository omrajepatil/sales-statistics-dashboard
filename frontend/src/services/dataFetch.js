import axios from "axios";


export const fetchData = async()=>{
    try{
        const response = await axios.get('http://localhost:3000/api/fetch/getFromDatabase')
        // console.log(response.data.data);
        return response.data;
        
    }
    catch(e){
        console.log(e);
    }
}


export const fetchByMonth = async(month)=>{
    try{
        const response = await axios.get(`http://localhost:3000/api/fetch/get/${month}`)
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}

export const fetchByTitle = async(title)=>{
    try{
        const response = await axios.get(`http://localhost:3000/api/fetch/title?title=${title}`)
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}


export const statsByMonth = async(month)=>{
    try{
        const response = await axios.get(`http://localhost:3000/api/fetch/stats/${month}`)
        console.log(response.data);
        return response.data
    }
    catch(e){
        console.log(e);
    }
}

export const barChart = async(month)=>{
    try{
        const response = await axios.get(`http://localhost:3000/api/fetch/bar-chart/${month}`)
        console.log(response.data)
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}


export const PieChart = async(month)=>{
    try{
        const response = await axios.get(`http://localhost:3000/api/fetch/pie-chart/${month}`)
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}
