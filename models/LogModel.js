const mongoose = require('mongoose')
const Schema = mongoose.Schema
const LogSchema = new Schema({
  operator: String,
  operation: String,
  time: String,
},{versionKey: false})

exports.Log = mongoose.model('Log', LogSchema)
