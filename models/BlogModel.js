const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BlogSchema = new Schema({
  title: String,
  content: String,
  time: String,
  auther: String,
  thumbsUpCount: Number,
  thumbsUpUsers: Array,
  comments: Array
},{versionKey: false})

exports.Blog = mongoose.model('Blog', BlogSchema)
