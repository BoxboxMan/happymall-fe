/*
* @Author: MR.S
* @Date:   2019-12-02 08:30:28
* @Last Modified by:   MR.S
* @Last Modified time: 2020-04-03 01:14:00
*/
require('./main.css');
var _mall = require('util/mall.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
var nav = {
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent : function(){
        //登录点击事件
        $('.js-login').click(function(){
            _mall.doLogin();
        });
        //注册点击事件
        $('.js-register').click(function(){
            window.location.href = './user-register.html';
        });
        //退出点击事件
        $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload();
            },function(err){
                _mall.errorTips(err);
            });
        })
    },
    loadUserInfo : function(){
        _user.checkLogin(function(res){
            $('.user.not-login').hide().siblings('.user.login').show()
            .find('.username').text(res.username);
        },function(err){
            //什么都不做
        });
    },
    loadCartCount : function(){
        _cart.getCartCount(function(res){
            $('.cart-count').text(res || 0);
        },function(err){
            $('.cart-count').text(0);
        })
    }
};

module.exports = nav.init();