//server create karte hai

const express=require('express');
const cookieParser=require('cookie-parser');
const authrouter=require('./routes/auth.routes');
const foodRouter=require('./routes/food.routes'); 
const foodPartnerRouter=require('./routes/food-partner.routes');
const cors=require('cors');     
const app=express();
// 👇 yeh middleware data leke ayega taki hum data readable bana sake in auth.controller.js in req.body
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.get('/',(req,res)=>{
    res.send("Hello world");
})
app.use('/api/auth',authrouter);
app.use('/api/user',authrouter);
app.use('/api/food',foodRouter);
app.use('/api/food-partner',foodPartnerRouter);
module.exports=app;