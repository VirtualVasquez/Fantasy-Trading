require('dotenv').config();

const express = require('express')
const cors = require('cors');
const app = express()
const jwt = require('jsonwebtoken');
const port = process.env.port || 3001;
const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

const user_model = require('./user_model.js');
const transaction_model = require('./transaction_model.js');
const finnhub_model = require('./finnhub_model.js');


app.use(express.json())


////project needs
    //create a user
    app.post('/users', async (req, res) => {

        user_model.createUser(req.body).then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
    })

    //login a user
    app.post('/users/login', async (req, res) => {

        user_model.login(req.body).then(response => {
            try {
                res.status(200).send(response);
            } catch (error) {
                console.error(error);
                res.status(500).send({ error: "Internal Server Error" });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({ error: "Internal Server Error" });
        })
    })

    //logout a user
    app.delete('/users/logout', async (req, res) => {

        user_model.logout(req.body).then(response => {
            try {
                res.status(204).send(response);
            } catch (error) {
                console.error(error);
                res.status(500).send({ error: "Internal Server Error" })
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({error: "Internal Server Error"})
        })

    })

    //get user's transactions
    //id is from jwt
    app.get('/transactions', async (req, res) => {
        try {
          const transactions = await transaction_model.getTransactions(req.query);
          res.status(200).send(transactions);
        } catch (err) {
          console.error(err);
          res.status(500).send("Error fetching transactions");
        }
    });

    //post 'buy' or 'sell' transaction
    app.post('/transactions', async (req, res) => {
        try {
            transaction_model.makeTransaction(req.body, req.headers).then(response => {
                res.status(200).send(response);
            })
        } catch (err) {
          console.error(err);
          res.status(500).send("Error making transaction");
        }
    });

    //lookup symbols through finnhub api
    app.get('/symbol-lookup', async (req, res) => { 
        try{
            const results = await finnhub_model.getCompanySymbols(req.query);
            res.status(200).send(results);
        } catch(err) {
            console.error(err);
        }
    })

    //lookup symbols through finnhub api
    app.get('/stock-quote', async (req, res) => { 
        try{
            const results = await finnhub_model.getStockQuote(req.query);
            res.status(200).send(results);
        } catch(err) {
            console.error(err);
        }
    })
    

    //validate token
    app.post('/token/validate', (req,res) => {
        return new Promise(function(resolve, reject){
            const {accessToken} = req.body;
    
            if (!accessToken) {
                return res.status(401).json({ message: 'Access token not provided' });
            }
            try{
                const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET); // verify the access token
                return res.json(decoded);
            }
            catch (err){
                console.error('Failed to verify access token:', err.message);
                return res.status(401).json({ error: 'Invalid access token' });
            }    
        })
    })

    //only need if you want to persist an ACTIVE session past 30 minutes total
    //provide refreshToken when needed
    // app.post('/token', (req, res) => {
    //     //checks if refreshToken exists to then generate accessToken
    //     //does not store refreshToken
    //     const refreshToken = req.body.token;
    //     if (refreshToken == null ) return res.sendStatus(401)
    //     if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    //     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    //         if (err) res.sendStatus(403);
    //         const acccesToken = generateAccessToken({name: user.name});
    //         res.json({ accessToken: accessToken  })
    //     })
    // })




    // function generateAccessToken(user) {
    //     return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m' })
    // }

app.listen(port, () => {
    console.log('Server started on port 3001');
})