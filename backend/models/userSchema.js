const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, match : /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/},
  password: { type: String, required: true, trim: true },
  nickname: { type: String, required: true, unique: true, trim: true},
  id: mongoose.Schema.Types.ObjectId
});

userSchema.index({ email: 1, nickname: 1 });

userSchema.methods.comparePassword = function(password, cb) {
  if (password == this.password) {
    cb(null, true);
  } else {
    cb('error');
  }
};

module.exports = mongoose.model('User', userSchema);
