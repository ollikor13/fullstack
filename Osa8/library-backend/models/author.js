const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  }
})

schema.virtual('id').get(function () {
  return this._id.toString();
});

module.exports = mongoose.model('Author', schema)