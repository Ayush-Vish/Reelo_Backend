import mongoose from "mongoose"

const QuestionsSchema  = new mongoose.Schema({

    question:String, 
    subject :String, 
    topic : String, 
    difficulty: String,
    marks: Number
})


export default mongoose.model('QuestionsModel', QuestionsSchema);
