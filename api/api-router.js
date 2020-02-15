// Imports
const router = require('express').Router()
const authRouter = require('../auth/auth-router.js')
const userRouter = require('../users/user-router.js')

router.use('/auth', authRouter)
router.use('/users', userRouter)

router.get('/', (req,res) => {
    res.json({api: 'Welcome to party town'})
})

module.exports = router