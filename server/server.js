require('dotenv').config();

const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(express.json())

let users = []

//not needed in the final project
//keeping for now for testing purposes
app.get('/users', (req, res) => {
    res.json(users)
})

////project needs
    //create a user
    app.post('/users', async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = { name: req.body.name, password: hashedPassword }
            users.push(user)
            res.status(201).send();
        } catch { 
            res.status(500).send();
        }
    })

    //login a user
    app.post('/users/login', async (req, res) => {

        //currently use local variable as storage
        //refactor later to use DB
        const user = users.find(user => user.anme === req.body.name)

        if (user == null) {
            return res.status(400).send('Cannot find user')
        }

        try{
            if(await bcrypt.compare(req.body.password, user.password)){
                res.send('Success')
            } else {
                res.send('Not allowed');
            }
        } catch {
            res.status(500).send();
        }
    })

    //signout a user
        //maybe doesn't need to be defined here?
        //token stored in browser. Removing that "logsout the user"
        //Not sure if jwtoken changes that


//will need this to validate user and user actions
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); //invalid token
        req.user = user
        next();
    });    
}


// // not needed in final project.
// // keeping commented out for reference
// // shows how to use token as middleware to authenticate user actions
// // vital since we're dealing with (fake) currency
// // app.get('/posts', authenticateToken, (req, res) => {
// //    res.json(posts.filter(post => post.username === req.user.name))
// //    res.json(posts);
// // })

app.listen(3000)