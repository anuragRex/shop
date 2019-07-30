const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if(!token) return res.status(401).json({message : "unauthorized : access denied"})

    try{
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = decoded;
        next();
    }
    catch(err){
        return res.status(401).json({
            message : "Invalid token"
        });
    }
}