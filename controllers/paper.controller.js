import QuestionsModel from "../models/question.model.js"
import Apperror from "../utils/apperror.util.js"

const storeQuestion = async (req , res, next) => {
    try {
        const {question ,marks,subject,topic,difficulty} = req.body; 

        if(!question || !marks || !subject ||!topic || !difficulty){
            return next(new Apperror("Please provide the question", 400))
        }
        const savedQuestion = await QuestionsModel.create({
            question, 
            subject , 
            topic , 
            difficulty,
            marks
        })
        return res.status(200).json({
            success: true, 
            savedQuestion
        })
        


    } catch (error) {
        return next(new Apperror(error.message, 400))
    }
}

const createPaper = async (req ,res,next ) => {
    try {
        const {marks , easy , medium , tough} = req.body;
        const total = easy + medium + tough;
        if(!marks || !easy || !medium || !tough) {
            return next(new Apperror("Please provide all the fields", 400));
        }
        if(total !==100){
            return next(new Apperror("Total percentage should be 100", 400));
        }
        const paper = makePaper(marks, easy, medium, tough);
        

        
        return res.status(200).json({
            success: true,
            message: "Paper created successfully"
        })
    } catch (error) {
        return next(new Apperror(error.message, 400));
    }
}

export   {
    createPaper, 
    storeQuestion
}