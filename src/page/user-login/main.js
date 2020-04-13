/*
* @Author: MR.S
* @Date:   2019-11-16 16:36:28
* @Last Modified by:   MR.S
* @Last Modified time: 2020-03-20 01:29:20
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
        $('.btn.btn-submit').click(function(){
            _this.submit();
        });
        $('#username').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit();
            }
        });
        $('#password').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit();
            }
        });
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