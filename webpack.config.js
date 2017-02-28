const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname + '/dist/',
        filename: 'build.js'
    },
    module: {
        rules:[
            {
                test: '/\.js(x)?$/',
                exclude:'/node_modules/',
                loader:'babel-loader',
                // query: {
                //     presets: ['es2015',{ "modules": false }],
                //     plugins: ['transform-runtime',["component", [
                //         { "libraryName": "mint-ui", "style": true }
                //     ]]]
                // }
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
                test:/\.(png|jpg|gif|ttf|svg|eot|woff)/,
                loader: 'url-loader?limit=4000'
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