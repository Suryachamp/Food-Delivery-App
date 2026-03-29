//model hum kyun create kar rhe hai taki database se interact kar paye related to user data

const mongoose=require('mongoose');

const userSchema =new mongoose.Schema({
    fullName:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
        required:true //means ek email se ek hi account create kar paoge
    },
    password:{
        type:String,
    }
},
    {
        timestamps:true //timestamps se databse khud se maintain karta hai databsase kab create and update hua tha uska date and time
    }
)

const  userModel=mongoose.model("user",userSchema);
module.exports=userModel; 