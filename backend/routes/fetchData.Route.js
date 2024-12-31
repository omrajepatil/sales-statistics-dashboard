import { fetchAndStore,getData, getByMonth,getBytitle, statistics, barChartData, pieChartData } from "../controllers/fetchData.js";
import { Router } from "express";

const fetchDataRouter = Router();

fetchDataRouter.get('/get',fetchAndStore);

fetchDataRouter.get('/getFromDatabase',getData);

fetchDataRouter.get('/get/:month',getByMonth);

fetchDataRouter.get('/title',getBytitle);

fetchDataRouter.get('/stats/:month',statistics);

fetchDataRouter.get('/bar-chart/:month',barChartData);

fetchDataRouter.get('/pie-chart/:month',pieChartData);

// fetchDataRouter.get('/combine/:month',combinedData);



export default fetchDataRouter
