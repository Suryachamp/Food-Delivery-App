const express=require('express');
const router = express.Router();
const foodController=require('../controllers/food.controller');
const authMiddleware=require('../../middlewares/auth.middleware');
const multer = require('multer');


const upload=multer({
    storage:multer.memoryStorage(),
})

// Post /api/food [Protected because food item can only be added by foodpartner]
router.post('/',
    authMiddleware.authFoodPartnerMiddleware,
    upload.single('video'),
    foodController.createFood
);
// GET /api/food [protected] — allow either user or food-partner tokens
router.get('/',
    authMiddleware.authUserOrFoodPartnerMiddleware,
    foodController.getFoodItems
);

router.post('/like',
    authMiddleware.authUserMiddleware,
    foodController.likeFood
);

router.post('/save',
    authMiddleware.authUserMiddleware,
    foodController.saveFood
);

router.get('/saved',
    authMiddleware.authUserMiddleware,
    foodController.getSavedFoods
);

module.exports=router;