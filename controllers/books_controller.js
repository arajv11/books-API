const router = require('express').Router()
const e = require('express')
const Book = require('../models/books.js')

router.get('/seed', (req, res) => {
    Book.insertMany([
      {
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
      },
      {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
      },
      {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
      },
      {
        "title": "Wâˆ€RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg"
      }
    ])
        .then(res.status(200).json({
            message: 'Seed successful'
        }))
        .catch(res.status(400).json({
            message: 'Seed unsuccessful'
        }))
})

router.get('/', (req, res) => {
  Book.find()
    .then(books => {
      res.status(200).json(books)
    })
    .catch((err => {
      res.status(400).json({BackEndMessage: "Could not find books"})
    }))
})

router.get('/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      res.status(200).json(book)
    })
    .catch((err => {
      res.status(400).json({BackEndMessage: "Could not find book"})
    }))
})

router.put('/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(book => {
      res.status(200).json(book)
    })
    .catch(err => {
      res.status(400).json({BackEndMessage: "Could not update book"})
    })
})

router.delete('/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      if (book != null) {
        Book.findByIdAndDelete(req.params.id)
          .then(() => {
            res.status(200).json({BackEndMessage: "Delete successful"})
          })
          .catch(err => {
            res.status(400).json({BackEndMessage: "Could not delete book"})
          })
      } else {
        res.status(400).json({BackEndMessage: "Book not found"})
      }
    })
})

router.post('/', (req, res) => {
  Book.create(req.body)
    .then((book) => {
      res.status(200).json(book)
    })
    .catch((err => {
      res.status(400).json({BackEndMessage: "Could not add book"})
    }))
})

module.exports = router