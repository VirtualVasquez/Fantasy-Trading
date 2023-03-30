require('dotenv').config();

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');

app.use(express.json())

let refreshTokens = []

app.post('/token', (req, res) => {

    //normally store refreshToken in DB
    //for now, store locally in variable of refreshTokens
    const refreshToken = req.body.token;
    if (refreshToken == null ) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) res.sendStatus(403);
        const acccesToken = generateAccessToken({name: user.name});
        res.json({ accessToken: accessToken  })
    })
})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter( token => token !== req.body.token);
    res.sendStatus(204) //successfully delete token
})

app.post('/login', (req, res) => {
    //authenticate user
    //not covered in this video

    const username = req.body.username
    const user = {name: username }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken);
    res.json({accessToken: accessToken, refreshToken: refreshToken })
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m' })

}

app.listen(4000)