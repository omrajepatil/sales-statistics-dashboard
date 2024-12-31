import React, { useEffect, useState } from 'react'
import { statsByMonth } from '../services/dataFetch';

function Statistics() {
    const [month, setMonth] = useState('');
    const [statsData, setStatsData] = useState([]);


    useEffect(()=>{

        const searchByMonth = async()=>{
            try{
                if(month){
                    const response = await statsByMonth(month);
                    setStatsData(response.data);
                }
            }
            catch{
                console.log(e);
                
            }
        }
        searchByMonth();
       
    },[month])

    const handleMonth =(e)=>{
        setMonth(e.target.value);
    }
  return (
    <div className='flex flex-col'>
        <h1 className='flex justify-center mt-4 text-stone-950 text-xl'>Monthly Transaction Statistics</h1>
        <div className='flex justify-center mt-10'>
        <input type="search" name="" id="" placeholder='Search Month' value={month} onChange={handleMonth}  className='w-44 border border-black p-2 rounded-xl'/>
        </div> 
        {
            statsData.map((item)=>(
                <div className='flex flex-col items-center mt-10'>
                <h3>Total Price : {item.totalPrice}</h3>
                <h3>Sold Count : {item.soldCount}</h3>
                <h3>Unsold Count : {item.unsoldCount}</h3>
                </div>
                
            ))
        }

        <div className='flex justify-center mt-10'>
            <a href="/"className='m-5'><button className='w-32 border border-black bg-blue-600 p-2 rounded-md hover:bg-blue-400' >back</button></a>
            <a href="/bar" className='m-5'><button className='w-32 border border-black bg-blue-600 p-2 rounded-md hover:bg-blue-400' >Bar Chart</button></a>
            <a href="/pie" className='m-5'><button className='w-32 border border-black bg-blue-600 p-2 rounded-md hover:bg-blue-400' >Pie Chart</button></a>
        </div>
</div>
  )
}

export default Statistics