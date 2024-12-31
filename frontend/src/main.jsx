import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import Table from './components/Table';
import Statistics from './components/Statistics';
import Bar from './components/Bar';
import PieComponent from './components/Pie';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Parent route
    children: [
      { path: '/', element: <Table /> }, // Default route
      { path: '/statistics', element: <Statistics /> },
      { path: '/bar', element: <Bar /> },
      { path: '/pie', element: <PieComponent /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
