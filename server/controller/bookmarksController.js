import database from "../config/db.js";

const saveBookmarks = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { question_id } = req.body;

        // Validation
        if (!question_id) {
            return res.status(400).json({
                message: "Question ID is required"
            });
        }

        // Check already bookmarked or not
        const existing = await database.query(
            "SELECT * FROM bookmarkTable WHERE user_id = $1 AND question_id = $2",
            [user_id, question_id]
        );

        if (existing.rows.length > 0) {
            return res.status(400).json({
                message: "Question already bookmarked"
            });
        }

        // Save bookmark
        await database.query(
            "INSERT INTO bookmarkTable (user_id, question_id) VALUES ($1, $2)",
            [user_id, question_id]
        );

        return res.status(201).json({
            message: "Bookmark saved successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};



const getBookmarks = async (req, res) => {
    try {
        const user_id = req.user.id;
        //usingg JOINS to Conbine two table to fetch the questions dataa..
        const result = await database.query(
            `
            SELECT
                b.id AS bookmark_id,
                q.id AS question_id,
                q.title,
                q.description,
                u.name AS question_owner
            FROM bookmarkTable b
            JOIN questionTable q
                ON b.question_id = q.id
            JOIN users u
                ON q.user_id = u.id
            WHERE b.user_id = $1
            `,
            [user_id]
        );

        return res.status(200).json({
            message: "Bookmarks fetched successfully",
            data: result.rows
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


//delete
const deleteBookmark = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { question_id } = req.params;

        const result = await database.query(
            `
            DELETE FROM bookmarkTable
            WHERE user_id = $1 AND question_id = $2
            `,
            [user_id, question_id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Bookmark not found"
            });
        }

        return res.status(200).json({
            message: "Bookmark removed successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};



export {
    saveBookmarks,
    getBookmarks,
    deleteBookmark
};