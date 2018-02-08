const mongoose = require('mongoose');

const changeRequestSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  answers: {
    [{
      type: String,
      trim: true
    }],
    validate: [arrayLimit, '{PATH} exceeds the limit of 5']
  },
  answer_details: {
    [{
      type: String,
      trim: true
    }],
    validate: [arrayLimit, '{PATH} exceeds the limit of 5']
  },
  origin: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Card'},
  like: {type: Number, default: 0},
  dislike: {type: Number, default: 0},
  reference: [{type: String, trim: true}],
  is_ordered: {type: Boolean, required: true},
  id: mongoose.Schema.Types.ObjectId
});

function arrayLimit(val) {
  return val.length <= 5;
}

changeRequestSchema.index({ user:1, like:1, dislike:1});

module.exports = mongoose.model('ChangeRequest', changeRequestSchema);
