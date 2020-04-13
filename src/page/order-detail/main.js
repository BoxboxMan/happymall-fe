/*
* @Author: MR.S
* @Date:   2020-04-06 16:56:20
* @Last Modified by:   MR.S
* @Last Modified time: 2020-04-08 01:30:12
*/
require('page/common/nav/main.js');
require('page/common/header/main.js');
require('./main.css');
var _navSide      = require('page/common/nav-side/main.js');
var _mall         = require('util/mall.js');
var _order        = require('service/order-service.js');
var templateIndex = require('./index.string');

var page = {
    data : {
        orderNumber : _mall.getUrlParam('orderNumber')
    },
    init : function(){
        this.onLoad();
    },
    onLoad : function(){
        _navSide.init({
            name : 'order-list'
        });
        this.loadOrderDetail();
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click', '.cancle-order', function(){
            var orderNumber = _mall.getUrlParam('orderNumber');
            if(window.confirm('您确定要取消该订单吗？')){
                _order.cancle(orderNumber, function(res,msg){
                    _mall.successTips(msg);
                    _this.loadOrderDetail();
                }, function(err){
                    _mall.errorTips(err);
                })
            }
            return;
        });
    },
    loadOrderDetail : function(){
        $('.content').html('<div class="loading"></div>');
        var _this = this;
        var orderDetailHtml = '';
        _order.getDetail(this.data.orderNumber, function(res,msg){
            _this.doFilter(res);
            orderDetailHtml = _mall.renderHtml(templateIndex, res);
            $('.content').html(orderDetailHtml);
        }, function(err){
            $('.order-list-content').html('<p class="errTips">'+ err +'</p>');
        });
    },
    doFilter : function(data){
        data.needPay     = data.status == 10;
        data.cancleAble  = data.status == 10;
    }
};
$(function(){
    page.init();
}) 
