const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/userSchema');
const crypto = require('crypto');
/* GET users listing. */

router.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) { return res.json( { status:false, message: info.message }) }
    req.login(user, function(err) {
      if(err) { return next(err); }
      return res.json({status:true, nickname: user.name});
    })
  })(req, res, next);
});

router.post('/join', function(req, res, next){
  User.findOne({email: req.body.email}, (err, user) => {
    if(err) {
      console.log(err)
      return err;
    }
    else {
      if(user) {
        res.json({status:false, message: 'invalid email'});
      }
      else
      {
        crypto.randomBytes(64, (err, buf) => {
          crypto.pbkdf2(req.body.password, buf.toString('base64'), 99321, 64, 'sha512', (err, key) => {
            new User({
              email: req.body.email,
              password: key.toString('base64'),
              salt: buf.toString('base64'),
              name: req.body.name
            }).save((err, user) => {
              res.json({status:true});
            });
          });
        });
      }
    }
  });
});

router.post('/logout', function(req, res, next) {
  req.logout();
  res.json({});
});


router.get('/', function(req, res){
  res.json(req.user);
});

// router.post('/', passport.authenticate('local', {
//   failureRedirect: '/auth/fail',
//   successRedirect: '/auth/success'
// }));
//
// router.get('/fail', (req, res, next) => {
//   console.log(req);
//   res.json({ message: req.info.message });
// });
//
// router.get('/success', (req, res, next) => {
//   res.send(req.session.passport.user);
// });

module.exports = router;
