const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const Card = require('../models/cardSchema');

// /* GET users listing. */
function setCardChildren(card, children) {
  var c = {
    user: card.user,
    question: card.question,
    answers: card.answers,
    answer_details: card.answer_details,
    change_request: card.change_request,
    parent: card.parent,
    children: children,
    children_count: card.children_count,
    hashtags: card.hashtags,
    references: card.references,
    is_ordered: card.is_ordered,
    _id: card._id
  }
  return c;
}

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
    if(req.params.id == 'root') {
      Card.find({parent: null}, (err, cards) => {
        if(err) {
          console.log(err);
          res.send([]);
          return err;
        } else {
          if(cards) {
            var c = [];
            cards.forEach((card) => {
              Card.find({parent: card._id}, (err, children) => {
                if(err) {
                  console.log('load cards err');
                  c.push(setCardChildren(card, []));
                }
                else {
                  c.push(setCardChildren(card, children));
                  if(card._id === cards[cards.length-1]._id) {
                    res.send(c);
                  }
                }
              })
            })
          }
        }
      })
    } else if(req.params.id == 'random') {
      Card.count().exec((err, count) => {
        var random = Math.floor(Math.random() * count);
        Card.findOne().skip(random).exec((err, card) => {
          if(err) {
            console.log(err)
            res.send({});
          } else {
            if(card) {
              Card.find({parent: req.params.id}, (err,cards) => {
                if(err) {
                  console.log('load cards err');
                  res.send(setCardChildren(card, []));
                }
                else {
                  res.send(setCardChildren(card, cards));
                }
              })
            } else {
              res.send({});
            }
          }
        })
      })
    } else {
      Card.findOne({_id: req.params.id}).populate('parent').exec((err, card) => {
        if(err) {
          console.log('load cards err');
          res.send({});
        }
        else {
          Card.find({parent: req.params.id}, (err,cards) => {
            if(err) {
              console.log('load cards err');
              var c = {
                user: card.user,
                question: card.question,
                answers: card.answers,
                answer_details: card.answer_details,
                change_request: card.change_request,
                parent: card.parent,
                children: [],
                children_count: card.children_count,
                hashtags: card.hashtags,
                references: card.references,
                is_ordered: card.is_ordered,
                _id: card._id
              }
              res.send(c);
            }
            else {
              var c = {
                user: card.user,
                question: card.question,
                answers: card.answers,
                answer_details: card.answer_details,
                change_request: card.change_request,
                parent: card.parent,
                children: cards,
                children_count: card.children_count,
                hashtags: card.hashtags,
                references: card.references,
                is_ordered: card.is_ordered,
                _id: card._id
              }
              res.send(c);
            }
          })
        }
      });
    }
  }
});

router.get('/cards/:id/children', (req, res, next) => {
  if(req.params.id) {
    if(req.params.id != 'random') {
      Card.find({parent: req.params.id}, (err,cards) => {
        if(err) {
          console.log('load cards err');
          res.send([]);
        }
        else {
          res.send(cards);
        }
      })
    }
  }
});

router.get('/cards/search/:text', (req, res, next) => {
  if(req.params.text) {
    Card.find((err, cards) => {
      if(err) return err;
      if(cards.length > 0) {
        res.send(cards);
      }
      else {
        res.send([]);
      }
    })
    if(req.params.text[0] == '#') {
      // Card.find({hashtags : $eleMatch: { new RegExp('^' + req.params.text.slice(1,-1) + '$', "i") }} , (err,cards) => {
      //   if(err) {
      //     console.log('load cards err');
      //     res.send([]);
      //   }
      //   else {
      //     res.send(cards);
      //   }
      // })
    } else {
      // Card.find( $or: {
      //   {question: new RegExp('^' + req.params.text + '$', "i")},
      //   {answer : $eleMatch: { new RegExp('^' + req.params.text + '$', "i") }}
      //  }, (err,cards) => {
      //   if(err) {
      //     console.log('load cards err');
      //     res.send([]);
      //   }
      //   else {
      //     res.send(cards);
      //   }
      // })
    }
  }
});

router.post('/card', (req, res, next) => {
  Card.find({question: req.body.question}, (err, cards) => {
    if(err) {
      console.log('load cards err');
      res.json({status:false, message:'Saving card failed: db error'});
    }
    else {
      if(cards.length == 0)
      {
        if(req.body.parent != null) {
          Card.updateOne({_id: req.body.parent}, {$inc: {children_count:1}});
        }
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
        }).save((err, card) => {
          if(err) {
            console.log('card save err:' + err)
            res.json({status:false, message:'Saving card failed: db error'});
          }
          else {
            console.log('card save success')
            res.json({status:true, message: '', id: card._id});
          }
        });
      }
      else {
        res.json({status:false, message:'Saving card failed: question duplicated.'})
      }
    }
  });
});

module.exports = router;
