const mongoose = require('mongoose')
const { Schema } = mongoose;
const config = require('../config/db')

const analyticSchema = new Schema({
  pages: Array
})

const Analytic = module.exports = mongoose.model('Analytic', analyticSchema)

module.exports.visit = async (id, path, lang) => {
  return new Promise((res, rej) => {
      if (id == 'create') {
        let analytic = new Analytic({
          pages: [{ path: path, lang: lang, date: new Date() }]
        })
        analytic.save((err, d) => {
          if (err) rej(err)
          res(d)
        })
      } else {
        Analytic.findById(id , (err, d) => {
          if (err) rej(err)
          d.pages.push({ path: path, lang: lang, date: new Date() })
          Analytic.findByIdAndUpdate(id, d, (err, d) => {
            if (err) rej(err)
            res(d)
          })
        })
      }
    })
}
