const express = require('express');
const CategoryModel = require('../models/categoryModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

// Middleware to verify admin role
const verifyAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.status(401).json({ message: 'Access Denied' });
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        
        // Check if user is admin
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access required' });
        }
        
        req.user = decoded;
        next();
    });
};

// Add new category (admin only)
router.post('/add', verifyAdmin, (req, res) => {
    new CategoryModel(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            if (err.code === 11000) {
                res.status(400).json({message: 'Category already exists'});
            } else {
                res.status(500).json({message: 'Internal Server Error'});
            }
        });
});

// Get all categories (public)
router.get('/getall', (req, res) => {
    CategoryModel.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({message: 'Internal Server Error'});
            console.log(err);
        });
});

// Get category by ID (public)
router.get('/getbyid/:id', (req, res) => {
    CategoryModel.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({message: 'Internal Server Error'});
            console.log(err);
        });
});

// Update category (admin only)
router.put('/update/:id', verifyAdmin, (req, res) => {
    CategoryModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({message: 'Internal Server Error'});
            console.log(err);
        });
});

// Delete category (admin only)
router.delete('/delete/:id', verifyAdmin, (req, res) => {
    CategoryModel.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({message: 'Internal Server Error'});
            console.log(err);
        });
});

module.exports = router;