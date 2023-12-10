const mongoose = require('mongoose')

const ResultSchema = mongoose.Schema(
  {
    result: [
      {
        type: Boolean,
        required: true,
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

const Result = mongoose.model('Result', ResultSchema)

module.exports = Result
