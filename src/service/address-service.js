/*
* @Author: MR.S
* @Date:   2020-04-03 02:45:42
* @Last Modified by:   MR.S
* @Last Modified time: 2020-04-05 21:19:23
*/
var _mall = require('util/mall.js');
var address = {
    getList : function(resolve,reject){
        _mall.request({
            method  : 'GET',
            url     : _mall.getServerUrl('/shipping/list'),
            success : resolve,
            error   : reject,
            data    : {
                pageSize : 10
            }
        });
    },
    getAddressDetail : function(addressId, resolve, reject){
        _mall.request({
            method  : 'GET',
            url     : _mall.getServerUrl('/shipping/select'),
            success : resolve,
            error   : reject,
            data    : {
                shippingId : addressId
            }
        });
    },
    save : function(receiverInfo, resolve, reject){
        _mall.request({
            method  : 'GET',
            url     : _mall.getServerUrl('/shipping/add'),
            success : resolve,
            error   : reject,
            data    : {
                receiverName       : receiverInfo.receiverName,
                receiverPhone      : receiverInfo.receiverPhone,
                receiverProvince   : receiverInfo.receiverProvince,
                receiverCity       : receiverInfo.receiverCity,
                receiverAddress    : receiverInfo.receiverAddress,
                receiverZip        : receiverInfo.receiverZip,
            }
        });
    },
    update : function(receiverInfo, resolve, reject){
        _mall.request({
            method  : 'GET',
            url     : _mall.getServerUrl('/shipping/update'),
            success : resolve,
            error   : reject,
            data    : {
                id                 : receiverInfo.id,
                receiverName       : receiverInfo.receiverName,
                receiverPhone      : receiverInfo.receiverPhone,
                receiverProvince   : receiverInfo.receiverProvince,
                receiverCity       : receiverInfo.receiverCity,
                receiverAddress    : receiverInfo.receiverAddress,
                receiverZip        : receiverInfo.receiverZip,
            }
        });
    },
    deleteAddress : function(addressId, resolve, reject){
        _mall.request({
            method  : 'GET',
            url     : _mall.getServerUrl('/shipping/del'),
            success : resolve,
            error   : reject,
            data    : {
                shippingId : addressId
            }
        });
    }
};
module.exports = address;