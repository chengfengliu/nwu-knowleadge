const mongoose = require('mongoose')
const Schema = mongoose.Schema
const FileSchema = new Schema({
  name: String,
  fileBelong: String,
  major: String,
  provider: String,
  downloadedTimes: Number,
},{versionKey: false})

exports.File = mongoose.model('File', FileSchema)
