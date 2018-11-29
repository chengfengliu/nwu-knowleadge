const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
  nickName: String,
  name: String,
  number: String,
  school: String,
  account: String,
  password: String,
  downloadTimes: Number,
  blogs: Array,
  thumbsUpBlogs: Array,
  moments: Array,
},{versionKey: false})

exports.User = mongoose.model('User', UserSchema)
