const mongoose = require('mongoose')
const Schema = mongoose.Schema
const kudosSchema = new Schema({
     value: {
         type: String,
         require: true
     },
     from: {
         type: String,
         require: true
     },
     to: {
        type: String,
        require: true
     },
     date: {
        type: Date,
        default: Date.now
     },
     message: {
        type: String
     }
})


module.exports = mongoose.model('posts', kudosSchema )