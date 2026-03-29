const mongoose=require('mongoose');

const foodPartnerSchema=new mongoose.Schema({
    name:{
        type:String
    },
    contactName:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
    }
})

const userModel=mongoose.model("foodpartner",foodPartnerSchema);
module.exports=userModel;