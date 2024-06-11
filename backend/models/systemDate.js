const mongoose = require('mongoose')

const Schema = mongoose.Schema

const systemDateSchema = new Schema({
  date: {
    type: Date,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('SystemDate', systemDateSchema)