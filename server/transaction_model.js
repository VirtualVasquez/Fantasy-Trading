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
//SELECT * FROM transactions WHERE user_id = 58

const getTransactions = async(body) => {

  try{
    const transactions = await pool.query(
      'SELECT * FROM transactions WHERE user_id = $1', [body]
    );
    console.log(transactions.rows);
    return transactions.rows;
  }
  catch(err){
    console.error("No transactions for user found");
    throw err;
  }
}


//buy share(s)
  //

//sell shares(s)
  //





module.exports = {
  getTransactions
}