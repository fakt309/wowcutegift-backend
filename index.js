const path = require('path')
const express = require('express')
const query = require('./routes/query')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config/db')

const app = express()

app.use(bodyParser.json({limit: '16mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '16mb', extended: true}))

app.use(express.static(path.join(__dirname, 'dist')))

let db = mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('connected', () => {
  // console.log('success db')
})
mongoose.connection.on('error', (err) => {
  // console.log('error db:')
  console.log(err)
})

app.use('/query', query)

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.listen(process.env.PORT || 8080)
