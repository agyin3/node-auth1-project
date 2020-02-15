// Imports
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const authorize = require('./auth-middleware.js')
const Users = require('../users/user-model.js')

router.post('/register', (req, res) => {
    let user = req.body

    const hash = bcrypt.hashSync(user.password, 8)
    user.password = hash
    Users.add(user)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(err => {
            res.status(500).json({errorMessage: `There was an error with your ${req.method} request`})
        })
})

router.post('/login', authorize, (req, res) => {
    let {username} = req.headers
    res.status(200).json({message: `Welcome back ${username}`})
})

// router.post('/login', (req, res) => {
//     let {username} = req.headers
//     Users.findBy({username})
//         .then(users => {
//             res.status(200).json(users)
//         })
//         .catch(err => {
//             res.status(500).json({errorMessage: `There was an error`})
//         })
// })

module.exports = router


