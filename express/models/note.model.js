const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  userid: String,
  timestamp: String,
  content: String,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const NoteModel = mongoose.model("notemodel", noteSchema)

module.exports = NoteModel