const userSchema = require("../../models/userModel");
const bcrypt = require("bcrypt");

exports.signUp = async(req , res) =>{
try {
    //fetch data
    const {name , email , password , role} = req.body;

    //check if user already exist
    const registeredEmail = await userSchema.findOne({email});
    if(registeredEmail){
        return res.status(400).json({
            success : false ,
            message : "Email already registered"
        })
    }

    //secure password
    let hashedPassword;

    try {

        hashedPassword = await bcrypt.hash(password , 10);

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Issue in password hashing"
        })
    }

    //create entry for user

    const user = await userSchema.create({
        name , email , password : hashedPassword , role
    })

    res.status(200).json({
        success : true ,
        message : "user created successfully"
    })

} catch (error) {
    
    console.log(error);
    
    return res.status(500).json({
        success : false , 
        message : "user can not be registerd , please try again later"
    })

}
}