import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import fetchDataRouter from "./routes/fetchData.Route.js";

const app = express();
const port = 3000;


app.use(express.json());
app.use(cors());

app.use('/api/fetch',fetchDataRouter);

mongoose.connect("mongodb://localhost:27017/saleData").then(()=>console.log("database connected")).catch((e)=>console.log("error occurs"))

app.listen(port , ()=>{
    console.log("Server is running on port 3000");
})

