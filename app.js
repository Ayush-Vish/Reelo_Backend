import express from "express";

import dotenv from "dotenv";
import makePaperRouter from "./routes/paper.routes.js";
import morgan from "morgan";
import connectToDB from "./config/db.config.js";

dotenv.config();

const app = express();

connectToDB();


app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/papers", makePaperRouter); // /api/v1/papers


app.use("*" , (req ,res) =>  {
    res.status(404).send({
        status: "fail",
        message: "Invalid route"
    })
})

export default app;