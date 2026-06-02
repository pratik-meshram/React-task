import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {

    try {
        const bearerHeader = req.headers['authorization']

        if (!bearerHeader) {
            return res.status(401).json({
                message: "Access denied. No token provided."
            });
        }

        const token = bearerHeader.split(" ")[1];
        const user = jwt.verify(
            token,
            process.env.JWT_KEY
        );
        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            message: "invalid or expired token",
            error: error.message
        });
    }
}

export default auth;