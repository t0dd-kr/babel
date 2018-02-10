const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const Card = require('../models/cardSchema');

// /* GET users listing. */
router.get('/users', (req, res, next) => {
  User.find((err, users) => {
    if(err) {
      console.log('load users err');
      res.send([]);
    }
    else {
      res.send(users);
    }
  });
});

router.get('/cards/:id', (req, res, next) => {
  if(req.params.id) {
    Card.findOne({_id: req.params.id}, (err, card) => {
      if(err) {
        console.log('load users err');
        res.send({});
      }
      else {
        Card.find({parent: req.params.id}, (err,cards) => {
          if(err) {
            console.log('load users err');
            card.children = [];
            res.send(card);
          }
          else {
            card.children = cards;
            res.send(card);
          }
        })
      }
    });
  }
});

router.post('/card', (req, res, next) => {
  Card.find({question: req.body.question}, (err, cards) => {
    if(err) {
      console.log('load cards err');
      res.json({});
    }
    else {
      if(cards == [])
      {
        new Card({
          user: req.body.user_id,
          question: req.body.question,
          answers: req.body.answers,
          answer_details: req.body.details,
          change_request: [],
          parent: req.body.parent,
          children_count: 0,
          hashtags: req.body.hashtags,
          references: req.body.references,
          is_ordered: req.body.is_ordered
        }).save((err,card) => {
          if(err) {
            res.json({status:false, message:'save card failed'});
          }
          else {
            res.json({status:true, message: '', id:card._id});
          }
        });
      }
    }
  });
});

module.exports = router;
