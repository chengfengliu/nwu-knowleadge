const {User} = require('./UserModel.js')
const mongoose = require('mongoose')
const md5 = require('md5')
const java = require('java')
const send = require('koa-send')
const path = require('path')
const fs = require('fs')

exports.saveUser = async(ctx, next) => {
  const {nickName, name, number, school, account, password} = ctx.request.body
  await User.create({nickName, name, number, school, account, password: md5(password), downloadTimes: 3})
  await ctx.render('login', {signupAccount: ctx.request.body.account})
  await next()
}

exports.findUser = async(ctx, next) => {
  const {account, password} = ctx.request.body
  const doc = await User.findOne({account, password: md5(password)})
  if(!doc) {
    ctx.response.body = "<p>账号或密码错误。<a href='/login'>登录</a><span>或</span><a href='/'>首页</a></p>"
    return
  } 
  ctx.session.loggedIn = doc._id.toString()
  ctx.response.redirect('/')
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
  await ctx.render('moments', {momentsPagesCount: doc['moments'] ? Math.ceil(doc['moments'].length / 4) : 0, momentsPage,
                        moment0: (doc['moments'] && doc['moments'][(momentCountPerPage) - 4]) ? doc['moments'][(momentCountPerPage) - 4]['moment'] : '', image0: (doc['moments'] && doc['moments'][(momentCountPerPage) - 4]) ? `userImages/${ doc['_id'].toString() }/${ doc['moments'][(momentCountPerPage) - 4]['timeId'] }.jpg` : '', date0: (doc['moments'] && doc['moments'][(momentCountPerPage) - 4]) ? doc['moments'][(momentCountPerPage) - 4]['date'] : '',
                        moment1: (doc['moments'] && doc['moments'][(momentCountPerPage) - 3]) ? doc['moments'][(momentCountPerPage) - 3]['moment'] : '', image1: (doc['moments'] && doc['moments'][(momentCountPerPage) - 3]) ? `userImages/${ doc['_id'].toString() }/${ doc['moments'][(momentCountPerPage) - 3]['timeId'] }.jpg` : '', date1: (doc['moments'] && doc['moments'][(momentCountPerPage) - 3]) ? doc['moments'][(momentCountPerPage) - 3]['date'] : '',
                        moment2: (doc['moments'] && doc['moments'][(momentCountPerPage) - 2]) ? doc['moments'][(momentCountPerPage) - 2]['moment'] : '', image2: (doc['moments'] && doc['moments'][(momentCountPerPage) - 2]) ? `userImages/${ doc['_id'].toString() }/${ doc['moments'][(momentCountPerPage) - 2]['timeId'] }.jpg` : '', date2: (doc['moments'] && doc['moments'][(momentCountPerPage) - 2]) ? doc['moments'][(momentCountPerPage) - 2]['date'] : '',
                        moment3: (doc['moments'] && doc['moments'][(momentCountPerPage) - 1]) ? doc['moments'][(momentCountPerPage) - 1]['moment'] : '', image3: (doc['moments'] && doc['moments'][(momentCountPerPage) - 1]) ? `userImages/${ doc['_id'].toString() }/${ doc['moments'][(momentCountPerPage) - 1]['timeId'] }.jpg` : '', date3: (doc['moments'] && doc['moments'][(momentCountPerPage) - 1]) ? doc['moments'][(momentCountPerPage) - 1]['date'] : '',
  })
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
  const rootPath = path.resolve(__dirname, '..')
  const userImagePath = path.join(rootPath, 'assets', 'userImages', userId)
  const uploadDate = new Date()
  const uploadTime = uploadDate.getTime()
  // 只能用fs.readdirSync
  const dirs = fs.readdirSync(path.join(rootPath, 'assets', 'userImages'))
  console.log(dirs,path.join(rootPath, 'assets', 'userImages'),rootPath,userImagePath)
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
      ctx.response.body = '<p>完成上传<a href="/moments">返回</a></p>'
  } else { // 已有此用户文件夹
      fs.writeFileSync(path.join(userImagePath, `${ uploadTime }.jpg`), base64Data, {encoding: 'base64'})
      await User.findOneAndUpdate(
        {_id: mongoose.Types.ObjectId(ctx.session.loggedIn)},
        { $push:{'moments': {'moment': ctx.request.body.moment, 'timeId': uploadTime, 'date': `${ uploadDate.getFullYear() }-${ uploadDate.getMonth() }-${ uploadDate.getDate() } ${ uploadDate.getHours() }:${ uploadDate.getMinutes() }`}}}
      )
      ctx.response.body = '<p>完成上传<a href="/moments">返回</a></p>'
  }
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
  await ctx.render('moments', {momentsPagesCount: doc['moments'] ? Math.ceil(doc['moments'].length / 4) : 0, momentsPage,
                        moment0: (doc['moments'] && doc['moments'][(momentCountPerPage) - 4]) ? doc['moments'][(momentCountPerPage) - 4]['moment'] : '', image0: (doc['moments'] && doc['moments'][(momentCountPerPage) - 4]) ? `/userImages/${ doc['_id'].toString() }/${ doc['moments'][(momentCountPerPage) - 4]['timeId'] }.jpg` : '', date0: (doc['moments'] && doc['moments'][(momentCountPerPage) - 4]) ? doc['moments'][(momentCountPerPage) - 4]['date'] : '',
                        moment1: (doc['moments'] && doc['moments'][(momentCountPerPage) - 3]) ? doc['moments'][(momentCountPerPage) - 3]['moment'] : '', image1: (doc['moments'] && doc['moments'][(momentCountPerPage) - 3]) ? `/userImages/${ doc['_id'].toString() }/${ doc['moments'][(momentCountPerPage) - 3]['timeId'] }.jpg` : '', date1: (doc['moments'] && doc['moments'][(momentCountPerPage) - 3]) ? doc['moments'][(momentCountPerPage) - 3]['date'] : '',
                        moment2: (doc['moments'] && doc['moments'][(momentCountPerPage) - 2]) ? doc['moments'][(momentCountPerPage) - 2]['moment'] : '', image2: (doc['moments'] && doc['moments'][(momentCountPerPage) - 2]) ? `/userImages/${ doc['_id'].toString() }/${ doc['moments'][(momentCountPerPage) - 2]['timeId'] }.jpg` : '', date2: (doc['moments'] && doc['moments'][(momentCountPerPage) - 2]) ? doc['moments'][(momentCountPerPage) - 2]['date'] : '',
                        moment3: (doc['moments'] && doc['moments'][(momentCountPerPage) - 1]) ? doc['moments'][(momentCountPerPage) - 1]['moment'] : '', image3: (doc['moments'] && doc['moments'][(momentCountPerPage) - 1]) ? `/userImages/${ doc['_id'].toString() }/${ doc['moments'][(momentCountPerPage) - 1]['timeId'] }.jpg` : '', date3: (doc['moments'] && doc['moments'][(momentCountPerPage) - 1]) ? doc['moments'][(momentCountPerPage) - 1]['date'] : '',
  })
  await next()
}
exports.downloadVideo = async(ctx, next) => {
  java.classpath.push(path.resolve('lib', 'opencv-windows-x86_64.jar'))
  java.classpath.push(path.resolve('lib', 'ffmpeg-windows-x86_64.jar'))
  java.classpath.push(path.resolve('lib', 'javacpp.jar'))
  java.classpath.push(path.resolve('lib', 'javacv.jar'))
  let dirName = await User.findOne(
    {_id: mongoose.Types.ObjectId(ctx.session.loggedIn)}
  )
  dirName = dirName['_id'].toString()
  const saveMp4name = path.resolve('assets', 'userImages', dirName, 'f1.flv')
  const imagesPath = path.resolve('assets', 'userImages', dirName)
  java.callStaticMethodSync('javacvTest.TestRecorder2', 'test', saveMp4name, imagesPath)
  console.log('tesssssst',imagesPath)
  let reuslt = await send(ctx, 'f1.flv', {
      root: imagesPath
  })
  console.log('xxxx',reuslt)
  await next()
}
exports.getDownloadTimes = async(ctx, next) => {
  if (!ctx.session.loggedIn) {
      ctx.response.body = '<p>请先登录<a href="/">返回首页</a></p>'
      return
  }
  const user = await User.findOne({'_id': mongoose.Types.ObjectId(ctx.session.loggedIn)})
  ctx.response.body = {'nowDownloadTimes': user['downloadTimes'] - 1}
  await next()
}