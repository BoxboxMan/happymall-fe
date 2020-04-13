/*
* @Author: MR.S
* @Date:   2020-04-08 01:39:01
* @Last Modified by:   MR.S
* @Last Modified time: 2020-04-09 05:26:35
*/
require('page/common/nav/main.js');
require('page/common/header/main.js');
require('./main.css');
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
        this.loadPaymentInfo();
    },
    loadPaymentInfo : function(){
        var _this = this;
        var paymentHtml = '';
        $('.page-wrap').html('<div class="loading"></div>');
        _order.pay(this.data.orderNumber, function(res,msg){
            paymentHtml = _mall.renderHtml(templateIndex, res);
            $('.page-wrap').html(paymentHtml);
            _this.orderStatusMonitor();
        }, function(err){
            $('.page-wrap').html('<p class="errTips">' + err + '</p>');
        });
    },
    orderStatusMonitor : function(){
        var _this = this;
        this.paymentTimer = window.setInterval(function(){
            _order.getStatus(_this.data.orderNumber, function(res,msg){
                if(res == true){
                    window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
                }
            }, function(err){

            })
        }, 3e3);
    }
};
$(function(){
    page.init();
}) 
