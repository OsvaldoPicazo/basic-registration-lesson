const {Router} = require('express');
const router = new Router();
const User = require('../models/User.model');

// get 
router.get("/signup", (req, res) => {
  res.render("auth/signup")
})

router.get("/userProfile", (req, res) => {
  res.render('users/user-profile')
})

// post, use encryptation to protect password

const bcryptjs = require('bcryptjs');
const saltRounds = 10;

router.post("/signup", (req, res) => {
  console.log(req.body)
  const {username, email, password} = req.body
  bcryptjs
    .genSalt(saltRounds)
    .then(resultFromGenSalt => bcryptjs.hash(password, resultFromGenSalt))
    .then(resultFromHash => {
      console.log('hashed password: ', resultFromHash)
      return User.create({username, email, passwordHash: resultFromHash})
      .then(resultFromUserCreate => res.redirect('/userProfile'))
      .catch(error => console.log('user was not created'))
    })
    .catch(error => console.log(error))
})

module.exports = router;