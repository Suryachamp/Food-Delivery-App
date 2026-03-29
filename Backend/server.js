//server start karte hai 
require('dotenv').config();
const app=require('./src/app');
const connectDB=require('./src/db/db');

// database connect karenge
connectDB();

app.listen(process.env.PORT || 3000, () => {
    console.log(`server has started running on port ${process.env.PORT || 3000}`);
})