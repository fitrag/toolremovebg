const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
  proxy: 'http://127.0.0.1:3000',
 },
  transpileDependencies: true
})
