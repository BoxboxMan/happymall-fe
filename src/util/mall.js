/*
* @Author: MR.S
* @Date:   2019-11-25 08:57:17
* @Last Modified by:   MR.S
* @Last Modified time: 2020-06-16 23:02:46
*/
var Hogan = require('hogan.js');
var conf = {
    serverHost : 'http://www.wannarich.com'
    //serverHost : 'http://nginx.wannarich.com'
    // serverHost : 'http://localhost:8080'
};
var mall = {
    //网络请求
    request : function(param){
        var _this = this;
        $.ajax({
            type        : param.method  || 'get',
            dataType    : param.type    || 'json',
            url         : param.url     || '',
            data        : param.data    || '',
            xhrFields   : {
                withCredentials : true
            },
            success     : function(res){
                if(10001 === res.status){      //成功的返回
                    typeof param.success === 'function' && param.success(res.data,res.msg);
                }else if(20006 === res.status){// 用户未登录
                    _this.doLogin();
                }else{                       //错误的返回
                    typeof param.error === 'function' && param.error(res.msg);
                }   
            },
            error       : function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }

        })
    },
    //用户登陆
    doLogin : function(){
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //获取服务器接口地址
    getServerUrl : function(path){
        return conf.serverHost + path; 
    },
    //根据name获取接口中对应参数的值
    getUrlParam : function(name){
        var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result  = window.location.search.substr(1).match(reg);
        return result == null ? null : decodeURIComponent(result[2]);
    },
    //渲染html页面
    renderHtml : function(htmlTemplate, data){
        var template    = Hogan.compile(htmlTemplate);
        var result      = template.render(data);
        return result;
    },
    //成功的提示
    successTips : function(msg){
        alert(msg || '操作成功！');
    },
    //错误的提示
    errorTips : function(msg){
        alert(msg || '操作失败！');
    },
    //value : 待验证值，type : 验证类型（如手机、邮箱等）
    validate : function(value,type){
        var value = $.trim(value);
        if('require' === type){
            return !!value;
        }else if('phone' === type){
            return /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(value);
        }else if('email' === type){
            return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
        } 
    },
    //定向到主页面
    goHome : function(){
        window.location.href = './index.html';
    }
}

module.exports = mall;
