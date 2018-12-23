const webpack = require('webpack');
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpackHotMiddleware = require('koa-webpack-hot-middleware')
const config = require('./webpack.config');

const Koa = require('koa')
const static = require('koa-static')
const session = require('koa-session')
const Router = require('koa-router')
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const multer = require('koa-multer')
const upload = multer({ dest: 'uploads/' })
const path = require('path')
const port = parseInt(process.env.NODE_PORT)
const app = new Koa()
const router = new Router()

const mongoose = require('mongoose')
const User = require('./models/User.js')
const Blog = require('./models/Blog.js')
const File = require('./models/File.js')
const db = 'mongodb://localhost:27017/koa-react'

const compiler = webpack(config(process.env.NODE_ENV))
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config(process.env.NODE_ENV).output.publicPath }))
if(process.env.NODE_ENV === 'development') {
  console.log('env development')
  app.use(webpackHotMiddleware(compiler))
} else if(process.env.NODE_ENV === 'production') {
  console.log('env production')
}
app.use(bodyParser({enableTypes:['json', 'form', 'text'],formLimit: '1mb'}))
app.use(static(path.join(__dirname, 'assets')))
app.use(views(path.join(__dirname, 'views')))
app.keys = ['some secret hurr']
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
}
app.use(session(CONFIG, app))

router.get("/", async(ctx, next) => {
  await ctx.render('index')
  await next()
})
router.get("/api/signUpStatus", User.getUserSignUpStatusAndNickName)
router.post('/api/signup', User.saveUser)
router.get('/api/getAllBlogs', Blog.allBlogs)
router.get('/api/getOtherBlogs/:pageNo', Blog.otherBlogs)
router.post('/api/login', User.findUser)
router.get('/api/logout', async(ctx, next) => {
  ctx.session.loggedIn = null
  ctx.response.body = {
    hasLoggedIn: false
  }
  await next()
})
router.get('/api/myBlog', Blog.userBlogs)
router.post('/api/submitBlog', Blog.add)
router.post('/api/thumbsUp', Blog.thumbsUp)
router.post('/api/submitComment', Blog.comment)
router.post('/api/editBlog', Blog.editBlog)
router.post('/api/removeBlog', Blog.removeBlog)

router.get('/api/getAllmoments', User.allMoments)
router.get('/api/getOtherMoments/:pageNo', User.otherMoments)
router.get('/api/downloadVideo', User.downloadVideo)
router.post('/api/updateMoments', User.addMoment)

router.get('/api/download', File.allFiles)
router.post('/api/upload', upload.single('myfile'), File.add)
router.get('/api/download/:_id', File.download)
router.get('/api/getDownloadTimes', User.getDownloadTimes)

app.use(router.routes()).use(router.allowedMethods())

mongoose.connect(db)
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connection open to ${db}`)
  app.listen(port, function(error) {
    if (error) {
      console.error(error)
    } else {
      console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
  })
})