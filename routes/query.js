const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Box = require('../models/box')
const Analytic = require('../models/analytic')

router.post('/', async (req, res) => {
  if (req.body.typequery == 'insert') {
    let data = {
      gifts: req.body.data.gifts,
      bucks: req.body.data.bucks,
      insidebox: req.body.data.insidebox,
      giftsintobox: req.body.data.giftsintobox,
      package: req.body.data.package,
      tape: req.body.data.tape,
      demo: req.body.data.demo,
      preview: {
        title: "Gift for you",
        descr: "Look what I have prepared for you",
        img: "/assets/preview.jpg"
      }
    }

    if (req.body.data.id) {
      if (await Box.get(req.body.data.id)) {
        let ans = await Box.update(req.body.data.id, data)
        res.json({success: true, created: false})
      } else {
        let box = new Box(data)
        await Box.create(box)
        res.json({success: true, created: true, id: box._id})
      }
    } else {
      let box = new Box(data)
      await Box.create(box)
      res.json({success: true, created: true, id: box._id})
    }
  } else if (req.body.typequery == 'get') {
    let box = await Box.get(req.body.id)
    box.id = box._id
    delete box._id
    res.json({success: true, box: box})
  } else if (req.body.typequery == 'undemo') {
    let box = await Box.undemo(req.body.id)
    box.id = box._id
    delete box._id
    res.json({success: true, box: box})
  } else if (req.body.typequery == 'updatepreview') {
    let d = {
      preview: {
        title: req.body.data.title,
        descr: req.body.data.descr,
        img: req.body.data.img
      }
    }
    await Box.update(req.body.id, d)
    res.json({success: true})
  } else if (req.body.typequery == 'analyticvisit') {
    let d = await Analytic.visit(req.body.id, req.body.path, req.body.lang)
    d = {id: d._id, ...d}
    delete d._id
    res.json({success: true, data: d})
  }
})

module.exports = router
