
const { Pool } = require("pg");
require("dotenv").config();

const url = process.env.DATABASE_URL || "";
const isLocal = url.includes("localhost") || url.includes("127.0.0.1");

const pool = new Pool({
    connectionString: url,
    // Local PostgreSQL has no SSL; hosted databases (Render, etc.) need it.
    ssl: isLocal ? false : { rejectUnauthorized: false },
});

pool.on("connect", () => {
    console.log("Connected to PostgreSQL");
});

pool.on("error", (err) => {
    console.error("Unexpected PostgreSQL error:", err);
});

module.exports = pool;