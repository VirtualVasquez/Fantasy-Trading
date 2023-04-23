require('dotenv').config();

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const port = process.env.port || 3001;


const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

const user_model = require('./user_model.js');

app.use(express.json())


//not needed in the final project
//keeping for now for testing purposes
app.get('/users', (req, res) => {
    user_model.getUsers()
    .then(response => {
        res.status(200).send(response);
    })
})

////project needs
    //create a user
    app.post('/users', async (req, res) => {

        user_model.createUser(req.body).then(response => {
            res.status(200).send(response);
            console.log(response);
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

    //validate token
    app.post('/token/validate', (req,res) => {
        const {accessToken} = req.body;
    
        if (!accessToken) {
            return res.status(401).json({ message: 'Access token not provided' });
        }
    
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
            .then(decoded => {
                return res.json(decoded);
            })
            .catch(err => {
                console.error('Failed to verify access token:', err.message);
                return res.status(401).json({ message: 'Invalid access token' });
            });
    });
    

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

app.listen(3001)
