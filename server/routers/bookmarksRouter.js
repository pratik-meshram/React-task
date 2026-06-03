import express from "express";
const router = express.Router();

import * as bookmarksController from "../controller/bookmarksController.js";

router.post("/bookmarks", bookmarksController.saveBookmarks);
router.get("/bookmarks", bookmarksController.getBookmarks);
router.delete("/bookmarks/:question_id", bookmarksController.deleteBookmark);

export default router;
