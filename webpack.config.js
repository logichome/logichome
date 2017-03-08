const htmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname + '/dist/',
        publicPath:"http://127.0.0.1/",
        filename: 'build.js'
    },
    module: {
        rules:[
            {
                test: /\.js(x)?$/,
                exclude:/node_modules/,
                loader:'babel-loader',
            },
            {
                test:/\.css$/,
                loader:'style-loader!css-loader'
            },
            {
                test: /\.styl(us)?$/,
                loader: 'style-loader!css-loader!stylus-loader'
            },
            {
                test:/\.(png|jp(e)?g|gif)/,
                loader: 'url-loader',
                query: {
                    limit:4000,
                    name:'imgs/[name].[md5:hash:hex:7].[ext]'
                }
            },
            {
                test:/\.(ttf|svg|eot|woff)/,
                loader: 'url-loader',
                query: {
                    limit:4000,
                    name:'font/[name].[md5:hash:hex:7].[ext]'
                }
            },
            {
                test:/\.ico$/,
                loader: 'url-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options:{
                postcss: [
                    autoprefixer({
                        browsers: ['last 20 versions']
                    })
                ]
            }
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            title:'LoGicHome',
            favicon:'src/static/favicon.ico',
            filename: 'index.html',
            template: 'index.html'
        }),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,    //删除所有注释
            compress: {
                warnings: false, //删除没用到的代码时不输出警告
                drop_console: false,  //删除所有console语句
                collapse_vars: true,    // 内嵌定义了但是只用到一次的变量
                reduce_vars: true   //提取出出现多次但是没有定义成变量去引用的静态值
            }
        }),
    ]
};
