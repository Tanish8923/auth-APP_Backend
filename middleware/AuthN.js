const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.AuthN = (req , res , next) => {

    try {
        
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer " , "") ;

        // console.log("req.body : " , req.body.token);
        // console.log("cookie : " , req.cookies.token);
        // console.log("req.header : " , req.header("Authorization"));
        
        
        if(!token || token === undefined){
            return res.status(401).json({
                success : false , 
                message : "Token not found"
            })
        }
    
        try {
            
            const decode = jwt.verify(token , process.env.JWT_SECRET);
            // console.log(decode);
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