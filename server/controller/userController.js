import database from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";




const newUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "required email and password"
            });
        }

        const userExist = await database.query(
            "SELECT email FROM users WHERE email=$1",
            [email]
        );

        if (userExist.rows.length > 0) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await database.query(
            `INSERT INTO users (name ,email, password) VALUES ($1,$2,$3)`,
            [name, email, hashPassword]
        );

        return res.status(201).json({ message: "User registered successfully",
           user: {
                name,
                email
            }
         })

    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message,
        });

    }
}



const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Check user exists
        const userExist = await database.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (userExist.rows.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Get user data
        const user = userExist.rows[0];

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        //jwt

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },

            process.env.JWT_KEY,
            {
                expiresIn: "1d"
            }

        );


        // Login success
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

export default { newUser, login };