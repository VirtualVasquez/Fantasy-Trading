require("dotenv").config();


// //needed for postgresql
// //not yet implementing
// const Pool = require('pg').Pool
// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// });



// //project needs
// //The following are models to use with postgres
// //we're defining them for now to see structure of project.
// //not yet using
    // //login function
    const login = (body) => {
        return new Promise(function(resolve, reject){

            //the names of the const may change OR
            //match what's already here to work
            //will investiage later 
            const {user_name, user_pass} = body;
            pool.query(`SELECT * FROM users WHERE user_name = $1`, [user_name], (error,results) => {
                if (error){
                    reject(error)
                }
                if(results){
                    if(user_pass != results.rows[0].user_pass){
                        resolve("The provided password is incorrect");
                    }
                    if(user_pass === results.rows[0].user_pass){
                        resolve(results.rows[0]);
                        //may or may not need to add pieces for jwtokens. uncertain at this time
                    }
                }
            })
        })
    }
    
    // //create user
    const createUser = (body) => {
        return new Promise(function(resolve, reject) {
            
            //the names of the const may change OR
            //match what's already here to work
            //will investiage later 
            const {user_name, user_pass, pass_check } = body;
            pool.query('INSERT INTO users (user_name, user_pass) VALUES ($1, $2) RETURNING *', [user_name, user_pass], (error, results) => {
                if(error){
                    reject(error)
                }
                if(user_pass != pass_check){
                    resolve("The two passwords do not match.")
                }
                if(user_pass === pass_check){
                    resolve(results.rows[0]);
                }
    
                resolve(`A new user has been added`)
            })
        })
    }

    //logout user??
    //not defined in last project because that simply 