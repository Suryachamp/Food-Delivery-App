const express=require('express');
const router=express.Router(); 
const authController=require('../controllers/auth.controller');


//yaha api toh create kar rhe hai lekin iske andar ka logic jo hoga controller ka woh auth.controller.js me hoga

//user auth APIs
router.post('/user/register',authController.registerUser)
router.post('/user/login',authController.loginUser)
router.get('/user/logout',authController.logoutUser) 
//foodpartner auth APIs
router.post('/food-partner/register',authController.registerFoodPartner)
router.post('/food-partner/login',authController.loginFoodPartner)
router.get('/food-partner/logout',authController.logoutFoodPartner)
module.exports=router;