import database from "../config/db.js";


const questionAsk = async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const userId = req.user.id;

        await database.query(
            "INSERT INTO questionTable (title, description, user_id,tags) VALUES ($1, $2, $3,$4)",
            [title, description, userId, tags]
        );
        // console.log(title, description, userId);

        return res.status(201).json({
            message: "Question added successfully",
            data: {
                title,
                description,
                tags
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};


const getQuestion = async (req, res) => {
    try {
        const result = await database.query(
            `SELECT * FROM questionTable ORDER BY id ASC;`
        );

        return res.status(200).json({
            message: "Questions fetched successfully",
            data: result.rows
        })

    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};


const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await database.query(
            "SELECT * FROM questionTable WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Question not found"
            });
        }

        return res.status(200).json({
            message: "Question fetched successfully",
            data: result.rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};

const updateQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, tags } = req.body;

        await database.query(
            `UPDATE questionTable
             SET title = $1 , description =$2,tags=$3
             WHERE id = $4`,
            [title, description, tags, id,]
        );

        return res.status(200).json({
            message: "Question updated successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};


const deleteQuestionById = async (req, res) => {
    try {
        const { id } = req.params;

        await database.query(`
            DELETE FROM questionTable WHERE id=$1`,
            [id]
        );

        return res.status(200).json({
            message: "question deleted successfully"
        })


    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
}


export {
    questionAsk,
    getQuestion,
    getQuestionById,
    updateQuestionById,
    deleteQuestionById
};