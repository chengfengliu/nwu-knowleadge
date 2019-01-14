const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AuditFileSchema = new Schema({
  name: String,
  fileBelong: String,
  major: String,
  provider: String,
  provider_id: Object,
  downloadedTimes: Number,
  Mime: String
},{versionKey: false})

exports.AuditFile = mongoose.model('AuditFile', AuditFileSchema)
