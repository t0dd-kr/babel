const mongoose = require('mongoose');

const hashtagSchema = new mongoose.Schema({
  value: {type: String, required: true},
  count: {type: Number, default: 1},
  id: mongoose.Schema.Types.ObjectId
});

hashtagSchema.index({ value:1, count:1 });

module.exports = mongoose.model('Hashtag', hashtagSchema);
