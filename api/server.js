// Depencency Imports 
const express = require('express')
const session = require('express-session')
const helmet = require('helmet')
const cors = require('cors')
const knexSessionStore = require('connect-session-knex')(session)

// Router Imports
const authRouter = require('../auth/auth-router.js')
const userRouter = require('../users/user-router.js')

// Create Server 
const server = express()

// Session Options 
const sessionOptions = {
    name: 'CookieMonster',
    secret: 'NomNomNom',
    cookie: {
        maxAge: 60 * 60 * 1000,
        secure: false, // for testing purposes set to false
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false, 

    store: new knexSessionStore({
        knex: require('../data/dbConfig.js'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60
      })
}

// Custom Middleware
function logger(req,res, next){
    const date = new Date().toLocaleString()
    console.log(`${req.method} request made at ${date} to ${req.url} from ${req.hostname}`)
    next()
}

server.use(express.json())
server.use(helmet())
server.use(cors())
server.use(logger)
server.use(session(sessionOptions))

server.use('/api/auth', authRouter)
server.use('/api/users', userRouter)

server.get('/', (req,res) => {
    res.json({api: 'Welcome to party town'})
})


module.exports = server