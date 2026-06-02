import database from "../config/db.js";


const submitAnswer = async (req, res) => {

    try {
        const user_id = req.user.id;
        const { answerText, question_id } = req.body;

        await database.query(
            "INSERT INTO answerTable (answerText, question_id, user_id) VALUES ($1, $2, $3)",
            [answerText, question_id, user_id]
        );

        return res.status(201).json({
            message: "Answer successfully submitted"
        })

    } catch (error) {

        return res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};


const getAnswer = async (req, res) => {
    try {
        const result = await database.query("SELECT * FROM answerTable");

        return res.status(200).json({
            message: "Answers fetched successfully",
            data: result.rows
        })

    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};

const getAnswerById = async (req, res) => {
    try {
        const { question_id } = req.params;
        const result = await database.query(
            "SELECT * FROM answerTable WHERE question_id = $1",
            [question_id]
        );

        return res.status(200).json({
            message: "Answers fetched successfully",
            data: result.rows
        })

    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};


const updateAnswer = async (req, res) => {
    try {
        const { id } = req.params;
        const { answerText } = req.body;

        await database.query(
            `UPDATE answerTable
             SET answerText = $1
             WHERE id = $2`,
            [answerText, id]
        );

        return res.status(200).json({
            message: "Answer updated successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};


const deleteAnswer = async (req, res) => {
    try {
        const { id } = req.params;

        await database.query(
            "DELETE FROM answerTable WHERE id = $1",
            [id]
        );

        return res.status(200).json({
            message: "Answer deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
}

export {
    submitAnswer,
    getAnswer,
    getAnswerById,
    updateAnswer,
    deleteAnswer
};