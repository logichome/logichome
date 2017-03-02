const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname + './dist/',
        filename: 'build.js'
    },
    module: {
        rules:[
            {
                test: '/\.js(x)?$/',
                exclude:'/node_modules/',
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
                test:/\.ico/,
                loader: 'url-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            title:'LoGicHome',
            filename: 'index.html',
            template: 'index.html'
        })
    ]
}