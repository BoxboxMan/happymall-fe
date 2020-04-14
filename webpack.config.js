/*
* @Author: MR.S
* @Date:   2019-11-13 19:30:01
* @Last Modified by:   MR.S
* @Last Modified time: 2020-04-14 22:47:53
*/
var webpack             = require('webpack');
var Ex                  = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');
var getHtmlConfig       = function(name,title){
    return{
        template : './src/view/'+ name +'.html',
        filename : 'view/'+ name +'.html',
        inject   : true,
        favicon  : './favicon.ico',
        title    : title,
        hash     : true,
        chunks   : ['common',name]
    }
}
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

var config={
    entry:{
        "common"                    : './src/page/common/main.js',
        "index"                     : "./src/page/index/main.js",
        "list"                      : "./src/page/list/main.js",
        "detail"                    : "./src/page/detail/main.js",
        "cart"                      : "./src/page/cart/main.js",
        "order-confirm"             : "./src/page/order-confirm/main.js",
        "order-list"                : "./src/page/order-list/main.js",
        "order-detail"              : "./src/page/order-detail/main.js",
        "payment"                   : "./src/page/payment/main.js",
        "user-login"                : "./src/page/user-login/main.js",
        "result"                    : "./src/page/result/main.js",
        "user-register"             : "./src/page/user-register/main.js",
        "user-pass-reset"           : "./src/page/user-pass-reset/main.js",
        "user-pass-update"          : "./src/page/user-pass-update/main.js",
        "user-center"               : "./src/page/user-center/main.js",
        "user-center-update"        : "./src/page/user-center-update/main.js",
    },
    output:{
        path        :__dirname + '/dist/',
        publicPath  : 'dev' === WEBPACK_ENV ? '/dist/' : '//static.wannarich.com/happymall-fe/dist/',
        filename    :'/js/[name].js'
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
            },
            { 
                test:/\.string$/,
                loader:'html-loader',
                query: {
                    minimize : true,//压缩
                    removeAttributeQuotes : false //阻止压缩时自动去除双引号
                }
            }
        ]
    },
    resolve:{
        alias : {
            node_modules        : __dirname + '/node_modules',
            util                : __dirname + '/src/util',
            page                : __dirname + '/src/page',
            image               : __dirname + '/src/image',
            service             : __dirname + '/src/service',
        }
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : '/js/commons.js',
        }),
        new Ex("/css/[name].css"),
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list','商品列表')),
        new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情')),
        new HtmlWebpackPlugin(getHtmlConfig('cart','购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm','订单确认')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list','订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail','订单详情')),
        new HtmlWebpackPlugin(getHtmlConfig('payment','订单支付')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改信息')),
    ]
};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8090/');
}

module.exports = config;
