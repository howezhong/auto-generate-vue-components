const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const { generateMkdirs, generateFile, logger, loggerFn } = require('./tools')
// 导入模板
const { vueTemplate, exportTemplate } = require('./template')

const questions = []
let filePath = null

questions.push({
  type: 'list',
  name: 'address',
  message: '请选择存储位置',
  choices: [
    { name: '组件-存放于 components 目录', value: 'components' },
    { name: '视图-存放于 views 目录', value: 'views' }
  ],
  default: 'components'
})

questions.push({
  type: 'input',
  name: 'name',
  message: '请输入组件名, 如: howeZhong: ',
  validate(value) {
    const done = this.async()
    setTimeout(() => {
      if (!value) {
        done('组件名不能为空')
        return
      }
      const dir = `${filePath}/${value}`
      if (fs.existsSync(dir)) {
        done('项目中已存在该组件, 请更换其他组件名')
        return
      }
      done(null, true)
    })
  },
  when(answers) {
    filePath = path.resolve(__dirname, `../src/${answers.address}`)
    return true
  }
})

questions.push({
  type: 'list',
  name: 'lang',
  message: '选择一个 Vue组件的 lang 语言',
  choices: ['scss', 'less', 'stylus'],
  default: 'less'
})

inquirer.prompt(questions).then(answers => {
  const { address, name, lang } = answers

  // 生成目录
  const dir = path.resolve(__dirname, `../src/${address}`, name)
  loggerFn(address, 'directory', dir)
  try {
    generateMkdirs(dir)
  } catch (e) {
    logger(chalk.red(e))
  }

  // 生成文件
  try {
    const arrs = name.split('/')
    const str = arrs[arrs.length - 1]
    // vue组件路径
    const temp = path.resolve(dir, str + '.vue')
    // 导出文件
    const gate = path.resolve(dir, 'index.js')

    // 生成 vue 组件
    loggerFn('vue', 'Component', temp)
    generateFile(temp, vueTemplate(str, lang))
    // 生成 index.js 导出文件
    loggerFn('js', 'Export file', dir)
    generateFile(gate, exportTemplate(str))

    logger(chalk.blue('Generated successfully'))
  } catch (e) {
    logger(chalk.red(e))
  }
  // end
  process.exit()
}).catch(error => {
  logger(chalk.red('组件创建失败'))
  logger(chalk.red(error))
  process.exit(1)
})
