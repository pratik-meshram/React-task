import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Client } = pg;

const database = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_password,
    database: process.env.DB_NAME,
});

database.connect()
    .then(() => {
        console.log("Database is connected...");
    })

    .catch((err) => {
        console.error("Connection error:", err);
    });


export default database;