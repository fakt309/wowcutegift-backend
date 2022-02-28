const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Box = require('../models/box')

router.post('/', async (req, res) => {
  if (req.body.typequery == 'insert') {
    let data = {
      gifts: req.body.data.gifts,
      bucks: req.body.data.bucks,
      insidebox: req.body.data.insidebox,
      giftsintobox: req.body.data.giftsintobox,
      package: req.body.data.package,
      tape: req.body.data.tape
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
  }

})

module.exports = router
