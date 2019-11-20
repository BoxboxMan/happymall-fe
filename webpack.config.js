/*
* @Author: MR.S
* @Date:   2019-11-13 19:30:01
* @Last Modified by:   MR.S
* @Last Modified time: 2019-11-20 14:10:17
*/
var webpack             = require('webpack');
var Ex                  = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');
var getHtmlConfig       = function(name){
    return{
        template : './src/view/'+ name +'.html',
        filename : 'view/'+ name +'.html',
        inject   : true,
        hash     : true,
        chunks   : ['common',name]
    }
}
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

module.exports={
    entry:{
        "common" : './src/page/common/main.js',
        "index" : "./src/page/index/main.js",
        "login" : "./src/page/login/main.js",
    },
    output:{
        path:'./dist',
        publicPath:'/dist',
        filename:'/js/[name].js'
    },
    module:{
        loaders:[
            { 
                test:/\.css$/,
                loader:Ex.extract('style-loader', 'css-loader'),
            },
            { 
                test:/\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
                loader:'url-loader?limit=100&name=/resource/[name].[ext]'
            }
        ]
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : '/js/commons.js',
        }),
        new Ex("/css/[name].css"),
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ]
};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8090/');
}
