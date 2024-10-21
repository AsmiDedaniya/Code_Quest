const express = require('express');
const router = express.Router();
const { getAllanswer } = require('../controllers/answer.js'); // Import it correctly


router.get('/allanswer/:question/:sortby/:orderby', getAllanswer); // This now passes the correct function as a callback


module.exports = router;
