import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import Table from './components/Table.jsx'
import Statistics from './components/Statistics.jsx'
import Bar from './components/Bar.jsx'



const router = createBrowserRouter([
  {
    path:'/',
    element:<Table />
  },
  {
    path:'/statistics',
    element:<Statistics />
  },
  {
    path:'/bar',
    element:<Bar />
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  
  </StrictMode>,
)
