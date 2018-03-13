const mongoose = require('mongoose');

const hashtagSchema = new mongoose.Schema({
  hashtag: {type: String, required: true},
  count: {type: Number, required: true},
  id: mongoose.Schema.Types.ObjectId
});

hashtagSchema.index({ value:1, count:1 });

module.exports = mongoose.model('Hashtag', hashtagSchema);
