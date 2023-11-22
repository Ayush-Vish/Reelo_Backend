import paperModel from "../models/paper.model.js";
import questionModel from "../models/question.model.js";
import QuestionsModel from "../models/question.model.js";
import Apperror from "../utils/apperror.util.js";
import makePaper from "../utils/makePaper.util.js";

const storeQuestion = async (req, res, next) => {
  try {


    const questionObj = [
      {
        question: "Question 1",
        subject: "Subject 1",
        topic: "Topic 1",
        difficulty: "Easy",
        marks: 5,
      },
      {
        question: "Question 2",
        subject: "Subject 2",
        topic: "Topic 2",
        difficulty: "Medium",
        marks: 7,
      },
      {
        question: "Question 3",
        subject: "Subject 3",
        topic: "Topic 3",
        difficulty: "Hard",
        marks: 3,
      },
      {
        question: "Question 4",
        subject: "Subject 4",
        topic: "Topic 4",
        difficulty: "Easy",
        marks: 6,
      },
      {
        question: "Question 5",
        subject: "Subject 5",
        topic: "Topic 5",
        difficulty: "Medium",
        marks: 8,
      },
      {
        question: "Question 6",
        subject: "Subject 1",
        topic: "Topic 6",
        difficulty: "Hard",
        marks: 4,
      },
      {
        question: "Question 7",
        subject: "Subject 2",
        topic: "Topic 7",
        difficulty: "Easy",
        marks: 7,
      },
      {
        question: "Question 8",
        subject: "Subject 3",
        topic: "Topic 8",
        difficulty: "Medium",
        marks: 5,
      },
      {
        question: "Question 9",
        subject: "Subject 4",
        topic: "Topic 9",
        difficulty: "Hard",
        marks: 2,
      },
      {
        question: "Question 10",
        subject: "Subject 5",
        topic: "Topic 10",
        difficulty: "Easy",
        marks: 9,
      },
      {
        question: "Question 50",
        subject: "Subject 10",
        topic: "Topic 10",
        difficulty: "Hard",
        marks: 9,
      },
    ];

    let savedQuestion;

    for (let i = 0; i < questionObj.length; i++) {

      savedQuestion = await QuestionsModel.create({
        question: questionObj[i].question,
        subject: questionObj[i].subject,
        topic: `topic ${Math.ceil(Math.random() * 100) % 10}`,
        difficulty: questionObj[i].difficulty,
        marks: Math.ceil(Math.random() * 10),
      });
      savedQuestion.save();
    }

    return res.status(200).json({
      success: true,
      savedQuestion,
    });
  } catch (error) {
    return next(new Apperror(error.message, 400));
  }
};

const createPaper = async (req, res, next) => {
  try {
    const { marks, easy, medium, hard, title } = req.body;
    const total = easy + medium + hard;

    if (!marks || easy < 0 || medium < 0 || hard < 0) {
      return next(new Apperror("Please provide all the fields", 400));
    }

    if (total !== 100) {
      return next(new Apperror("Total percentage should be 100", 400));
    }

    const easyQuestionsMarks = Math.ceil((easy / 100) * marks);
    const mediumQuestionMarks = Math.ceil((medium / 100) * marks);
    const hardQuestionsMarks = Math.ceil((hard / 100) * marks);

    let easyQuestionsStore = await QuestionsModel.aggregate([
      {
        $match: {
          difficulty: "easy",
        },
      },
    ]);
    let mediumQuestionsStore = await QuestionsModel.aggregate([
      {
        $match: {
          difficulty: "medium",
        },
      },
    ]);
    let hardQuestionsStore = await QuestionsModel.aggregate([
      {
        $match: {
          difficulty: "hard",
        },
      },
    ]);

    easyQuestionsStore = makePaper(easyQuestionsStore, easyQuestionsMarks);
    mediumQuestionsStore = makePaper(mediumQuestionsStore, mediumQuestionMarks);
    hardQuestionsStore = makePaper(hardQuestionsStore, hardQuestionsMarks);

    const questionPaper = await paperModel.create({
      questions: [
        ...easyQuestionsStore,
        ...mediumQuestionsStore,
        ...hardQuestionsStore,
      ],
      title: "Test Paper",
      marks: marks,
    });

    return res.status(200).json({
      success: true,
      message: "Paper created successfully",
      questionPaper,
    });
  } catch (error) {
    return next(new Apperror(error.message, 400));
  }
};



export { createPaper, storeQuestion };
