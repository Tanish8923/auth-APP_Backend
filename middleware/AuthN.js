const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.AuthN = (req , res , next) => {

    try {
        
        const {token} = req.body || req.cookies ;

        if(!token){
            return res.status(401).json({
                success : false , 
                message : "Token not found"
            })
        }
    
        try {
            
            const decode = jwt.verify(token , process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode ;            
            next();
    
        } catch (error) {
            return res.status(401).json({
                success : false , 
                message : "Token not valid"
            })
        }
    } catch (error) {
        
        return res.status(500).json({
            success : false , 
            message : "Internal server error"
        })
    }
}