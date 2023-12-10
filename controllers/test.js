const Test = require('../models/Test')

// add
async function addTest(test) {
  const newTest = await Test.create(test)

  await newTest.populate({
    path: 'results',
    populate: 'author',
  })
  return newTest
}

// edit
async function editTest(id, test) {
  const newTest = await Test.findByIdAndUpdate(id, test, {
    returnDocument: 'after',
  })

  return newTest
}

// delete
function deleteTest(id) {
  return Test.deleteOne({ _id: id })
}

// get list with search and pagination
async function getTests(search = '', limit = 10, page = 1) {
  const [tests, count] = await Promise.all([
    Test.find({ title: { $regex: search, $options: 'i' } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ title: -1 }),
    Test.countDocuments({ title: { $regex: search, $options: 'i' } }),
  ])
  return { tests, lastPage: Math.ceil(count / limit) }
}

// get item
function getTest(id) {
  return Test.findById(id).populate({
    path: 'results',
    populate: 'author',
  })
}

module.exports = {
  addTest,
  editTest,
  deleteTest,
  getTests,
  getTest,
}
