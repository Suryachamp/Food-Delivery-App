const userModel=require('../models/user.model');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const foodpartnerModel=require('../models/foodpartner.model');


// yeh humne register api bana li hai user ka 
async function registerUser(req,res){
    try {
        const{fullName,email,password}=req.body || {};
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const isUserAlreadyExist=await userModel.findOne({
            email
        })
        if(isUserAlreadyExist){
            return res.status(400).json({
                message:"User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const user=await userModel.create({
            fullName,
            email,
            password:hashedPassword
        })

        const jwtSecretReg = process.env.JWT_SECRET;
        if(!jwtSecretReg){
            return res.status(500).json({ message: 'Server misconfiguration: JWT secret not set' });
        }

        const token=jwt.sign({
            id:user._id
        }, jwtSecretReg)
        res.cookie("token",token);
        
        res.status(201).json({
            message:"User created successfully",
            user:{
                _id:user._id,
                fullName:user.fullName,
                email:user.email            
            }
        })
    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

// yeh humne login api bana li hai user ka 
async function loginUser(req,res){
    try {
        const{email,password}=req.body || {};
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user=await userModel.findOne({
            email
        })
        if(!user){
            return res.status(400).json({
                message:"Invalid email or Password"
            })
        }

        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({
                message:"Invalid email or Password"
            })
        }

        const jwtSecret = process.env.JWT_SECRET;
        if(!jwtSecret){
            return res.status(500).json({ message: 'Server misconfiguration: JWT secret not set' });
        }

        const token = jwt.sign({
            id:user._id,
        }, jwtSecret);

        res.cookie("token",token);

        res.status(200).json({
            message:"User logged in successfully",
            user:{
                _id:user._id,
                fullName:user.fullName,
                email:user.email
            }
        })
    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

// yeh humne logout api bana li hai user ka
async function logoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"User logged out successfully"
    })
}


// yeh humne register api bana li foodpartner ka
async function registerFoodPartner(req,res){
    try {
        const {name,email,password,phone,address,contactName}=req.body || {};
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const isAccountAlreadyExist=await foodpartnerModel.findOne({
            email
        }) 
        if(isAccountAlreadyExist){
            return res.status(400).json({
                message:"Food Partner account already exists"
            })
        }

        const hashedPassword=await bcrypt.hash(password,10);
        const foodpartner=await foodpartnerModel.create({
            name,
            email,
            password:hashedPassword,
            phone,
            address,
            contactName
        })

        const jwtSecretFP = process.env.JWT_SECRET;
        if(!jwtSecretFP){
            return res.status(500).json({ message: 'Server misconfiguration: JWT secret not set' });
        }

        const token=jwt.sign({
            id:foodpartner._id
        }, jwtSecretFP)

        res.cookie("token",token);
        res.status(201).json({
            message:"Food Partner account created successfully",
            foodpartner:{
                _id:foodpartner._id,
                name:foodpartner.name,
                email:foodpartner.email,
                phone:foodpartner.phone,
                contactName:foodpartner.contactName,
                address:foodpartner.address
            }
        })
    } catch (error) {
        console.error("Error in registerFoodPartner:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

// yeh humne login api bana li foodpartner ka
async function loginFoodPartner(req,res){
    try {
        const{email,password}=req.body || {};
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const foodpartner=await foodpartnerModel.findOne({
            email
        })
        if(!foodpartner){
            return res.status(400).json({
                message:"Invalid email or Password"
            })
        }

        const isPasswordValid=await bcrypt.compare(password,foodpartner.password);
        if(!isPasswordValid){
            return res.status(400).json({
                message:"Invalid email or Password"
            })
        }

        const jwtSecret2 = process.env.JWT_SECRET;
        if(!jwtSecret2){
            return res.status(500).json({ message: 'Server misconfiguration: JWT secret not set' });
        }

        const token = jwt.sign({
            id:foodpartner._id,
        }, jwtSecret2);

        res.cookie("token",token);

        res.status(200).json({
            message:"Food Partner logged in successfully",
            foodpartner:{
                _id:foodpartner._id,
                name:foodpartner.name,
                email:foodpartner.email
            }
        })
    } catch (error) {
        console.error("Error in loginFoodPartner:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
} 

// yeh humne logout api bana li hai foodpartner ka
function logoutFoodPartner(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"Food Partner logged out successfully"
    })
}

module.exports={
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}