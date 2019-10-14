const {Log} = require('./LogModel.js')
const {User} = require('./UserModel.js')
const mongoose = require('mongoose')

exports.add = add = async(operator, operation) => {
  const date = new Date()
  await Log.create({
    operator, 
    operation,
    time: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
  })
}

exports.get = async(ctx, next) => {
  const logs = await Log.find()
  ctx.body = {
    logs,
  }
  await next()
}

exports.addPageViewLog = async(ctx, next) => {
  if(ctx.session.loggedIn) {
    const user = await User.findOne({_id: mongoose.Types.ObjectId(ctx.session.loggedIn)})
    await add(user.nickName, `浏览${ctx.request.body.pageName}`)
  } else {
    await add('无', `浏览${ctx.request.body.pageName}`)
  }
  await next()
}