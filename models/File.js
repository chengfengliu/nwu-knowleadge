const {User} = require('./UserModel.js')
const {File} = require('./FileModel.js')
const Log = require('./Log.js')
const {AuditFile} = require('./AuditFileModel.js')
const send = require('koa-send')
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

exports.allFiles = async(ctx, next) => {
  const files = await File.find()
  const user = await User.findOne({'_id': mongoose.Types.ObjectId(ctx.session.loggedIn)})
  ctx.response.body = {files, 'downloadTimes': user['downloadTimes']}
  await next()
}

exports.add = async(ctx, next) => {
  // req.body 将具有文本域数据，如果存在的话
  const rootPath = path.resolve(__dirname, '..', '..')
  const file = ctx.req.file
  if(!file) {
      ctx.response.body = {
          name: ''
      }
      return
  }
  //以下代码得到文件后缀
  const name = file.originalname
  const nameArray = name.split('')
  let nameMime = []
  //压出
  let l = nameArray.pop()
  //压人
  nameMime.unshift(l)
  while(nameArray.length != 0 && l != '.') {
      l = nameArray.pop()
      nameMime.unshift(l)
  }
  //Mime是文件的后缀名
  const Mime = nameMime.join('')
  const uploadFile = file.originalname.slice(0, -nameMime.length)
  const user = await User.findOne({_id: mongoose.Types.ObjectId(ctx.session.loggedIn)})
  // 找到用户名后才插入AuditFile
  const insertedFile = await AuditFile.create({'name': `${ uploadFile }${ Mime }`, 'fileBelong': ctx.req.body.fileBelong, 'major': ctx.req.body.major, 'provider': user['nickName'], 'provider_id': user['_id'], 'downloadedTimes': 0, Mime})
  //以ObjectId重命名文件 加上文件后缀
  fs.renameSync(path.join(rootPath, 'uploads', file.filename), path.join(rootPath, 'uploads', `${ insertedFile['_id'].toString() }${ Mime }`))

  ctx.response.body = {
      _id: `${ insertedFile['_id'].toString() }`,
      name: file.originalname,
      fileBelong: ctx.req.body.fileBelong,
      major: ctx.req.body.major,
      provider: user.nickName,
      downloadedTimes: 0
  }
  const mailOptions = {
    from: mail.user,
    to: mail.admin,
    subject: '【西北大学资料共享中心】文件审核',
    text: `${user.nickName}上传${file.originalname}到${ctx.req.body.fileBelong}，请尽快审核`
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
  await Log.add(user.nickName, `上传${file.originalname}文件到${ctx.req.body.fileBelong}`)
  await next()
}

exports.download = async(ctx, next) => {
    const user = await User.findOne({_id: mongoose.Types.ObjectId(ctx.session.loggedIn)})
    if(user.downloadTimes <= 0 && user.nickName !== '快毕业的老学姐') {
      return 
    }
    const rootPath = path.resolve(__dirname, '..', '..')
    // 用户可下载次数减1
    await User.findOneAndUpdate(
        {'_id': user['_id']},
        {$set: {'downloadTimes': user['downloadTimes'] - 1}}
    )
    // 文件被下载次数加1
    const file = await File.findOneAndUpdate(
        {'_id': mongoose.Types.ObjectId(ctx.params._id.split('.')[0])},
        {$inc: {'downloadedTimes': 1}},
    )    
    await send(ctx, ctx.params._id, {
        root: path.join(rootPath, 'uploads')
    })
    await Log.add(user.nickName, `下载${file.name}文件`)
    await next()
}

exports.fileAmountAndDownloadAmount = async(ctx, next) => {
  const files = await File.find()
  let downloadAmount = 0
  files.forEach((file) => {
    downloadAmount += Number(file.downloadedTimes)
  })
  ctx.body = {
    fileAmount: files.length,
    downloadAmount,
  }
  await next()
}