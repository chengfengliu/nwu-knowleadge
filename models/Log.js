const {Log} = require('./LogModel.js')

exports.add = async(operator, operation) => {
  const date = new Date()
  await Log.create({
    operator, 
    operation,
    time: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
  })
}