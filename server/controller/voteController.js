import database from "../config/db.js";


const upVote = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await database.query(
            "UPDATE questionTable SET votes = votes + 1 WHERE id = $1",
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Question not found"
            });
        }

        return res.status(200).json({
            message: "upvote done successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};


const downVote = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await database.query(
            "UPDATE questionTable SET votes = votes - 1 WHERE id = $1",
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Question not found"
            });
        }

        return res.status(200).json({
            message: "downvote done successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};


export {
    upVote,
    downVote
}