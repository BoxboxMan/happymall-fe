/*
* @Author: MR.S
* @Date:   2020-04-03 01:42:10
* @Last Modified by:   MR.S
* @Last Modified time: 2020-04-08 03:17:06
*/
var _mall = require('util/mall.js');
var order = {
    getOrderCartProduct : function(resolve, reject){
        _mall.request({
            method  : 'GET',
            url     : _mall.getServerUrl('/order/get_order_cart_product'),
            success : resolve,
            error   : reject,
        });
    },
    create : function(shippingId, resolve, reject){
        _mall.request({
            method  : 'GET',
            url     : _mall.getServerUrl('/order/create'),
            success : resolve,
            error   : reject,
            data    : {
                shippingId : shippingId
            }
        });
    },
    getList : function(pageInfo, resolve, reject){
        _mall.request({
            method  : 'GET',
            url     : _mall.getServerUrl('/order/list'),
            success : resolve,
            error   : reject,
            data    : {
                pageSize : pageInfo.pageSize,
                pageNum  : pageInfo.pageNum
            }
        });
    },
    getDetail : function(orderNumber, resolve, reject){
        _mall.request({
            method  : 'GET',
            url     : _mall.getServerUrl('/order/detail'),
            success : resolve,
            error   : reject,
            data    : {
                orderNo : orderNumber
            }
        });
    },
    cancle : function(orderNumber, resolve, reject){
        _mall.request({
            method  : 'GET',
            url     : _mall.getServerUrl('/order/cancel'),
            success : resolve,
            error   : reject,
            data    : {
                orderNo : orderNumber
            }
        });
    },
    pay : function(orderNumber, resolve, reject){
        _mall.request({
            method  : 'GET',
            url     : _mall.getServerUrl('/order/pay'),
            success : resolve,
            error   : reject,
            data    : {
                orderNo : orderNumber
            }
        });
    },
    getStatus : function(orderNumber, resolve, reject){
        _mall.request({
            method  : 'GET',
            url     : _mall.getServerUrl('/order/query_order_pay_status'),
            success : resolve,
            error   : reject,
            data    : {
                orderNo : orderNumber
            }
        });
    },
};
module.exports = order;