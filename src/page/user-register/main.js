/*
* @Author: MR.S
* @Date:   2019-12-22 18:47:40
* @Last Modified by:   MR.S
* @Last Modified time: 2020-03-20 01:10:44
*/
require('./main.css');
require('page/common/nav-simple/main.js');
var _mall = require('util/mall.js');
var _user = require('service/user-service.js');

var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
}


var page = {
    init : function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        $('#username').blur(function(){
            var username = $.trim($('#username').val());
            if(!username){
                return;
            }
            var formData ={
                str  : username,
                type : 'username'
            }
            _user.checkUsername(formData,function(res){
                formError.hide();
            },function(err){
                formError.show(err);
            });
        });
        $('.btn.btn-submit').click(function(){
            _this.submit();
        });
    },
    submit : function(){
        var formData = {
            username        : $.trim($('#username').val()),
            password        : $.trim($('#password').val()),
            passwordConfirm : $.trim($('#passwordConfirm').val()),
            phone           : $.trim($('#phone').val()),
            email           : $.trim($('#email').val()),
            question        : $.trim($('#question').val()),
            answer          : $.trim($('#answer').val())
        }
        var validateResult = this.formValidate(formData);
        if(validateResult.status){
            _user.register(formData,function(res){
                window.location.href = './result.html?type=register';//跳回登录前的页面
            },function(err){
                formError.show(err);
            })
        }else{
            formError.show(validateResult.msg);
        }
    },
    formValidate : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        if(!_mall.validate(formData.username,'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_mall.validate(formData.password,'require')){
            result.msg = '密码不能为空';
            return result;
        }
        if(formData.password.length < 6){
            result.msg = '密码长度不能小于6位';
            return result;
        }
        if(formData.password !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致';
            return result;
        }
        if(!_mall.validate(formData.phone,'phone')){
            result.msg = '手机号码格式不正确';
            return result;
        }
        if(!_mall.validate(formData.email,'email')){
            result.msg = '邮箱地址格式不正确';
            return result;
        }
        if(!_mall.validate(formData.question,'require')){
            result.msg = '密保问题不能为空';
            return result;
        }
        if(!_mall.validate(formData.answer,'require')){
            result.msg = '密保答案不能为空';
            return result;
        }
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};
$(function(){
    page.init();
})
