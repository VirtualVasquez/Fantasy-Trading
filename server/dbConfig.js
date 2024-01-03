require('dotenv').config({ path: '../.env' });
const { Pool } = require('pg');

//if running in Docker, DB_HOST in .env should equal 'db'
//if running in local env, DB_HOST in .env should equal 'localhost'

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

module.exports = pool;