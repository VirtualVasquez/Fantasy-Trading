require("dotenv").config();
const jwt = require('jsonwebtoken');

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

//get transactions
const getTransactions = async(body) => {
  try{
    const results = await pool.query();
  }
  catch(err){

  }
}


//buy share(s)
  //

//sell shares(s)
  //





module.exports = {
  getTransactions
}