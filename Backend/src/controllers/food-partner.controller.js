const foodPartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/food.model');

async function getFoodPartnerById(req, res) {
    try {
        const foodPartnerId = req.params.id;
        const foodPartner = await foodPartnerModel.findById(foodPartnerId);
        
        if (!foodPartner) {
            return res.status(404).json({ message: "Food Partner not found" });
        }
        
        // Fetch all food items authored by this specific partner
        const foods = await foodModel.find({ foodPartner: foodPartnerId });
        
        res.status(200).json({ foodPartner, foods });
    } catch (error) {
        console.error("Error in getFoodPartnerById:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

module.exports = {
    getFoodPartnerById
};