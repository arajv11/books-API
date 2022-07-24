const mongoose = require('mongoose')

let bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    year: Number,
    quantity: Number,
    imageURL: { type: String, default: 'http://placekitten.com/350/350' },
})
  
module.exports = mongoose.model('Book', bookSchema)