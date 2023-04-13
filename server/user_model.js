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



//project needs
    //login function
const login = (body) => {
    return new Promise(function(resolve, reject){

        //the names of the const may change OR
        //match what's already here to work
        //will investiage later 
        const {email, password} = body;
        pool.query(`SELECT * FROM users WHERE email = $1`, [email], (error,results) => {
            if (error){
                reject(error)
            }
            if(results){
                if(password != results.rows[0].password){
                    resolve("The provided password is incorrect");
                }
                if(password === results.rows[0].password){
                    resolve(results.rows[0]);
                    //may or may not need to add pieces for jwtokens. uncertain at this time
                }
            }
        })
    })
}
    
//create user
const createUser = (body) => {
    return new Promise(function(resolve, reject) {
        const {email, password, password_check } = body;

        if(password != password_check){
            return reject("The two passwords do not match.")
        }

        pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', 
            [email, password], 
            (error, results) => {
                if(error){
                    reject(error)
                }
                
                const user_id = results.rows[0].user_id;
                const user_email = results.rows[0].user_email;
                const payload = { email: user_email }; // Create a payload object
                const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
                const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' }); // Generate access token


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
    createUser,
    getUsers
}