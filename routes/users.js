const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../modules/user');


// '/users/xxx'

router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({success: false, msg: 'Failed to register user'});
    } else {
      res.json({success: true, msg: 'User registered!'});
    }
  });
});

router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({success: false, msg: 'User not found'});
    }

    User.compatePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        const token = jwt.sign({data:user}, config.secret, {
          expiresIn: 604800
        });

        const userWithoutPassword = Object.assign({}, user)
        userWithoutPassword.password = undefined;

        res.json({
          success: true,
          token: 'JWT '+token,
          user: userWithoutPassword
        })
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });

  });
});

router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  req.user.password = undefined;
  console.log('req.user:', req.user);
  res.json(req.user);
});

router.get('/validate', (req, res, next) => {
  res.send('validate');
});




router.get('/hello', (req, res, next) => {
  res.send('Well hello to you!');
});

module.exports = router;
