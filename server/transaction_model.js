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
    // console.log(transactions.rows);
    return transactions.rows;
  } catch (err) {
    console.error('Failed to verify access token:', err.message);
    throw err;
  }
};

function extractAccessToken(object){
  console.log(object);
  const headerAuth = object['authorization']
  if(!headerAuth){
    throw new Error('Missing authorization header');
  }
  const acccesToken = headerAuth.split(' ')[1];
  if(!acccesToken){
    throw new Error('Access token not provided');
  }
  return acccesToken;
};

//make transaction
const makeTransaction = async (body, headers) => {

  const {transaction_type, company_name, nyse_symbol, shares, price } = body;
  let verb;

  transaction_type == 'BUY'
  ? (verb = 'bought')
  : transaction_type == 'SELL'
  ? (verb = 'sold')
  : null;

  function formatToUSA(value) {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }


  if(transaction_type !== "BUY" && transaction_type !== "SELL"){
    throw new Error('User is neither buying nor selling stock');
  }

  //extract the token from the headers
  const acccesToken = extractAccessToken(headers);

  //verify the token
  const decoded = jwt.verify(acccesToken, process.env.ACCESS_TOKEN_SECRET);
  const user_id = decoded.user_id;

  try {

    await new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO transactions (user_id, transaction_type, company_name, nyse_symbol, shares, price) VALUES ($1, $2, $3, $4, $5, $6)',
        [user_id, transaction_type, company_name, nyse_symbol, shares, price],
        (error, results) => {
          if (error) {
            reject(error);
          }

          resolve({
            message: `You ${verb} ${shares} of ${nyse_symbol} - ${company_name} at ${ formatToUSA(price)} per share, for a total of ${ formatToUSA(shares * price)}`,
          });
        }
      );
    });

    // Return the response or any relevant data
    const response = {
      message: `You ${verb} ${shares} of ${nyse_symbol} - ${company_name} at ${ formatToUSA(price)} per share, for a total of ${ formatToUSA(shares * price)}`,
      // Add any other relevant data you want to include in the response
    };
    return response;
  } catch (err) {
    console.error('Transaction unsuccesful', err);
    throw err;
  }
};




module.exports = {
  getTransactions,
  makeTransaction
}