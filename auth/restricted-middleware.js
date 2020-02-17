module.exports = (req, res, next) => {
    if(req.session.loggedin && (req.session.loggedin === true)) {
        next()
    }else{
        res.status(500).json({errorMessage: `There was an error with your ${req.method} request`})
    }
}




