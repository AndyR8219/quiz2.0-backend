const mongoose = require('mongoose')

const TestSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      title: {
        type: String,
        required: true,
      },
      answers: [
        {
          title: {
            type: String,
            required: true,
          },
          isCorrect: {
            type: Boolean,
            required: true,
          },
        },
      ],
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  results: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Result',
    },
  ],
})

const Test = mongoose.model('Test', TestSchema)

module.exports = Test
