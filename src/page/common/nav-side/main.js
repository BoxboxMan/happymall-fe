/*
* @Author: MR.S
* @Date:   2019-12-20 20:28:41
* @Last Modified by:   MR.S
* @Last Modified time: 2020-03-19 03:20:25
*/
require('./main.css');
var _mall = require('util/mall.js');
var indexTemplate = require('./index.string');
var navSide = {
    option  : {
        name : '',
        navList : [
            {name: 'user-center', desc : '个人中心', href : './user-center.html'},
            {name: 'order-list', desc : '我的订单', href : './order-list.html'},
            {name: 'user-pass-update', desc : '修改密码', href : './user-pass-update.html'},
            {name: 'about', desc : '关于Mall', href : './about.html'}
        ] 
    },
    init : function(option){
      $.extend(this.option,option);
      this.renderNav();
    },
    renderNav : function(){//渲染导航菜单
        for(var i = 0,iLength = this.option.navList.length; i < iLength; i++){
            if(this.option.name === this.option.navList[i].name){
                this.option.navList[i].isActive = true;
            }
        };
        var navSideHtml = _mall.renderHtml(indexTemplate,{
            navList : this.option.navList
        });
        $('.nav-side').html(navSideHtml);
    }
};

module.exports = navSide;