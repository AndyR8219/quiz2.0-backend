const mongoose = require('mongoose')
const mapResult = require('./mapResult')

module.exports = function (test) {
  console.log(test)
  return {
    id: test.id,
    title: test.title,
    questions: test.questions,
    author: test.author,
    results: test.results.map((result) =>
      mongoose.isObjectIdOrHexString(result) ? result : mapResult(result)
    ),
  }
}
