const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const chalk = require('chalk')
const cors = require('cors')
const { register } = require('./controllers/user')
const mapUser = require('./helpers/mapUser')

const PORT = 3003
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.post('/register', async (req, res) => {
  try {
    const user = await register(req.body.login, req.body.password)
    res.send({ error: null, user: mapUser(user) })
  } catch (error) {
    res.send({ error: error.message || 'Unknown error' })
  }
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
