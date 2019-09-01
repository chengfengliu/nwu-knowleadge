const {AuditFile} = require('./AuditFileModel')
const {File} = require('./FileModel')
const {User} = require('./UserModel')
const mongoose = require('mongoose')

const path = require('path')
const fs = require('fs')

const nodemailer = require('nodemailer')
const mail = require('../config.js').mail
const transporter = nodemailer.createTransport({
  service: 'qq',
  auth: {
    user: mail.user,
    pass: mail.pass
  }
})

exports.allAuditFiles = async(ctx, next) => {
  const auditFiles = await AuditFile.find()
  ctx.response.body = {auditFiles}
  await next()
}

exports.approve = async (ctx, next) => {
  const file = await AuditFile.findOneAndDelete({'_id': mongoose.Types.ObjectId(ctx.request.body._id)}, {select: ['name', "fileBelong", "major", "provider", "provider_id", "downloadedTimes"]})
  file._id = file._id.toString()
  await File.create({"_id": mongoose.Types.ObjectId(ctx.request.body._id), 'name': file.name, 'fileBelong': file.fileBelong, 'major': file.major, 'provider': file.provider, downloadedTimes: 0})
  const user = await User.findOne({_id: mongoose.Types.ObjectId(file.provider_id)})
  // 找到才能更新
  const result = await User.findOneAndUpdate(
    {'_id': user['_id']},
    {$set: {'downloadTimes': user['downloadTimes'] + 2}}  // 可下载数加2
  )
  ctx.response.body = true
  const mailOptions = {
    from: mail.user,
    to: result.account,
    subject: '【西北大学资料共享中心】文件审核结果',
    text: `您上传的${file.name}已审核通过，下载数增加2，非常感谢。`
  }
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, err => {
      if(err) {
        console.log(err)
        reject(err)
      }
      resolve()
    })
  })
  await next()
}

exports.reject = async (ctx, next) => {
  const rootPath = path.resolve(__dirname, '..')
  const _id = mongoose.Types.ObjectId(ctx.request.body._id)
  const file = await AuditFile.findOneAndDelete({_id}, {select: ['Mime', 'provider', 'name']})
  const result = await User.findOne({nickName: file.provider})
  const mailOptions = {
    from: mail.user,
    to: result.account,
    subject: '【西北大学资料共享中心】文件审核结果',
    text: `您上传的${file.name}已被拒绝，原因是不符合要求，非常抱歉。`
  }
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, err => {
      if(err) {
        console.log(err)
        reject(err)
      }
      resolve()
    })
  })
  // 删除文件
  fs.unlinkSync(path.join(rootPath, 'uploads', _id + file.Mime))
  ctx.response.body = true
  await next()
}