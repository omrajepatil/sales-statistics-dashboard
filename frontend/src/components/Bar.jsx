import React, { useEffect, useState } from 'react';
import { barChart } from '../services/dataFetch';
import { Bar as BarChart } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Bar() {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState('');

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        if (month) {
          const response = await barChart(month);
          setData(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchBarChartData();
  }, [month]);

  const handleMonth = (e) => {
    setMonth(e.target.value);
  };

  const chartData = {
    labels: data.map((item) => item.range), // Use the `range` as labels
    datasets: [
      {
        label: 'Number of Sales',
        data: data.map((item) => item.count), // Use the `count` as data
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Sales Data for ${month}`,
      },
    },
    maintainAspectRatio: false, // Helps prevent resize issues
  };

  return (
    <div className="container">
      <h1 className="text-xl font-bold mb-4">Bar Chart of {month}</h1>
      <input
        type="search"
        placeholder="Select Month"
        value={month}
        onChange={handleMonth}
        className="border rounded p-2 mb-6 text-center shadow-sm"
      />
      <div style={{ height: '400px', width: '100%' }}>
        {data.length > 0 ? (
          <BarChart data={chartData} options={chartOptions} />
        ) : (
          <p className="text-gray-600">No data available for the selected month</p>
        )}
      </div>
    </div>
  );
}

export default Bar;
