const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      '/api':{
        target:'http://47.99.47.99:8080/feiyi',
        pathRewrite: {
          '/api': '' 
        }
      }
    }
  }
})
