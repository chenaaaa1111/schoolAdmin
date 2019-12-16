// 如果没有可以新建，新建后自动打开
// 这里可以配置所有的vue选项


const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    publicPath: './',
    configureWebpack: {
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        warnings: false,
                        compress: {
                            pure_funcs: ['console.log','console.debug']//移除console
                        }
                    }
                })
            ]
        },
    },
};
