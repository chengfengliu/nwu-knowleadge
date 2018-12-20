const {User} = require('./UserModel.js')
const {File} = require('./FileModel.js')
const send = require('koa-send')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')

exports.allFiles = async(ctx, next) => {
  if (!ctx.session.loggedIn) {
      ctx.response.body = "<p>请先登录<a href='/'>返回首页</a></p>"
      return
  }
  const files = await File.find()
  const user = await User.findOne({'_id': mongoose.Types.ObjectId(ctx.session.loggedIn)})
  ctx.response.body = {'files': JSON.stringify(files), 'downloadTimes': user['downloadTimes']}
  await next()
}

exports.add = async(ctx, next) => {
  // req.body 将具有文本域数据，如果存在的话
  const rootPath = path.resolve(__dirname, '..')
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
  // 找到用户名后才插入
  const insertedFile = await File.create({'name': `${ uploadFile }${ Mime }`, 'fileBelong': ctx.req.body.fileBelong, 'major': ctx.req.body.major, 'provider': user['nickName'], 'downloadedTimes': 0})
  //以ObjectId重命名文件 加上文件后缀
  fs.renameSync(path.join(rootPath, 'uploads', file.filename), path.join(rootPath, 'uploads', `${ insertedFile['_id'].toString() }${ Mime }`))
  // 找到才能更新
  await User.findOneAndUpdate(
      {'_id': user['_id']},
      {$set: {'downloadTimes': user['downloadTimes'] + 5}}  // 可下载数加5
  )
  ctx.response.body = {
      _id: `${ insertedFile['_id'].toString() }`,
      name: file.originalname,
      fileBelong: ctx.req.body.fileBelong,
      major: ctx.req.body.major,
      provider: user.nickName,
      downloadedTimes: 0
  }
  await next()
}

exports.download = async(ctx, next) => {
    if (!ctx.session.loggedIn) {
        ctx.response.body = "<p>请先登录<a href='/'>返回首页</a></p>"
        return
    }
    const user = await User.findOne({_id: mongoose.Types.ObjectId(ctx.session.loggedIn)})
    const rootPath = path.resolve(__dirname, '..')
    // 用户可下载次数减1
    await User.findOneAndUpdate(
        {'_id': user['_id']},
        {$set: {'downloadTimes': user['downloadTimes'] - 1}}
    )
    // 文件被下载次数加1
    await File.findOneAndUpdate(
        {'_id': mongoose.Types.ObjectId(ctx.params._id.split('.')[0])},
        {$inc: {'downloadedTimes': 1}},
    )    
    await send(ctx, ctx.params._id, {
        root: path.join(rootPath, 'uploads')
    })
    await next()
}