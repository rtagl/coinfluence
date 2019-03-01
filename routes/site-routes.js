const express = require("express");
const passport = require('passport');
const bodyParser = require('body-parser');
const Post = require('../models/post');
const uploadCloud = require('../config/cloudinary.js');
const router = express.Router();
const ensureLogin = require("connect-ensure-login");

// User model
const User = require("../models/user");


// Profile Page
router.get('/profile/:id', (req, res, next) => {
  Post.find({ postedBy: req.params.id }).sort({ created_at: -1 })
    .then((post) => {
      res.render('profile', { post, user: req.user })
    })
})


module.exports = router;