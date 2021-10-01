const express = require('express')
const Users = require('./users/users-data.js')

const server = express()

server.use(express.json())

server.get('/api/users', async (req, res) => {
    try {
        res.status(200).json(Users)
    } catch (err) {
        res.status(500).json({
            message: err.message,
            customeMessage: "The users information could not be retrieved"
        })
    }
})

server.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            res.status(400).json({
                message: "Please provide username and password for this user"
            })
        } else {
            const newUser = Users.push({ username, password })
            res.status(201).json(newUser)
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
            customMessage: "The users information could not be retrieved"
        })
    }
})

server.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        } else {
            let foundUser;
            Users.forEach(user => {
                if (user.username == username) {
                    foundUser = user;
                }
            })
            if (!foundUser) {
                res.status(400).json({
                    message: "There is no user with that username"
                })
            }
            else if (foundUser.password == password){
                res.status(200).json({
                  message: `Welcome ${foundUser.username}!`  
                })
            } else {
                res.status(400).json({
                    message: "Password is not correct"
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
            customMessage: "The users could not be found"
        })
    }
})


module.exports = server;