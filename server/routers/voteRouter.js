import express from "express";
const router = express.Router();

import * as voteController from "../controller/voteController.js";

router.post("/questions/:id/upvote", voteController.upVote);
router.post("/questions/:id/downvote", voteController.downVote);

export default router();