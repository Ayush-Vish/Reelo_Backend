import mongoose from "mongoose";

const paperModel = new mongoose.Schema({
    questions :{
        type : Array
    }, 
    title : {
        type : String ,
        lowercase: true
    }, 
    marks: {
        type : Number
        
    }
})



export default mongoose.model("PaperSchema" , paperModel);
