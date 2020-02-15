// Dependency imports
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

// Custom Middleware
function logger(req,res, next){
    const date = new Date().toLocaleString()
    console.log(`${req.method} request made at ${date} to ${req.url} from ${req.hostname}`)
    next()
}

module.exports = server => {
    server.use(express.json())
    server.use(helmet())
    server.use(cors())
    server.use(logger)
}