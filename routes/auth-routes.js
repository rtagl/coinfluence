// routes/auth-routes.js
const express = require("express");
const passport = require('passport');
const Post = require('../models/post');
const uploadCloud = require('../config/cloudinary.js');
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
// User model

const User = require("../models/user");

router.get('/socials', (req, res, next) => {
  Post.find().sort({ created_at: -1 })
    .then((posts) => {
      res.render('coin-posts.hbs', { posts })
    })
    .catch((error) => {
      console.log(error);
    })
})

// Posting a comment
router.post('/socials', uploadCloud.single('photo'), ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const comment = req.body.comment;
  console.log(comment, req.file)

  const postedBy = req.user.id;
  //const imgPath = req.file.url;
  //console.log(!imgPath)
  //console.log(comment === "")

  if (comment === "" && !req.file) {
    res.render("coin-posts", {
      errorMessage: "Please add a comment or post a picture!"
    });
  } else {
    let imgPath = ''
    if(req.file){
       imgPath = req.file.url;
    } 
  const newPost = new Post({ comment, postedBy, imgPath })
  newPost.save()
    .then(post => {
      res.redirect('/socials');
    })
    .catch(error => {
      console.log(error);
    })
  }
})

//if we decide to have private page accessed only by logged in users it will go here:
router.get("/private", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("private", { user: req.user });
});


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;