const foodPartnerModel = require('../src/models/foodpartner.model');
const jwt = require('jsonwebtoken');
const userModel = require('../src/models/user.model');

async function authFoodPartnerMiddleware(req, res, next) {
    const authHeader = req.headers && req.headers.authorization ? req.headers.authorization : '';
    const tokenFromHeader = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    const tokenFromCookie = (req.cookies && req.cookies.token) || null;
    const token = tokenFromHeader || tokenFromCookie;

    if (!token) {
        return res.status(401).json({ message: 'Please login first' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const foodPartner = await foodPartnerModel.findById(decoded.id);
        if (!foodPartner) {
            return res.status(401).json({ message: 'Invalid token - user not found' });
        }
        req.foodPartner = foodPartner;
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

async function authUserMiddleware(req, res, next) {
    const authHeader = req.headers && req.headers.authorization ? req.headers.authorization : '';
    const tokenFromHeader = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    const tokenFromCookie = (req.cookies && req.cookies.token) || null;
    const token = tokenFromHeader || tokenFromCookie;

    if (!token) {
        return res.status(401).json({ message: 'Please login first' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token - user not found' });
        }
        req.user = user;
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware,
    authUserOrFoodPartnerMiddleware,
}

async function authUserOrFoodPartnerMiddleware(req, res, next) {
    const authHeader = req.headers && req.headers.authorization ? req.headers.authorization : '';
    const tokenFromHeader = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    const tokenFromCookie = (req.cookies && req.cookies.token) || null;
    const token = tokenFromHeader || tokenFromCookie;

    if (!token) {
        return res.status(401).json({ message: 'Please login first' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await userModel.findById(decoded.id);
        if (user) {
            req.user = user;
            return next();
        }
        const foodPartner = await foodPartnerModel.findById(decoded.id);
        if (foodPartner) {
            req.foodPartner = foodPartner;
            return next();
        }

        return res.status(401).json({ message: 'Invalid token - user not found' });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}