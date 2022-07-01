const jwt = require('jsonwebtoken')

exports.auth = (req, res, next) =>{
    const authHeader = req.header('Authorization')
    // (authHeader)

    const token = authHeader && authHeader.split(' ')[1]
    // ('token: ',token)

    if(!token){
        return res.status(401).send({
            message: "Access denied"
        })
    }
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY)
        req.user = verified 
        next()
    } catch (error) {
        (error),
        res.status(400).send({
            message: "Invalid Token"
        })
    }
}