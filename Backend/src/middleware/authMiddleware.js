const jwt = require('jsonwebtoken');

async function authUser(req,res,next){

    const token = req.cookies.token;

    try{
        if(!token){
        return res.status(401).json({
            message: "Unauthrozed"
        });
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    

    req.user = decoded;
    next();

    }catch(error){
        return res.status(401).json({
            message: "Aunthorized",
            error: error.message
        })
    }
    
    
}

module.exports = {authUser}