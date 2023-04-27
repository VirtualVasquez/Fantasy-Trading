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



const login = (body) => {
    return new Promise(function(resolve, reject){
        const {email, password} = body;

        pool.query(`SELECT * FROM users WHERE email = $1`, [email], (error,results) => {
            if (error){
                reject(error)
            }
            if(results){
                const storedPassword = results.rows[0].password;
                if(password !== storedPassword){
                    resolve("The provided password is incorrect");
                }
                
                const user_id = results.rows[0].user_id;
                const user_email = results.rows[0].email;
                const payload = {user_id: user_id}
                const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
                const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' }); // Generate access token

                // Use ON CONFLICT clause to handle conflicts on the database side
                pool.query(
                    'INSERT INTO refresh_tokens (user_id, token) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET token = $2',
                    [user_id, refreshToken],
                    (error, results) => {
                        if (error) {
                            reject(error);
                        }
                        resolve({
                            message: `A user has logged in with email: ${user_email}`,
                            accessToken: accessToken 
                        });
                    }
                );
                
            } else {
                resolve("No user found with the provided email");
            }
        })
    })
}

const logout = (body) => {
    return new Promise(function(resolve, reject){
        const {accessToken} = body;

        if (!accessToken) {
            return reject(new Error('Access token not provided'));
        }

        try{
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET); // verify the access token
            return decoded;
        }
        catch (err){
            console.error('Failed to verify access token:', err.message);
        }

        const user_id = decoded.user_id;

        try{

            pool.query(
                'DELETE FROM refresh_tokens WHERE user_id = $1',
                [user_id], 
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve({
                            message: `User ID ${user_id}'s refresh token has been deleted.`,
                        })
                    }
                }
            )
        }
        catch (error){
            reject(new Error('Invalid access token'));
        }

    })

}

//create user
const createUser = (body) => {
    return new Promise(function(resolve, reject) {
      const { email, password, password_check } = body;
  
      if (password != password_check) {
        return reject("The two passwords do not match.")
      }
  
      pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', 
        [email, password], 
        (error, results) => {
          if (error) {
            reject(error);
          }
  
          const user_id = results.rows[0].user_id;
          const user_email = results.rows[0].email;
          const payload = { user_id: user_id }; // Create a payload object
          const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
          const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' }); // Generate access token
  
          // Insert a transaction record for the new user with a starting balance of $100,000
          pool.query(
            'INSERT INTO transactions (user_id, transaction_type, company_name, nyse_symbol, shares, price, total) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [user_id, 'DEPOSIT', 'N/A', 'N/A', 1, 100000.00, 100000.00],
            (error, results) => {
              if (error) {
                reject(error);
              }
  
              pool.query(
                'INSERT INTO refresh_tokens (user_id, token) VALUES ($1, $2)',
                [user_id, refreshToken],
                (error, results) => {
                  if (error) {
                    reject(error);
                  }
  
                  resolve({
                    message: `A new user has been added with ID: ${user_id}`,
                    accessToken: accessToken 
                  });
                }
              );
            }
          );
        }
      )
    })
  }


//get users
const getUsers = () => {
    return new Promise(function(resolve, reject){
        pool.query('SELECT email, user_id FROM users', (error, results) => {
            if (error){
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

module.exports = {
    login,
    logout,
    createUser,
    getUsers
}