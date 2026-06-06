import express from "express";
import database from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import auth from "./middleware/auth.middleware.js";

import userData from "./routers/userRouter.js";
import questions from "./routers/questionRouter.js";
import answers from "./routers/answerRouter.js";
import bookmarks from "./routers/bookmarksRouter.js";
import vote from "./routers/voteRouter.js";

dotenv.config();
const app = express();


app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);


app.use(express.json());

app.use("/api", userData);

//authentication routes with jwt
app.use(auth);
app.use("/api", questions);
app.use("/api", answers);
app.use("/api", bookmarks);
app.use("/api", vote);





app.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}`);
})