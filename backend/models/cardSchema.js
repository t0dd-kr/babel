const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  question: {type: String, required: true, unique: true, trim: true},
  answers: {
    type: [{
      type: String,
      trim: true
    }],
    validate: {
      validator: arrayLimit,
      message: '{PATH} exceeds the limit of 5'
    }
  },
  answer_details: {
    type: [{
      type: String,
      trim: true
    }],
    validate: {
      validator: arrayLimit,
      message: '{PATH} exceeds the limit of 5'
    }
  },
  change_request: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChangeRequest' }],
  parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Card', null: true},
  children_count: {type: Number, default: 0},
  hashtags: [{type: String, trim: true, match: /([0-9a-zA-Zㄱ-힣]*)/g}],
  references: [{type: String, trim: true}],
  is_ordered: {type: Boolean, required: true},
  id: mongoose.Schema.Types.ObjectId
});

function arrayLimit(val) {
  return val.length <= 5;
}

cardSchema.index({ user:1, children_count:1, hashtags:1, question:1 });

module.exports = mongoose.model('Card', cardSchema);
