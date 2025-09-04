const express = require('express');
const router = express.Router();

// Dummy admin credentials (for demo purpose only)
const ADMIN_EMAIL = 'usingh0811@gmail.com';
const ADMIN_PASSWORD = '08nov2004';

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // Success: send a dummy token and admin info
    res.json({ 
      success: true, 
      message: 'Admin logged in!', 
      admin: { name: 'Admin', email: ADMIN_EMAIL },
      token: 'dummy-admin-token' 
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

module.exports = router;
