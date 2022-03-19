const mongoose = require('mongoose')
const { Schema } = mongoose;
const config = require('../config/db')

const boxSchema = new Schema({
  gifts: [Object],
  bucks: Object,
  insidebox: String,
  giftsintobox: [Object],
  package: String,
  tape: String,
  createDate: Date,
  updateDate: Date,
  demo: String,
  preview: Object
})

const Box = module.exports = mongoose.model('Box', boxSchema)

module.exports.get = async (id) => {
  return new Promise((res, rej) => {
      Box.findById(id , (err, d) => {
        if (err) rej(err)
        res(d)
      })
    })
}

module.exports.create = async (box) => {
  return new Promise((res, rej) => {
      box.createDate = Date.now()
      box.updateDate = Date.now()
      box.save((err, d) => {
        if (err) rej(err)
        res(d)
      })
    })
}

module.exports.update = async (id, data) => {
  return new Promise((res, rej) => {
      data.updateDate = Date.now()
      Box.findByIdAndUpdate(id, data, (err, d) => {
        if (err) rej(err)
        res(d)
      })
    })
}

module.exports.undemo = async (id) => {
  return new Promise((res, rej) => {
      Box.findByIdAndUpdate(id, { demo: "" }, (err, d) => {
        if (err) rej(err)
        res(d)
      })
    })
}
