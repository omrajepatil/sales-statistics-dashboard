import React, { useEffect, useState } from 'react';
import { fetchData, fetchByMonth, fetchByTitle} from '../services/dataFetch';

function Table() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  const recordsPerPage = 10;
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    const handleData = async () => {
      try {
        const response = await fetchData();
        setData(response.data || []);
        setFilteredData(response.data || []);
      } catch (e) {
        console.log(e);
        setData([]);
        setFilteredData([]);
      }
    };

    handleData();
  }, []);

  useEffect(()=>{
    const handleMonth = async()=>{
      try{
        if(selectedMonth){
          const response = await fetchByMonth(selectedMonth)
          setFilteredData(response.data || [])
        }
      }
      catch(e){
        console.log(e);
      }
    }

    handleMonth();
  },[selectedMonth])

useEffect(() => {
   
    const searchByTitle = async()=>{
      try{

        if(searchTerm === "all"){
          const response =await fetchData(searchTerm);
          setFilteredData(response.data || [])
        }
        else if(searchTerm ){
          const response =await fetchByTitle(searchTerm);
          setFilteredData(response.data || [])
        }
        
      }
      catch(e){
        console.log(e);
      }
    }

    searchByTitle();

}, [searchTerm,data]);

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + recordsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      <div className="flex justify-between items-center p-4">
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="border rounded p-2"
          />
        </div>
        <div>
        <a href="/statistics"><button>Monthly Stastics</button></a>
        
        </div>
        <div>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="border rounded p-2"
          >
            <option value="">All Months</option>
            {months.map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>
        </div>
      </div>

      <table className="m-4 mt-12 border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Image</th>
            <th>Sold</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan="8">No data available</td>
            </tr>
          ) : (
            currentData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.description.slice(0, 50)}...</td>
                <td>{item.category}</td>
                <td>
                  <img src={item.image} alt={item.title} width="50" />
                </td>
                <td>{item.sold}</td>
                <td>{item.dateOfSale}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center p-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="border rounded p-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>

        <span>Page {currentPage} of {totalPages}</span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="border rounded p-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Table;
