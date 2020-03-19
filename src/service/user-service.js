/*
* @Author: MR.S
* @Date:   2019-12-02 09:13:59
* @Last Modified by:   MR.S
* @Last Modified time: 2020-03-20 06:11:08
*/
var _mall = require('util/mall.js');
var user = {
    login : function(userInfo,resolve,reject){
        _mall.request({
            method  : 'POST',
            url     : _mall.getServerUrl('/user/login'),
            success : resolve,
            error   : reject,
            data    : userInfo
        });
    },
    register : function(userInfo,resolve,reject){
        _mall.request({
            method  : 'POST',
            url     : _mall.getServerUrl('/user/register'),
            success : resolve, 
            error   : reject,
            data    : userInfo
        });
    },
    updateUserInfo : function(userInfo,resolve,reject){
        _mall.request({
            method  : 'POST',
            url     : _mall.getServerUrl('/user/update_information'),
            success : resolve, 
            error   : reject,
            data    : userInfo
        });
    },
    updatePassword : function(userInfo,resolve,reject){
        _mall.request({
            method  : 'POST',
            url     : _mall.getServerUrl('/user/reset_password'),
            success : resolve, 
            error   : reject,
            data    : userInfo
        });
    },
    logout : function(resolve,reject){
        _mall.request({
            method  : 'POST',
            url     : _mall.getServerUrl('/user/logout'),
            success : resolve,
            error   : reject
        });
    },
    checkLogin : function(resolve,reject){
        _mall.request({
            method  : 'GET',
            url     : _mall.getServerUrl('/user/get_user_info'),
            success : resolve,
            error   : reject
        });
    },
    getQuestion : function(username,resolve,reject){
        _mall.request({
            method  : 'POST',
            data    : username,
            url     : _mall.getServerUrl('/user/forget_get_question'),
            success : resolve,
            error   : reject 
        });
    },
    checkUsername : function(formData,resolve,reject){
        _mall.request({
            url     : _mall.getServerUrl('/user/check_valid'),
            method  : 'POST',
            data    : formData,
            success : resolve,
            error   : reject
        });
    },
    checkAnswer : function(userInfo,resolve,reject){
        _mall.request({
            url     : _mall.getServerUrl('/user/forget_check_answer'),
            method  : 'POST',
            data    : userInfo,
            success : resolve,
            error   : reject
        });
    },
    resetPassword : function(userInfo,resolve,reject){
        _mall.request({
            url     : _mall.getServerUrl('/user/forget_reset_password'),
            method  : 'POST',
            data    : userInfo,
            success : resolve,
            error   : reject
        });
    },
    getUserInfo : function(resolve,reject){
        _mall.request({
            url     : _mall.getServerUrl('/user/get_user_info'),
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },
};
module.exports = user;