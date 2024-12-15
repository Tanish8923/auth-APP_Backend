const express = require("express");
const router = express.Router();

//import controller

const {logIn} = require("../controllers/AuthN/logIn");
const {signUp} = require("../controllers/AuthN/signUp");

//import middleware
const {AuthN} = require("../middleware/AuthN");
const {isAdmin} = require("../middleware/isAdmin");
const {isStudent} = require("../middleware/isStudent");

//map path with controller

router.post("/signUp" , signUp);
router.post("/logIn" , logIn);

//private routes

router.get("/student" , AuthN , isStudent , (req , res) => {
    res.status(200).json({
        success : true , 
        message : "Welcome to the Private Route for Students"
    })
})

router.get("/admin" , AuthN , isAdmin , (req , res) => {
    res.status(200).json({
        success : true , 
        message : "Welcome to the Private Route for Admin"
    })
})

//export
module.exports = router;