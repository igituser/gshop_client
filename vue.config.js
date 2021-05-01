const px2rem = require('postcss-px2rem')
const postcss = px2rem({
    remUnit: 37.5
})


module.exports = {
    runtimeCompiler: true,
    lintOnSave: false, //关闭eslint语法检查

    //css配置
    css:{
        loaderOptions:{
            postcss:{
                plugins:[
                    postcss
                ]
            }
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                ws: true,
                changeOrigin: true,
                pathRewrite:{
                    '^/api': '',
                }
            },
        }
    }
}