const userSchema = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.logIn = async (req , res) => {

    try {
        
        //fetch data
        const {email , password} = req.body;
    
        //validate data
        if( !email || !password){

            return res.status(400).json({
                success : false ,
                message : "Please fill all fields carefully"
            })
        }
    
        //user registered or not
        let registeredUser = await userSchema.findOne({email});
        //user not registered
        if(!registeredUser){
            return res.status(401).json({
                success : false ,
                message : "User not found"
            })
        }
        
        //verify password and generate jwt token
        if(await bcrypt.compare(password , registeredUser.password)){

            const payload = {                         
                role : registeredUser.role ,
                id : registeredUser.id ,
                email : registeredUser.email 
            } 
        
            const token = jwt.sign(payload , process.env.JWT_SECRET , {                         
                expiresIn : "2h"
            });

            registeredUser = registeredUser.toObject();
            registeredUser.token = token;
            registeredUser.password = undefined;        //security purpose
    
            const options = {
                httpOnly : true ,   //using this client can't see the cookie details
                expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) 
            }
            
            return res.cookie("token" , token , options).status(200).json({
                success : true , 
                registeredUser,
                token,
                message : "Logged in successfully"
            })    

        }else{
            return res.status(403).json({
                success : false , 
                message : "password incorrect"
            })
        }
    } catch (error) {
        
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}