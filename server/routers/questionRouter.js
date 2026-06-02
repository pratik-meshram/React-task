import express from "express";
const router = express.Router();

import * as questionController from "../controller/questionController.js";

router.post("/question", questionController.questionAsk);
router.get("/question", questionController.getQuestion);
router.get("/question/:id", questionController.getQuestionById);
router.put("/question/:id", questionController.updateQuestionById);
router.delete("/question/:id", questionController.deleteQuestionById);

export default router;