// Imports
const router = require('express').Router()
const bcrypt = require('bcryptjs')
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

router.post('/login', (req, res) => {
    const {username, password} = req.body

    if(!username && !password){
        res.status(401).json({message: 'Invalid login credentials'})
    }else {
        Users.findBy({username})
            .first()
            .then(user => {
                if(user && bcrypt.compareSync(password, user.password)){
                    req.session.loggedin = true
                    res.status(200).json({message: `Welcome back ${username}`})
                }
                else{
                    res.status(401).json({ messege: "Invalid Credentials" })
                }
            })
            .catch(err => {
                res.status(500).json({errorMessage: `There was an error with your ${req.method} request`})
            })
    }
})

router.get('/logout', (req,res) => {
    if(req.session){
        req.session.destroy(err => {
            if(err){
                res.send(`There was an error loggin out`)
            }else{
                res.send(`Leaving so soon?`)
            }
        })
    }else{
        res.end()
    }
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


