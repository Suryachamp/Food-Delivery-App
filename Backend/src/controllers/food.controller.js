const foodModel=require('../models/food.model');
const storageService=require('../services/storage.service');
const { v4:uuid}=require('uuid');
const path = require('path');
const likeModel=require('../models/likes.model');
const saveModel=require('../models/save.model');

async function createFood(req,res){
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No video file provided" });
        }

        // Determine the native file extension provided by Multer (e.g. '.mp4')
        const ext = req.file && req.file.originalname ? path.extname(req.file.originalname) : '';
        
        // Concat the randomly secure UUID algorithm sequentially with the extracted string
        const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid() + ext);
        
        const foodItem = await foodModel.create({
            name: req.body.name,
            video: fileUploadResult.url,
            description: req.body.description,
            foodPartner: req.foodPartner._id 
        });

        res.status(201).json({
            message: "food created successfully",   
            data: foodItem
        });
    } catch (error) {
        console.error("Error in createFood:", error);
        res.status(500).json({ 
            message: "Failed to create food item", 
            error: error.message 
        });
    }
}

async function getFoodItems(req,res){
    const foodItems = await foodModel.find();
    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems: foodItems
    });
}
async function likeFood(req,res){
    const {foodId}=req.body;
    const user=req.user;
    
    const isAlreadyLiked=await likeModel.findOne({
        user:user._id,
        food:foodId
    })
    if(isAlreadyLiked){
        await likeModel.deleteOne({
            user:user._id,
            food:foodId
        })
        await foodModel.findByIdAndUpdate(
            foodId,
            {
                $inc:{
                    likeCount:-1
                }
            }
        )
        return res.status(200).json({
            message:"Food unliked successfully"
        })
    }
    const like=await likeModel.create({
        user:user._id,
        food:foodId
    })
    await foodModel.findByIdAndUpdate(
        foodId,
        {
            $inc:{
                likeCount:1
            }
        }
    )   
    res.status(201).json({
        message:"Food liked successfully",
        data:like
    })
}
async function saveFood(req,res){
    const {foodId}=req.body;
    const user=req.user;
    
    const isAlreadySaved=await saveModel.findOne({
        user:user._id,
        food:foodId
    })
    if(isAlreadySaved){
        await saveModel.deleteOne({
            user:user._id,
            food:foodId
        })
        return res.status(200).json({
            message:"Food unsaved successfully"
        })
    }
    const save=await saveModel.create({
        user:user._id,
        food:foodId
    })
    res.status(201).json({
        message:"Food saved successfully",
        data:save
    })
}

async function getSavedFoods(req, res) {
    try {
        const user = req.user;
        // Search MongoDB for all save arrays explicitly assigned to the logged in UUID
        // Use matching .populate() to deeply resolve the underlying food.model data structure natively
        const saves = await saveModel.find({ user: user._id }).populate('food');
        
        // Strip the wrapper document arrays filtering purely the native underlying reel objects
        const foodItems = saves.map(item => item.food).filter(food => food !== null);
        
        res.status(200).json({
            message: "Saved foods fetched successfully",
            foodItems: foodItems
        });
    } catch (error) {
        console.error("Error fetching saved foods:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports={
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSavedFoods
}