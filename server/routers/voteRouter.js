import express from "express";
const router = express.Router();

import * as voteController from "../controller/voteController.js";

router.post("/question/:id/upvote", voteController.upVote);
router.post("/question/:id/downvote", voteController.downVote);

export default router;