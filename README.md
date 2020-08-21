# 自动生成Vue组件

## 介绍
> 通过终端自动创建 `vue` 组件

[Gitee源](https://gitee.com/howezhong/auto-generate-vue-components)

**环境依赖**
```sh
# chalk
npm install -D chalk

# inquirer
npm install -D inquirer
```

**npm**
```sh
# package.json 添加快捷执行指令
"scripts": {
    "new": "node ./scripts/generate"
}

# 终端使用
npm run new
```

**文件介绍**
```sh
automatically-generate-vue-components
├─scripts
│      generate.js # 自动执行脚本
│      template.js # 模板文件
│      tools.js    # 工具函数
│─src
│    ├─components
│    └─views
```

## License

[MIT](https://gitee.com/howezhong/auto-generate-vue-components/blob/master/LICENSE)
