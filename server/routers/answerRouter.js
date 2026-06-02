import express from "express";
const router = express.Router();

import * as answerController from "../controller/answerController.js";

router.post("/answer", answerController.submitAnswer);

router.get("/answer", answerController.getAnswer);

router.get("/answer/:question_id", answerController.getAnswerById);

router.put("/answer/:id", answerController.updateAnswer);

router.delete("/answer/:id", answerController.deleteAnswer);

export default router;