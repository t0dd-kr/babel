const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET users listing. */

router.post('/', function(req, res, next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) { return res.json( { status:false, message: info.message }) }
    req.login(user, function(err) {
      if(err) { return next(err); }
      return res.json({status:true, nickname: user.nickname});
    })
  })(req, res, next);
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
