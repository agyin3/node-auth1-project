const Users = require('../users/user-model.js')
const bcrypt = require('bcryptjs')

module.exports = (req, res, next) => {
    const {username, password} = req.headers

    if(!username && !password){
        console.log(username, password)
        res.status(401).json({message: 'Invalid login credentials'})
    }else {
        Users.findBy({username})
            .first()
            .then(user => {
                if(user && bcrypt.compareSync(password, user.password)){
                    next()
                }
                else{
                    res.status(401).json({ messege: "Invalid Credentials" })
                }
            })
            .catch(err => {
                res.status(500).json({errorMessage: `There was an error with your ${req.method} request`})
            })
    }
}

