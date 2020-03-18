/*
* @Author: MR.S
* @Date:   2019-12-04 18:48:42
* @Last Modified by:   MR.S
* @Last Modified time: 2019-12-20 19:39:10
*/
require('./main.css');
var _mall = require('util/mall.js');
var head = {
    init : function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        $('#search-button').click(function(){//绑定搜索按钮功能
            _this.searchSubmit();
        });
        $('#search-input').keyup(function(e){
            if(e.keyCode === 13){//13是回车键的keycode
                _this.searchSubmit();
            }
        });
    },
    onLoad : function(){
        var keyword = _mall.getUrlParam('keyword');
        if(keyword){
            $('#search-input').val(keyword);
        };
    },
    searchSubmit : function(){
        var keyword = $.trim($('#search-input').val());
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }else{
            _mall.goHome();
        }
    }
};
head.init();
module.exports = head;