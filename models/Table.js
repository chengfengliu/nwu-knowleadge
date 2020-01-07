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
  // 补全字符
  const c = ''
  // 总表
  const targetSheet = xlsx.parse(path.resolve(__dirname, '..', '..', 'target.xlsx'))
  const fileList = fs.readdirSync(path.resolve(__dirname, '..', '..','tables'))
  fileList.forEach(file => {
    const workSheets = xlsx.parse(path.resolve(__dirname, '..', '..','tables', file))
    // 表头插入列名，去除工资代码和姓名
    targetSheet[0].data[0] = targetSheet[0].data[0].concat(workSheets[0].data[0].slice(2))
    console.log(workSheets[0].data[0][2])
    // 插入表列数量
    colCount = workSheets[0].data[0].length
    // 总表列数量
    allCount = targetSheet[0].data[0].length
    console.log('allCount', targetSheet[0].data[0], allCount)
    workSheets[0].data.forEach(item => {
      // console.log('item', item)
      targetSheet[0].data.forEach((target, index) => {
        // if(item[1] === '张涛' && target[1] === '张涛') {
        //   console.log('target[0]', target[0],typeof target[0], 'item[0]', item[0],typeof item[0], 'target[0] === item[0]', target[0] === item[0], ' target[1] === item[1]',  target[1] === item[1])
        // }
        // 不匹配表头          工号和姓名相同而且不为两样同时空相同                                           插入表工号为空且姓名不为空而且姓名相同且不是张涛
        if( index !== 0 && ( (String(target[0]) === String(item[0]) && target[1] === item[1] && (item[0] || item[1])) || (!item[0] && item[1] && target[1] === item[1] && item[1] !== '张涛')) ) { 
          // console.log('target[0]', target[0], 'item[0]', item)
          // 补全
          while(item.length < colCount) {
            item.push(c)
          }
          targetSheet[0].data[index] = target.concat(item.splice(2))
          // console.log('new target', target)
        }
      })
    })
    // 若没匹配补全
    targetSheet[0].data.forEach((target, index) => {
      if(index !==0 && target.length !== allCount) {
        while(target.length < allCount) {
          target.push(c)
        }
        targetSheet[0].data[index] = target
      }
    })
  })
  const buffer = xlsx.build([{name: "sheet1", data: targetSheet[0].data}])
  fs.writeFileSync(path.resolve(__dirname, '..', '..','tables', 'sheet.xlsx'), buffer)
  await send(ctx, 'sheet.xlsx', {
    root: path.resolve(__dirname, '..', '..', 'tables')
  })
  fs.unlink(path.resolve(__dirname, '..', '..', 'tables', 'sheet.xlsx'), () => {
    console.log('delete success')
  })
  await next()
}

exports.clear = async(ctx, next) => {
  const fileList = fs.readdirSync(path.resolve(__dirname, '..', '..','tables'))
  fileList.forEach(file => {
    fs.unlink(path.resolve(__dirname, '..', '..', 'tables', file), () => {
      console.log('delete success')
    })
  })
  ctx.body = {
    success: true
  }
  await next()
}