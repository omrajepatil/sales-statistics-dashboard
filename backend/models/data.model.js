import mongoose from "mongoose"


const dataSchema = new mongoose.Schema({
    id:{
        type: Number,
    },
    title:{
        type:String,
    },
    price:{
        type:Number,
    },
    description:{
        type:String,
    },
    category:{
        type:String,
    },
    image:{
        type:String,
    },
    sold:{
        type:Boolean,
    },
    dateOfSale:{
        type:Date,
    }

})

const data = mongoose.model('data',dataSchema);

export default data;