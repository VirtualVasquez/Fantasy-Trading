require('dotenv').config();

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');//move to models

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
    app.delete('/users/logout', (req, res) => {
        //in final version, refreshToken would be deleted from refreshToken DB
        refreshTokens = refreshTokens.filter( token => token !== req.body.token);

        //on the frontend (not here), also remove access token from localStorage
        res.sendStatus(204) //successfully delete token


        //something like this would be needed in the final version
        // were req.body.token would equal the access token stored in localStorage
        //  const accessToken = req.headers.authorization?.split(' ')[1]; // get the access token from the request headers

        // if (!accessToken) {
        //     return res.sendStatus(401);
        // }

        // try {
        //     const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET); // verify the access token
        //     refreshTokens = refreshTokens.filter((token) => token.userId !== decoded.id); // delete the corresponding refresh token from the database
        //     res.sendStatus(204);
        // } catch (error) {
        //     res.sendStatus(401);
        // }
    })

    //provide refreshToken when needed
    app.post('/token', (req, res) => {
        //checks if refreshToken exists to then generate accessToken
        //does not store refreshToken
        const refreshToken = req.body.token;
        if (refreshToken == null ) return res.sendStatus(401)
        if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) res.sendStatus(403);
            const acccesToken = generateAccessToken({name: user.name});
            res.json({ accessToken: accessToken  })
        })
    })




    function generateAccessToken(user) {
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m' })
    }

app.listen(3001)
