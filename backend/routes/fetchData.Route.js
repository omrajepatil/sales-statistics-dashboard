import { fetchData,getData } from "../controllers/fetchData.js";
import { Router } from "express";

const fetchDataRouter = Router();

fetchDataRouter.get('/get',fetchData);

fetchDataRouter.get('/getFromDatabase',getData);

export default fetchDataRouter
