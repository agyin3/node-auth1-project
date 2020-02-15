const router = require('express').Router()
const authorize = require('../auth/auth-middleware.js')
const Users = require('./user-model.js')

router.get('/', authorize, (req,res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({errorMessage: `You shall not pass`})
        })
})

module.exports = router