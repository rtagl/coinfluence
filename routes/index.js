const express = require('express');
const axios = require('axios');
const router  = express.Router();


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
