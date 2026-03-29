// inside this file we will write the logic about how our server will connect with the database 
// isme sirf logic likhenge lekin final call kaha karenge jaha pe server connect karenge databse se woh server.js me karenge

const mongoose=require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Database connected");
    })
    .catch((err)=>{
        console.log("MongoDB connection error:", err);
    })
}

module.exports=connectDB;