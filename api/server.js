// Imports 
const express = require('express')
const apiRouter = require('./api-router.js')
const configureMiddleware = require('./configure-middleware.js')

const server = express()

configureMiddleware(server)

server.use('/', apiRouter)


module.exports = server