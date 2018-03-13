const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const Card = require('../models/cardSchema');
const Hashtag = require('../models/hashtagSchema');
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
    Card.find( {$or: [
      {question: { $regex : new RegExp(req.params.text, "i") } },
      {answer: { $elemMatch: { $regex : new RegExp(req.params.text, "i") } } }
    ]}, (err,cards) => {
      if(err) {
        console.log('load cards err');
        res.send([]);
      }
      else {
        res.send(cards);
      }
    })
  }
});

router.get('/cards/search_hashtag/:text', (req, res, next) => {
  if(req.params.text) {
    Card.find({hashtags : { $elemMatch: { $regex : new RegExp(req.params.text, "i") }}} , (err,cards) => {
      if(err) {
        console.log('load cards err');
        res.send([]);
      }
      else {
        res.send(cards);
      }
    })
  }
});

router.get('/hashtags', (req, res, next) => {
  Hashtag.find((err, hashtags) => {
    if(err) {
      console.log('load hashtags err');
      res.send([]);
    } else {
      res.send(hashtags)
      console.log(hashtags)
    }
  })
})

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
          Card.findById(req.body.parent, (err, card) => {
            if(err) return err;
            card.children_count++;
            card.save();
          })
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
            for(let i=0;i<req.body.hashtags.length;i++)
            {
              Hashtag.find({hashtag: req.body.hashtags[i]}, (err, hashtags) => {
                if(err) { return err; }
                if(hashtags.length == 0) {
                  new Hashtag({
                    hashtag: req.body.hashtags[i],
                    count: 1
                  }).save();
                  console.log('save' + req.body.hashtags[i])
                } else {
                  hashtags[0].count++;
                  hashtags[0].save();
                  console.log('update' + req.body.hashtags[i])
                }
              })
            }
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
