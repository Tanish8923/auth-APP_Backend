

exports.isAdmin = (req , res , next) => {

    try {
        
        const role = req.user.role;
        if(role !== "Admin"){
            return res.status(401).json({
                success : false ,
                message : "You are not permit for Admin Dashboard"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success : false , 
            message : "Internal server error"
        })
    }
}