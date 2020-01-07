const xlsx = require('node-xlsx')
const send = require('koa-send')
const path = require('path')
const fs = require('fs')

exports.add = async(ctx, next) => {
  const file = ctx.req.file
  ctx.body = {
    name: file.originalname
  }
  await next()
}

exports.handle = async(ctx, next) => {
  const data = []
  // 总表
  const targetSheet = xlsx.parse(path.resolve(__dirname, '..', '..', 'target.xlsx'))
  const fileList = fs.readdirSync(path.resolve(__dirname, '..', '..','tables'))
  fileList.forEach(file => {
    const workSheets = xlsx.parse(path.resolve(__dirname, '..', '..','tables', file))
    // 表头插入列名，去除工资代码和姓名
    targetSheet[0].data[0] = targetSheet[0].data[0].concat(workSheets[0].data[0].splice(2))
    workSheets[0].data.forEach(item => {
      // console.log('item', item)
      targetSheet[0].data.forEach((target, index) => {
        // 工资代码匹配
        if(target[0] === item[0] && target[1] == item[1] && index !== 0 && (target[0] || target[1]) || (target[0] === item[0] && item[1] === '张涛')) {
          // console.log('target[0]', target[0], 'item[0]', item[0])
          targetSheet[0].data[index] = target.concat(item.splice(2))
          // console.log('new target', target)
        }
      })
    })
  })
  const buffer = xlsx.build([{name: "sheet1", data: targetSheet[0].data}])
  fs.writeFileSync(path.resolve(__dirname, '..', '..','tables', 'sheet.xlsx'), buffer)
  await send(ctx, 'sheet.xlsx', {
    root: path.resolve(__dirname, '..', '..', 'tables')
  })
  fs.unlink(path.resolve(__dirname, '..', '..', 'tables', 'sheet.xlsx'))
  await next()
}