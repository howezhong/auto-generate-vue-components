// Vue模板文件
module.exports = {
  vueTemplate: (name, lang) => {
    return `<template>
  <div class="${toCamelCase(name)}">
    ${name}组件
  </div>
</template>

<script>
export default {
  name: '${startToUpperCase(name)}'
}
</script>

<style lang="${lang}" scoped>
</style>
`
  },
  exportTemplate: name => {
    return `import ${startToUpperCase(name)} from './${name}.vue'\nexport default ${startToUpperCase(name)}\n`
  }
}

/**
 * 首字母大写
 * @param {String} str
 */
function startToUpperCase (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 驼峰转短横线, 如: howeZhong => howe-zhong
 * @param {String} str
 */
function toCamelCase (str) {
  const res = str.replace(/[A-Z]/g, item => {
    return '-' + item.toLowerCase()
  })
  return (res.charAt(0) === '-') ? res.slice(1) : res
}
