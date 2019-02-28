// routes/auth-routes.js
const express = require("express");
const passport = require('passport');
const bodyParser = require('body-parser');
const Post = require('../models/post');
const uploadCloud = require('../config/cloudinary.js');
const router = express.Router();
const ensureLogin = require("connect-ensure-login");

// User model
const User = require("../models/user");

// Get route to find discussion page and comments for a specific coin
router.get('/:coin/social', (req, res, next) => {
  console.log('in social')
  Post.find({ postedOn: req.params.coin }).sort({ created_at: -1 })
    .populate('postedBy')
    .then((posts) => {
      console.log(posts)
      posts.forEach(post=>{ 
        if(req.user && String(post.postedBy._id) === String(req.user._id)){
          console.log('r we in her')
          post['owner'] = true;
        }
      })
      console.log(posts)
      res.render('coin-posts.hbs', { posts, postedOn:req.params.coin, user: req.user })
    })
    .catch((error) => {
      console.log(error);
    })
})

// Posting a comment
router.post('/:coin/social', uploadCloud.single('photo'), ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const comment = req.body.comment;
  console.log(comment, req.file)

  const postedBy = req.user._id
  const postedOn = req.params.coin
  console.log(postedOn)
  if (comment === "" && !req.file) {
    res.render('coin-posts'), {
      errorMessage: "Please add a comment or post a picture!"
    }
  } else {
    let imgPath = ''
    if(req.file){
       imgPath = req.file.url;
    } 
  const newPost = new Post({ comment, postedOn, postedBy, imgPath })
  newPost.save()
    .then(post => {
      res.redirect(`/${postedOn}/social`);
    })
    .catch(error => {
      console.log(error);
    })
  }
})

router.get('/comment/:id/delete', (req, res, next) => {
  Post.findByIdAndDelete(req.params.id)
  .then(post => {
    res.redirect(`/${post.postedOn}/social`);
  })
  .catch(error => {
    console.log(error)
  })
})

router.post('/comment/:id/edit', (req, res, next) => {
  console.log(req.body, req.params, 'never gets old')
  Post.findById(req.params.id).then(post=>{
    post.comment = req.body.comment;
    post.save((err)=>{
      if(!err){
        res.json({ 'updated': true })
      }
    })
  })
})

//profile page


//if we decide to have private page accessed only by logged in users it will go here:
router.get("/private", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("private", { user: req.user });
});


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});


module.exports = router;