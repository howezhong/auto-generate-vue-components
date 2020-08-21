const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

/**
 * 递归创建多级目录-同步
 * @param {String} directory 路径地址, 如: C:\Users\vip013\Desktop\howe\src\components\howe
 */
const generateMkdirs = (directory) => {
  if (fs.existsSync(directory)) {
    return true
  }
  if (generateMkdirs(path.dirname(directory))) {
    fs.mkdirSync(directory)
    return true
  }
}

// 生成文件
const generateFile = (filePath, data) => {
  if (fs.existsSync(filePath)) {
    logger(chalk.yellow(`${filePath} 文件已存在`))
    return
  }
  return fs.writeFileSync(filePath, data, 'utf8')
}

const logger = console.log

/**
 * logger
 * @param {String} name [components, views, vue, js]
 * @param {String} desc [directory, Component, Export file]
 * @param {String} filePath address
 */
const loggerFn = (name, desc, filePath) => {
  return logger(`${chalk.black.bold('Generating')} ${chalk.magenta.bold(name)} ${chalk.black.bold(desc)} ${chalk.cyan.bold(filePath)}`)
}

module.exports = {
  generateMkdirs,
  generateFile,
  logger,
  loggerFn
}
