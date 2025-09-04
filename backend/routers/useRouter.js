const express = require('express');
const Model = require('../models/useModel'); //importing user model
const jwt = require('jsonwebtoken'); //importing jsonwebtoken
require('dotenv').config(); //importing dotenv

const router = express.Router();

router.post('/add', (req, res) => {
    console.log(req.body);

    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            if (err.code === 11000) {
                res.status(400).json({message: 'User Email Already Exists'});
            }
            else {
                res.status(500).json({message: 'Internal Server Error'});
            }
        });
})

router.get('/getall', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({message: 'Internal Server Error'});
            console.log(err);
        });
})

router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({message: 'Internal Server Error'});
            console.log(err);
        });
})

router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({message: 'Internal Server Error'});
            console.log(err);
        });
})

router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({message: 'Internal Server Error'});
            console.log(err);
        });
})

router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
        .then((result) => {
            if(result){
                // email and password match
                // generate token

                const { _id, email, password} = result;
                const payload = { _id, email, password};

                jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'}, (err, token) => {
                    if(err){
                        console.log(err);
                        res.status(500).json(err);
                    }else{
                        res.status(200).json({token});
                    }
                } )

            } else {
                res.status(401).json({message: 'Invalid Credentials'});
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({message: 'Internal Server Error'});
        });
});

// Get user by email (for authentication)
router.post('/getbyemail', (req, res) => {
    // Verify token
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.status(401).json({ message: 'Access Denied' });
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        
        // Token is valid, proceed to get user by email
        Model.findOne({ email: req.body.email })
            .select('-password') // Exclude password from the result
            .then((result) => {
                if (result) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: 'User not found' });
                }
            }).catch((err) => {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
    });
});



module.exports = router;