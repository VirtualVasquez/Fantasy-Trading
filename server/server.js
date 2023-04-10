require('dotenv').config();

const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(express.json())


//will not need in the final version
//using now until DB established
let users = []


//function only designated to test login fucntionality with bcrypt
async function testCreateUser() {
    const hashedPassword = await bcrypt.hash("password", 10);
    const user = { name: 'Kyle', password: hashedPassword };
    users.push(user);
}
testCreateUser();
//=================================================================

let refreshTokens = [];

//not needed in the final project
//keeping for now for testing purposes
app.get('/users', (req, res) => {
    res.json(users)
})

////project needs
    //create a user
    app.post('/users', async (req, res) => {

        //check if username already exists in local variable
        //refactor later to use DB
        const userExists = users.find( user => user.name === req.body.name);

        if(userExists){
            return res.status(409).send('Username already exists.')
        }

        try {

            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = { name: req.body.name, password: hashedPassword }

            //add user to local variable
            //refactor later to push to db
            users.push(user)

            //when user pushed to db, create access and refresh tokens
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

            //refreshtoken gets stored in its own db, but for now stored in variable
            refreshTokens.push(refreshToken);

            res.status(201).json({acccesToken: accessToken});

        } catch { 
            res.status(500).send("Something went wrong");
        }
    })

    //login a user
    app.post('/users/login', async (req, res) => {

        //currently use local variable as storage
        //refactor later to use DB
        const user = users.find(user => user.name === req.body.name)

        if (user == null) {
            return res.status(400).send('Cannot find user')
        }

        try{
            if(await bcrypt.compare(req.body.password, user.password)){
                //when user found in db, create access and refresh tokens
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

                //refreshtoken gets stored in its own db, but for now stored in variable
                refreshTokens.push(refreshToken);

                //accesstoken gets sent back to client, and in the front end will be stored in localStorage
                //presence and validation of accessToken will be proof 
                res.json({accessToken: accessToken});
            } else {
                res.send('Not allowed');
            }
        } catch {
            res.status(500).send();
        }
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

app.listen(3000)

// //will need this to validate user and user actions
// //commented out until work begins with stocksAPI
// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (token == null) return res.sendStatus(401);

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403); //invalid token
//         req.user = user
//         next();
//     });    
// }

// // not needed in final project.
// // keeping commented out for reference
// // shows how to use token as middleware to authenticate user actions
// // vital since we're dealing with (fake) currency
// // will repurpose to only pull the transactions made by user
// // app.get('/posts', authenticateToken, (req, res) => {
// //    res.json(posts.filter(post => post.username === req.user.name))
// //    res.json(posts);
// // })

// app.listen(3000)