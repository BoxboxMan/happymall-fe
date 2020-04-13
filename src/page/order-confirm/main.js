/*
* @Author: MR.S
* @Date:   2020-04-03 01:38:04
* @Last Modified by:   MR.S
* @Last Modified time: 2020-04-08 03:56:16
*/
require('page/common/nav/main.js');
require('page/common/header/main.js');
require('./main.css');
var _mall                = require('util/mall.js');
var templateProductIndex = require('./product-list.string');
var templateAddressIndex = require('./address-list.string');
var _order               = require('service/order-service.js');
var _address             = require('service/address-service.js');
var _modal               = require('./address-modal.js');

var page = {
    data : {
        selectedAddressId : null
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadAddressList();
        this.loadProdcutList();
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click', '.address-item', function(){
            $(this).addClass('active').siblings('.address-item').removeClass('active');
            _this.data.selectedAddressId = $(this).data('id');
        });
        //订单提交
        $(document).on('click', '.order-create', function(){
            var shippingId = _this.data.selectedAddressId;
            if(shippingId){
                _order.create(shippingId, function(res){
                    window.location.href = './payment.html?orderNumber='+ res.orderNo;
                }, function(err){
                    _mall.errorTips(err);
                });
            }else{
                _mall.errorTips('请选择收货地址');
            }
        });
        // 收货地址添加
        $(document).on('click', '.address-add', function(){
            _modal.show({
                isUpdate  : false,
                onSuccess : function(){
                    _this.loadAddressList();
                }
            });
        });
        // 收货地址编辑
        $(document).on('click', '.address-update', function(e){
            e.stopPropagation();
            var addressId = $(this).parents('.address-item').data('id');
            _address.getAddressDetail(addressId, function(res){
                _modal.show({
                    isUpdate  : true,
                    onSuccess : function(){
                        _this.loadAddressList();
                    },
                    data      : res
                });
            }, function(err){
                _mall.errorTips(err);
            })
        });
        // 收货地址删除
        $(document).on('click', '.address-delete', function(e){
            e.stopPropagation();
            var addressId = $(this).parents('.address-item').data('id');
            if(window.confirm('您确定删除改地址吗？')){
                _address.deleteAddress(addressId ,function(res, msg){
                    _this.loadAddressList();
                },function(err){
                    _mall.errorTips(err);
                })
            }
            return;
        });
    },
    loadAddressList : function(){
        var _this = this;
        $('.address-content').html('<div class="loading"></div>');
        _address.getList(function(res){
            _this.addressFilter(res);
            var addressHtml = _mall.renderHtml(templateAddressIndex, res);
            $('.address-content').html(addressHtml);
        }, function(err){
            $('.address-content').html('<p class="errTips">' + err.msg + '</p>');
        });
    },
    addressFilter : function(data){
        if(this.data.selectedAddressId){
            var isSelectedUseful = false;
            for(var i=0, length=data.list.length; i<length; i++){
                if(data.list[i].id === this.data.selectedAddressId){
                    data.list[i].isActive = true;
                    isSelectedUseful = true;
                }
            }
            if(!isSelectedUseful){
                this.data.selectedAddressId = null;
            }
        }    
    },
    loadProdcutList : function(){
        var _this = this;
        $('.product-content').html('<div class="loading"></div>');
        _order.getOrderCartProduct(function(res){
            var productHtml = _mall.renderHtml(templateProductIndex, res);
            $('.product-content').html(productHtml);
        }, function(err){
            $('.product-content').html('<p class="errTips">' + err.msg + '</p>');
        });
    },
    
};
$(function(){
    page.init();
})