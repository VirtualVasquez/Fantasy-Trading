require('dotenv').config();

const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// //from strings project, might not need

// //provides utilities for working with file and directory paths
//const path = require("path"); 

// //Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({
//     extended: true
// }));



app.use(express.json())

const posts = [
    {
        username: 'Kyle',
        title: 'Post 1'
    },
    {
        username: 'Jim',
        title: 'Post 1'
    }
]

const users = []


app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
    res.json(posts);
})

app.get('/users', (req, res) => {
    res.json(users)
})

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

app.post('/users/login', async (req, res) => {
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

////project needs
    //create a user

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

app.listen(3000)