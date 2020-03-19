/*
* @Author: MR.S
* @Date:   2020-03-19 00:33:17
* @Last Modified by:   MR.S
* @Last Modified time: 2020-03-20 06:16:13
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
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mall.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        },
        function(errMsg){
            _mall.errorTips(errMsg);
        });
    }
};
$(function(){
    userCenter.init();
})