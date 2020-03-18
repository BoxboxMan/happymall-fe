/*
* @Author: MR.S
* @Date:   2020-03-19 03:18:03
* @Last Modified by:   MR.S
* @Last Modified time: 2020-03-19 03:45:53
*/
require('page/common/nav/main.js');
require('page/common/header/main.js');
require('./main.css');
var _navSide      = require('page/common/nav-side/main.js');
var _mall         = require('util/mall.js');
var _user         = require('service/user-service.js');

var userCenter = {
    init : function(){
        this.onLoad();
    },
    onLoad : function(){
        _navSide.init({
            name : 'user-pass-update'
        });
    },
    bindEvent : function(){
        $(document).on('click','.btn-submit',function(){
            var userInfo = {
                passwordOld     : $.trim($('#password').val()),
                passwordNew     : $.trim($('#newPassword').val()),
                passwordConfirm : $.trim($('#passwordConfirm').val()),
            };
            var validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                _user.updatePassword(userInfo, function(res,msg){
                    _mall.successTips(msg);
                },
                function(errMsg){
                    _mall.errorTips(errMsg);
                });
            }else{
                _mall.errorTips(validateResult.msg);
            }
        })
    },
    validateForm : function(userInfo){
        var result = {
            status  : false,
            msg     : ''
        };
        if(!_mall.validate(userInfo.passwordOld,'require')){
            result.msg = '请输入原密码';
            return result;
        }
        if(!userInfo.passwordNew || userInfo.passwordNew.length < 6){
            result.msg = '密码长度必须不少于六位';
            return result;
        }
        if(userInfo.passwordNew != userInfo.passwordConfirm){
            result.msg = '两次密码不一致';
            return result;
        }
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};
$(function(){
    userCenter.init();
})