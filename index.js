const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const chalk = require('chalk')
const cors = require('cors')
const { register, login } = require('./controllers/user')
const {
  addTest,
  editTest,
  deleteTest,
  getTests,
  getTest,
} = require('./controllers/test')
const { addResult } = require('./controllers/result')
const mapUser = require('./helpers/mapUser')
const authenticated = require('./middlewares/authenticated')
const mapTest = require('./helpers/mapTest')
const mapResult = require('./helpers/mapResult')

const PORT = 3003
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.post('/register', async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password)
    res
      .cookie('token', token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) })
  } catch (error) {
    res.send({ error: error.message || 'Unknown error' })
  }
})

app.post('/login', async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password)

    res
      .cookie('token', token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) })
  } catch (error) {
    res.send({ error: error.message || 'Unknown error' })
  }
})

app.post('/logout', async (req, res) => {
  res.cookie('token', '', { httpOnly: true }).send({})
})

app.get('/tests', async (req, res) => {
  const { tests, lastPage } = await getTests(
    req.query.search,
    req.query.limit,
    req.query.page
  )
  res.send({ data: { lastPage, tests: tests.map(mapTest) } })
})

app.use(authenticated)

app.post('/tests', async (req, res) => {
  const newTest = await addTest({
    title: req.body.title,
    questions: req.body.questions,
    author: req.user.id,
  })
  res.send({ data: mapTest(newTest) })
})

app.post('/tests/:id/results', async (req, res) => {
  const newResults = await addResult(req.params.id, {
    result: req.body.result,
    author: req.user.id,
  })
  res.send({ data: mapResult(newResults) })
})

app.get('/tests/:id', async (req, res) => {
  const test = await getTest(req.params.id)
  res.send({ data: mapTest(test) })
})

app.patch('/tests/:id', async (req, res) => {
  const updatedTest = await editTest(req.params.id, {
    title: req.body.title,
    questions: req.body.questions,
  })
  res.send({ data: mapTest(updatedTest) })
})

app.delete('/tests/:id', async (req, res) => {
  await deleteTest(req.params.id)

  res.send({ error: null })
})

mongoose
  .connect(
    'mongodb+srv://Andy152:77Njhnyjdfz,fpf@cluster0.rvnasvw.mongodb.net/quiz2?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(chalk.green(`Server has been started on port ${PORT}...`))
    })
  })
