/*
* @Author: MR.S
* @Date:   2020-03-19 00:42:40
* @Last Modified by:   MR.S
* @Last Modified time: 2020-03-19 03:16:43
*/
require('page/common/nav/main.js');
require('page/common/header/main.js');
require('./main.css');
var _navSide      = require('page/common/nav-side/main.js');
var _mall         = require('util/mall.js');
var _user         = require('service/user-service.js');
var templateIndex = require('./index.string');

var userCenter = {
    init : function(){
        this.onLoad();
    },
    onLoad : function(){
        _navSide.init({
            name : 'user-center'
        });
        this.loadUserInfo();
    },
    bindEvent : function(){
        $(document).on('click','.btn-submit',function(){
            var userInfo = {
                phone : $.trim($('#phone').val()),
                email : $.trim($('#email').val()),
                question : $.trim($('#question').val()),
                answer : $.trim($('#answer').val())
            };
            var validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                _user.updateUserInfo(userInfo, function(res,msg){
                    _mall.successTips(msg);
                    window.location.href = './user-center.html';
                },
                function(errMsg){
                    _mall.errorTips(errMsg);
                });
            }else{
                _mall.errorTips(validateResult.msg);
            }
        })
    },
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mall.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        },
        function(errMsg){
            _mall.errorTips(errMsg);
        });
    },
    validateForm : function(userInfo){
        var result = {
            status  : false,
            msg     : ''
        }
        if(!_mall.validate(userInfo.phone,'phone')){
            result.msg = '请输入正确的手机号码';
            return result;
        };
        if(!_mall.validate(userInfo.email,'email')){
            result.msg = '请输入正确的邮箱信息';
            return result;
        };
        if(!_mall.validate(userInfo.question,'require')){
            result.msg = '密保问题不能为空';
            return result;
        };
        if(!_mall.validate(userInfo.answer,'require')){
            result.msg = '密保答案不能为空';
            return result;
        };
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};
$(function(){
    userCenter.init();
})