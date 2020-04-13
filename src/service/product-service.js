/*
* @Author: MR.S
* @Date:   2019-12-04 21:06:41
* @Last Modified by:   MR.S
* @Last Modified time: 2020-04-01 16:21:20
*/
var _mall = require('util/mall.js');
var product = {
    getList : function(listParam,resolve,reject){
        _mall.request({
            method  : 'GET',
            url     : _mall.getServerUrl('/product/list'),
            success : resolve,
            error   : reject,
            data    : {
                keyword         : listParam.keyword,
                categoryId      : listParam.categoryId,
                orderBy         : listParam.orderBy,
                pageNum         : listParam.pageNum,
                pageSize        : listParam.pageSize,
            }
        });
    },
    getDetail : function(productId,resolve,reject){
        _mall.request({
            method  : 'GET',
            url     : _mall.getServerUrl('/product/detail'),
            success : resolve,
            error   : reject,
            data    : {
                productId : productId
            }
        });
    }
};
module.exports = product;