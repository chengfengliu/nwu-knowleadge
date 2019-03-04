const {AuditFile} = require('./AuditFileModel')
const {File} = require('./FileModel')
const {User} = require('./UserModel')
const mongoose = require('mongoose')

const path = require('path')
const fs = require('fs')

exports.allAuditFiles = async(ctx, next) => {
  const auditFiles = await AuditFile.find()
  ctx.response.body = {auditFiles}
  await next()
}

exports.approve = async (ctx, next) => {
  console.log(ctx.request.body)
  const file = await AuditFile.findOneAndDelete({'_id': mongoose.Types.ObjectId(ctx.request.body._id)}, {select: ['name', "fileBelong", "major", "provider", "provider_id", "downloadedTimes"]})
  console.log('file',file, typeof file._id)
  file._id = file._id.toString()
  await File.create({"_id": mongoose.Types.ObjectId(ctx.request.body._id), 'name': file.name, 'fileBelong': file.fileBelong, 'major': file.major, 'provider': file.provider, downloadedTimes: 0})
  const user = await User.findOne({_id: mongoose.Types.ObjectId(file.provider_id)})
  // 找到才能更新
  await User.findOneAndUpdate(
    {'_id': user['_id']},
    {$set: {'downloadTimes': user['downloadTimes'] + 2}}  // 可下载数加2
  )
  ctx.response.body = true
  await next()
}

exports.reject = async (ctx, next) => {
  console.log(ctx.request.body)
  const rootPath = path.resolve(__dirname, '..')
  const _id = mongoose.Types.ObjectId(ctx.request.body._id)
  const file = await AuditFile.findOneAndDelete({_id}, {select: ['Mime']})
  // 删除文件
  fs.unlinkSync(path.join(rootPath, 'uploads', _id + file.Mime))
  ctx.response.body = true
  await next()
}