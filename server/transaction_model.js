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

const getTransactions = async (params) => {
  const {accessToken} = params;

  if (!accessToken) {
      console.error('Access token not provided');
      return null;
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET); // verify the access token
    const user_id = decoded.user_id;
    const transactions = await pool.query(
      'SELECT * FROM transactions WHERE user_id = $1', [user_id]
    );
    console.log(transactions.rows);
    return transactions.rows;
  } catch (err) {
    console.error('Failed to verify access token:', err.message);
    throw err;
  }
};

//buy share(s)
  //

//sell shares(s)
  //





module.exports = {
  getTransactions
}