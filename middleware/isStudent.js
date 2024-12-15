
exports.isStudent = (req , res , next) => {

    try {
        
        const role = req.user.role;
        if(role !== "Student"){
            return res.status(401).json({           //use return is good practice
                success : false ,
                message : "You are not permit for Student Dashboard"
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