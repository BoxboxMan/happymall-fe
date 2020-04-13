/*
* @Author: MR.S
* @Date:   2019-12-02 10:31:13
* @Last Modified by:   MR.S
* @Last Modified time: 2020-04-03 00:52:16
*/
var _mall = require('util/mall.js');
var cart = {
    getCartCount : function(resolve, reject){
        _mall.request({
            method  : 'GET',
            url     : _mall.getServerUrl('/cart/get_cart_product_count'),
            success : resolve,
            error   : reject,
        })
    },
    add : function(productInfo, resolve, reject){
        _mall.request({
            method  : 'GET',
            url     : _mall.getServerUrl('/cart/add'),
            success : resolve,
            error   : reject,
            data    : {
                productId   : productInfo.productId,
                count       : productInfo.count
            }
        })
    },
    getList : function(resolve, reject){
        _mall.request({
            method  : 'GET',
            url     : _mall.getServerUrl('/cart/list'),
            success : resolve,
            error   : reject,
        })
    },
    selectProduct : function(productId, resolve, reject){
        _mall.request({
            method    : 'GET',
            url       : _mall.getServerUrl('/cart/select'),
            success   : resolve,
            error     : reject,
            data      : {
                productId : productId
            }
        })
    },
    unSelectProduct : function(productId, resolve, reject){
        _mall.request({
            method    : 'GET',
            url       : _mall.getServerUrl('/cart/un_select'),
            success   : resolve,
            error     : reject,
            data      : {
                productId : productId
            }
        })
    },
    selectAll : function(resolve, reject){
        _mall.request({
            method    : 'GET',
            url       : _mall.getServerUrl('/cart/select_all'),
            success   : resolve,
            error     : reject,

        })
    },
    unSelectAll : function(resolve, reject){
        _mall.request({
            method    : 'GET',
            url       : _mall.getServerUrl('/cart/un_select_all'),
            success   : resolve,
            error     : reject,
        })
    },
    update : function(productInfo, resolve, reject){
        _mall.request({
            method    : 'GET',
            url       : _mall.getServerUrl('/cart/update'),
            success   : resolve,
            error     : reject,
            data      : {
                productId : productInfo.productId,
                count     : productInfo.count
            }
        })
    },
    deleteProduct : function(productIds, resolve, reject){
        _mall.request({
            method    : 'GET',
            url       : _mall.getServerUrl('/cart/delete_product'),
            success   : resolve,
            error     : reject,
            data      : {
                productIds : productIds
            }
        })
    },
    
};
module.exports = cart;