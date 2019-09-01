const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CodeSchema = new Schema({
  account: String,
  verificationCode: String,
},{versionKey: false})

exports.Code = mongoose.model('Code', CodeSchema)
