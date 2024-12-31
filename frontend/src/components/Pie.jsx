import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { PieChart } from '../services/dataFetch'; // Assuming this contains the API call function
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieComponent() {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState('');
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        if (month) {
          const response = await PieChart(month);
          setData(response.data);

          // Transform data for Chart.js
          const labels = response.data.map((item) => item.category);
          const values = response.data.map((item) => item.itemCount);

          setChartData({
            labels,
            datasets: [
              {
                label: 'Items per Category',
                data: values,
                backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                  '#4BC0C0',
                  '#9966FF',
                  '#FF9F40',
                ],
                hoverBackgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                  '#4BC0C0',
                  '#9966FF',
                  '#FF9F40',
                ],
              },
            ],
          });
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchPieChartData();
  }, [month]);

  const handleMonth = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Pie Chart for {month || 'Selected Month'}</h1>
      <input
        type="text"
        placeholder="Enter Month (e.g., January)"
        value={month}
        onChange={handleMonth}
        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-8 w-80 text-center"
      />
      {chartData ? (
        <div className="w-full md:w-1/2 lg:w-1/3">
          <Pie
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }}
          />
        </div>
      ) : (
        <p className="text-gray-500">Enter a month to see the pie chart.</p>
      )}
    </div>
  );
}

export default PieComponent;
