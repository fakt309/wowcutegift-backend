const path = require('path')
const express = require('express')
const query = require('./routes/query')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config/db')

const app = express()

// //http connect ------------------
// // const express = require('express');
// // var app = express();
// const http = require('http')
// const server = http.createServer(app)
// server.listen(80)
// //end http connect --------------

//https connect ------------------
const https = require('https')
const options = {
    cert: fs.readFileSync('/etc/letsencrypt/live/wowcutegift.com/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/wowcutegift.com/privkey.pem')
}
var server = https.createServer(options, app)
server.listen(443)
//redirect to https
var http = require('http')
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://"+req.headers['host']+req.url })
    res.end()
}).listen(80)
//end https connect --------------

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

// app.listen(process.env.PORT || 8080) //process.env.PORT || 8080
