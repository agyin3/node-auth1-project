// Dependency imports
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

// Create Server
const server = express()
server.use(express.json())

// use middleware
server.use(cors(), helmet(), logger)

module.exports = server

function logger(req,res, next){
    const date = new Date().toLocaleString()
    console.log(`${req.method} request made at ${date} to ${req.url} from ${req.hostname}`)
    next()
}