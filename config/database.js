const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () => {
    mongoose.connect(process.env.DB_URL)
    .then(console.log("DB connected successfilly"))
    .catch((error) => {
        console.log("Issue in db connection");
        console.error(error);
        process.exit(1);
    })
}