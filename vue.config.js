const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      '/api':{
        target:'http://192.168.193.141:8080/feiyi',
        pathRewrite: {
          '/api': '' 
        }
      }
    }
  }
})
