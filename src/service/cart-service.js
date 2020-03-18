/*
* @Author: MR.S
* @Date:   2019-12-02 10:31:13
* @Last Modified by:   MR.S
* @Last Modified time: 2019-12-02 11:15:02
*/
var _mall = require('util/mall.js');
var cart = {
    getCartCount : function(resolve,reject){
        _mall.request({
            url     : _mall.getServerUrl('/cart/get_cart_product_count'),
            success : resolve,
            error   : reject
        })
    }
    
};
module.exports = cart;