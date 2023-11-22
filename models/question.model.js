import mongoose from "mongoose"

const QuestionsSchema  = new mongoose.Schema({

    question:{
        type: String ,
        lowercase:true
    }, 
    subject :{
        type: String ,
        lowercase:true
    }, 
    topic : {
        type: String ,
        lowercase:true
    }, 
    difficulty: {
        type : String, 
        lowercase : true
    },
    marks: Number
})


export default mongoose.model('QuestionsModel', QuestionsSchema);
