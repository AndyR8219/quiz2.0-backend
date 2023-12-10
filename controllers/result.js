const Result = require('../models/Result')
const Test = require('../models/Test')

// add
async function addResult(testId, result) {
  const newResult = await Result.create(result)
  await Test.findByIdAndUpdate(testId, { $push: { results: newResult } })

  await newResult.populate('author')

  return newResult
}

// get list for result

module.exports = {
  addResult,
}
