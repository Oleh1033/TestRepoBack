const express = require('express')
const router = express.Router()

const Kudos = require('../models/kudos')

// http://lockalhost:3000/api/post (GET)
router.get('/', async (req, res) => {
    const data = await Kudos.find({})
    res.status(200).json(data)
})

// http://lockalhost:3000/api/post (POST)
router.post('/', async (req, res) => {
    const postData = {
        value: req.body.value,
        from: req.body.from,
        to: req.body.to,
    }
const kudo = new Kudos(postData)
await post.save()
res.status(201).json(kudo)

})

// http://lockalhost:3000/api/post (DELETE)
router.delete('/', (req, res) => {
    
})

module.exports = router;