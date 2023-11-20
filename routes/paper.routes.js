import express from "express";

import { createPaper , storeQuestion} from "../controllers/paper.controller.js";

const router = express.Router();

router.route("/")
        .post(storeQuestion);

router.route("/create")
        .post(createPaper);

export default router;