const express = require('express');
const { upload, cloudinary } = require('../config/cloudinary');
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

// Upload single image
router.post('/single', verifyAdmin, upload.single('image'), (req, res) => {
    try {
        res.status(200).json({
            url: req.file.path,
            public_id: req.file.filename
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Error uploading image' });
    }
});

// Upload multiple images (up to 5)
router.post('/multiple', verifyAdmin, upload.array('images', 5), (req, res) => {
    try {
        const uploadedFiles = req.files.map(file => ({
            url: file.path,
            public_id: file.filename
        }));
        
        res.status(200).json(uploadedFiles);
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Error uploading images' });
    }
});

// Delete image
router.delete('/delete', verifyAdmin, async (req, res) => {
    try {
        const { public_id } = req.body;
        
        if (!public_id) {
            return res.status(400).json({ message: 'Public ID is required' });
        }
        
        const result = await cloudinary.uploader.destroy(public_id);
        res.status(200).json(result);
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ message: 'Error deleting image' });
    }
});

module.exports = router;