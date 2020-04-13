/*
* @Author: MR.S
* @Date:   2019-12-22 20:00:37
* @Last Modified by:   MR.S
* @Last Modified time: 2020-03-20 05:20:35
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
};


var page = {
    data : {
        username    : '',
        question    : '',
        answer      : '',
        token       : '',
    },
    init : function(){
        this.bindEvent();
        this.onLoad();
    },
    onLoad : function(){
        this.loadStepUsername();
    },
    bindEvent : function(){
        var _this = this;
        //获取密保问题的按钮点击
        $('#submit-username').click(function(){
            var username = $.trim($('#username').val());
            if(username){
                _user.getQuestion({
                    username : username
                }, function(res){
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepAnswer();
                }, function(errMsg){
                    formError.show(errMsg);
                })
            }else{
                formError.show('请输入用户名');
            }
        });
        //提交密保答案的点击
        $('#submit-answer').click(function(){
            var answer= $.trim($('#answer').val());
            if(answer){
                _user.checkAnswer({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer   : answer,
                }, function(res){
                    _this.data.token  = res;
                    _this.data.answer = answer;
                    _this.loadStepNewpassword();
                }, function(errMsg){
                    formError.show(errMsg);
                })
            }else{
                formError.show('请输入密保答案');
            }
        });
        //提交新密码进行验证
        $('#submit-newPassword').click(function(){
            var newPassword= $.trim($('#newPassword').val());
            if(newPassword && newPassword.length >= 6){
                _user.resetPassword({
                    username        : _this.data.username,
                    newPassword     : newPassword,
                    forgetToken      : _this.data.token,
                }, function(res){
                    window.location.href = './result.html?type=password-reset';
                }, function(errMsg){
                    formError.show(errMsg);
                })
            }else{
                formError.show('请输入不少于6位的新密码');
            }
        });
        
    },
    loadStepUsername : function(){
        $('#stepUsername').show();
    },
    loadStepAnswer : function(){
        formError.hide();
        $('#stepUsername').hide().siblings('#stepAnswer').show().find('.question').text(this.data.question);
    },
    loadStepNewpassword : function(){
        formError.hide();
        $('#stepAnswer').hide().siblings('#stepNewpassword').show();
    },
    submit : function(){
        var formData = {
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val())
        }
        var validateResult = this.formValidate(formData);
        if(validateResult.status){
            _user.login(formData,function(res){
                window.location.href = _mall.getUrlParam('redirect') || './index.html';//跳回登录前的页面
            },function(err){
                formError.show(err.msg);
            })
        }else{
            formError.show(validateResult.msg);
        }
    },
    formValidate : function(formData){
        var result = {
            status  : false,
            msg     : ''
        }
        if(!_mall.validate(formData.username,'require')){
            result.msg = '用户名不能为空';
            return result;
        };
        if(!_mall.validate(formData.password,'require')){
            result.msg = '密码不能为空';
            return result;
        };
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};
$(function(){
    page.init();
})