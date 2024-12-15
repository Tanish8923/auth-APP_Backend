const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("./routes/user");
require("dotenv").config();


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/" , router);

require("./config/database").dbConnect();

const PORT = process.env.PORT || 3000
app.listen( PORT , () => console.log(`Server listen at port ${PORT}`) );

app.get("/" , (req , res) => {
    res.send(`<h1>This is your Home Page</h1>`)
}) 
