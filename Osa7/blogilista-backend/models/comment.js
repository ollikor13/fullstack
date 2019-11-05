const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    content: {type: String, required: true},
    blog: {type: String, required: true}
  })

  commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    id = returnedObject.id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Comment', commentSchema)