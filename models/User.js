const {User} = require('./UserModel.js')
const {Code} = require('./CodeModel.js')
const Log = require('./Log.js')
const mongoose = require('mongoose')
const md5 = require('md5')
const java = require('java')
const send = require('koa-send')
const path = require('path')
const fs = require('fs')
const nodemailer = require('nodemailer')
const mail = require('../config.js').mail
exports.saveUser = async(ctx, next) => {
  const {nickName, name, number, school, account, password, verificationCode} = ctx.request.body
  const doc = await User.find({nickName})
  if(doc.length !== 0) {
    ctx.response.body = {
      success: false,
      type: '用户名已被注册'
    }
    return
  }
  const result = await Code.find({account, verificationCode})
  if(result.length === 0) {
    ctx.response.body = {
      success: false,
      type: '验证码错误'
    }
    return
  }
  await User.create({nickName, name, number, school, account, password: md5(password), downloadTimes: 1})
  await Log.add(nickName, '注册')
  ctx.response.body = {
    success: true,
    account
  }
  await next()
}

exports.findUser = async(ctx, next) => {
  const {account, password} = ctx.request.body
  if(account === 'admin' && password === 'nwulcfadmin') {
    ctx.response.body = {
      type: 'administrator'
    }
    return
  }
  const doc = await User.findOne({account, password: md5(password)})
  if(!doc) {
    ctx.response.body = false
    return
  } 
  ctx.session.loggedIn = doc._id.toString()
  ctx.response.body = {
    type: 'user'
  }
  await Log.add(doc.nickName, '登录')
  await next()
}

exports.allMoments = async(ctx, next) => {
  if (!ctx.session.loggedIn) {
      ctx.response.body = '<p>请先登录<a href="/">返回首页</a></p>'
      return
  }
  // 想法的页码数
  const momentsPage = 1
  // 每4个想法一页
  const momentCountPerPage = momentsPage * 4
  const doc = await User.findOne({_id: mongoose.Types.ObjectId(ctx.session.loggedIn)})
  ctx.response.body =  {momentsPagesCount: doc['moments'] ? Math.ceil(doc['moments'].length / 4) : 0, momentsPage,
                        moment0: (doc['moments'] && doc['moments'][(momentCountPerPage) - 4]) ? doc['moments'][(momentCountPerPage) - 4]['moment'] : '', image0: (doc['moments'] && doc['moments'][(momentCountPerPage) - 4]) ? `${ doc['_id'].toString() }/${ doc['moments'][(momentCountPerPage) - 4]['timeId'] }.jpg` : '', date0: (doc['moments'] && doc['moments'][(momentCountPerPage) - 4]) ? doc['moments'][(momentCountPerPage) - 4]['date'] : '',
                        moment1: (doc['moments'] && doc['moments'][(momentCountPerPage) - 3]) ? doc['moments'][(momentCountPerPage) - 3]['moment'] : '', image1: (doc['moments'] && doc['moments'][(momentCountPerPage) - 3]) ? `${ doc['_id'].toString() }/${ doc['moments'][(momentCountPerPage) - 3]['timeId'] }.jpg` : '', date1: (doc['moments'] && doc['moments'][(momentCountPerPage) - 3]) ? doc['moments'][(momentCountPerPage) - 3]['date'] : '',
                        moment2: (doc['moments'] && doc['moments'][(momentCountPerPage) - 2]) ? doc['moments'][(momentCountPerPage) - 2]['moment'] : '', image2: (doc['moments'] && doc['moments'][(momentCountPerPage) - 2]) ? `${ doc['_id'].toString() }/${ doc['moments'][(momentCountPerPage) - 2]['timeId'] }.jpg` : '', date2: (doc['moments'] && doc['moments'][(momentCountPerPage) - 2]) ? doc['moments'][(momentCountPerPage) - 2]['date'] : '',
                        moment3: (doc['moments'] && doc['moments'][(momentCountPerPage) - 1]) ? doc['moments'][(momentCountPerPage) - 1]['moment'] : '', image3: (doc['moments'] && doc['moments'][(momentCountPerPage) - 1]) ? `${ doc['_id'].toString() }/${ doc['moments'][(momentCountPerPage) - 1]['timeId'] }.jpg` : '', date3: (doc['moments'] && doc['moments'][(momentCountPerPage) - 1]) ? doc['moments'][(momentCountPerPage) - 1]['date'] : '',
  }
  await next()
}

exports.addMoment = async(ctx, next) => {
  if (!ctx.session.loggedIn) {
      ctx.response.body = '<p>请先登录<a href="/">返回首页</a></p>'
      return
  }

  const base64Data = ctx.request.body.image.replace(/^data:image\/\w+;base64,/, "").replace(/\s/g, "+")
  const userId = mongoose.Types.ObjectId(ctx.session.loggedIn).toString()
  // path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。
  const rootPath = path.resolve(__dirname, '..', '..')
  const userImagePath = path.join(rootPath, 'userImages', userId)
  const uploadDate = new Date()
  const uploadTime = uploadDate.getTime()
  // 只能用fs.readdirSync
  const dirs = fs.readdirSync(path.join(rootPath, 'userImages'))
  // 没此用户的文件夹，则创建
  if (dirs.indexOf(userId) === -1 ){
      fs.mkdirSync(userImagePath)
      fs.writeFileSync(path.join(userImagePath, `${ uploadTime }.jpg`), base64Data, {encoding: 'base64'})
      //要把req.session.loggedIn转为ObjectId对象，本来是字符串对象，不然对不上会新建一个collection
      await User.findOneAndUpdate(
        {_id: mongoose.Types.ObjectId(ctx.session.loggedIn)},
        //$push向数组增加数据，不能插入req.body，这是对象，而是插入req.body['moment']字符串
        { $push:{'moments': {'moment': ctx.request.body.moment, 'timeId': uploadTime, 'date': `${ uploadDate.getFullYear() }-${ uploadDate.getMonth() }-${ uploadDate.getDate() } ${ uploadDate.getHours() }:${ uploadDate.getMinutes() }`}}}
      )      
  } else { // 已有此用户文件夹
      fs.writeFileSync(path.join(userImagePath, `${ uploadTime }.jpg`), base64Data, {encoding: 'base64'})
      await User.findOneAndUpdate(
        {_id: mongoose.Types.ObjectId(ctx.session.loggedIn)},
        { $push:{'moments': {'moment': ctx.request.body.moment, 'timeId': uploadTime, 'date': `${ uploadDate.getFullYear() }-${ uploadDate.getMonth() }-${ uploadDate.getDate() } ${ uploadDate.getHours() }:${ uploadDate.getMinutes() }`}}}
      )
  }
  ctx.response.body = true
  await next()
}

exports.otherMoments = async(ctx, next) => {
  if (!ctx.session.loggedIn) {
      ctx.response.body = '<p>请先登录<a href="/">返回首页</a></p>'
      return
  }
  // 想法的页码数
  const momentsPage = ctx.params.pageNo
  const momentCountPerPage = momentsPage * 4
  const doc = await User.findOne({_id: mongoose.Types.ObjectId(ctx.session.loggedIn)})
  ctx.response.body = {momentsPagesCount: doc['moments'] ? Math.ceil(doc['moments'].length / 4) : 0, momentsPage,
                        moment0: (doc['moments'] && doc['moments'][(momentCountPerPage) - 4]) ? doc['moments'][(momentCountPerPage) - 4]['moment'] : '', image0: (doc['moments'] && doc['moments'][(momentCountPerPage) - 4]) ? `${ doc['_id'].toString() }/${ doc['moments'][(momentCountPerPage) - 4]['timeId'] }.jpg` : '', date0: (doc['moments'] && doc['moments'][(momentCountPerPage) - 4]) ? doc['moments'][(momentCountPerPage) - 4]['date'] : '',
                        moment1: (doc['moments'] && doc['moments'][(momentCountPerPage) - 3]) ? doc['moments'][(momentCountPerPage) - 3]['moment'] : '', image1: (doc['moments'] && doc['moments'][(momentCountPerPage) - 3]) ? `${ doc['_id'].toString() }/${ doc['moments'][(momentCountPerPage) - 3]['timeId'] }.jpg` : '', date1: (doc['moments'] && doc['moments'][(momentCountPerPage) - 3]) ? doc['moments'][(momentCountPerPage) - 3]['date'] : '',
                        moment2: (doc['moments'] && doc['moments'][(momentCountPerPage) - 2]) ? doc['moments'][(momentCountPerPage) - 2]['moment'] : '', image2: (doc['moments'] && doc['moments'][(momentCountPerPage) - 2]) ? `${ doc['_id'].toString() }/${ doc['moments'][(momentCountPerPage) - 2]['timeId'] }.jpg` : '', date2: (doc['moments'] && doc['moments'][(momentCountPerPage) - 2]) ? doc['moments'][(momentCountPerPage) - 2]['date'] : '',
                        moment3: (doc['moments'] && doc['moments'][(momentCountPerPage) - 1]) ? doc['moments'][(momentCountPerPage) - 1]['moment'] : '', image3: (doc['moments'] && doc['moments'][(momentCountPerPage) - 1]) ? `${ doc['_id'].toString() }/${ doc['moments'][(momentCountPerPage) - 1]['timeId'] }.jpg` : '', date3: (doc['moments'] && doc['moments'][(momentCountPerPage) - 1]) ? doc['moments'][(momentCountPerPage) - 1]['date'] : '',
  }
  await next()
}

exports.downloadVideo = async(ctx, next) => {
  if(process.env.NODE_ENV === 'development') {
    java.classpath.push(path.resolve('lib', 'opencv-windows-x86_64.jar'))
    java.classpath.push(path.resolve('lib', 'ffmpeg-windows-x86_64.jar'))
  } else if(process.env.NODE_ENV === 'production') {
    java.classpath.push(path.resolve('lib', 'opencv-linux-x86_64.jar'))
    java.classpath.push(path.resolve('lib', 'ffmpeg-linux-x86_64.jar'))
  }
  java.classpath.push(path.resolve('lib', 'javacpp.jar'))
  java.classpath.push(path.resolve('lib', 'javacv.jar'))
  let dirName = await User.findOne(
    {_id: mongoose.Types.ObjectId(ctx.session.loggedIn)}
  )
  dirName = dirName['_id'].toString()
  const saveMp4name = path.resolve('..', 'userImages', dirName, 'f1.flv')
  const imagesPath = path.resolve('..', 'userImages', dirName)
  java.callStaticMethodSync('javacvTest.TestRecorder2', 'test', saveMp4name, imagesPath)
  await send(ctx, 'f1.flv', {
      root: imagesPath
  })
  await next()
}

exports.getDownloadTimes = async(ctx, next) => {
  if (!ctx.session.loggedIn) {
      ctx.response.body = '<p>请先登录<a href="/">返回首页</a></p>'
      return
  }
  const user = await User.findOne({'_id': mongoose.Types.ObjectId(ctx.session.loggedIn)})
  ctx.response.body = {'nowDownloadTimes': user['downloadTimes']}
  await next()
}

exports.getUserSignUpStatusAndNickName = async(ctx, next) => {
  if (ctx.session.loggedIn) {
    const user = await User.findOne({'_id': mongoose.Types.ObjectId(ctx.session.loggedIn)})
    ctx.response.body = {
      hasLoggedIn: true,
      userNickName: user.nickName
    }
  } else {
    ctx.response.body = {
      hasLoggedIn: false
    }
  }
  await next()
}

module.exports.getUsers = async(ctx, next) => {
  const users = await User.find({})
  ctx.response.body = {
    users
  }
  await next()
}

const transporter = nodemailer.createTransport({
  service: 'qq',
  auth: {
    user: mail.user,
    pass: mail.pass
  }
})
module.exports.getCode = async(ctx, next) => {
  const {mailAddress} = ctx.request.body
  const doc = await User.find({account: mailAddress})
  if(doc.length !== 0) {
    ctx.response.body = {
      success: false,
      type: '邮箱已被注册'
    }
    return
  }
  const verificationCode = `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`
  const mailOptions = {
    from: mail.user,
    to: mailAddress,
    subject: '【西北大学资料共享中心】验证码',
    text: `验证码为${verificationCode}，仅用于账号注册，请勿告知他人`
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
  const result = await Code.find({account: mailAddress})
  if(result.length !== 0) {
    await Code.update({account: mailAddress}, {$set: {verificationCode}})
  } else {
    await Code.create({
      account: mailAddress,
      verificationCode
    })
  }
  ctx.response.body = {
    success: true
  }
  await next()
}