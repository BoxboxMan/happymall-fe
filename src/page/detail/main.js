/*
* @Author: MR.S
* @Date:   2020-04-01 00:39:34
* @Last Modified by:   MR.S
* @Last Modified time: 2020-04-02 16:51:13
*/
require('page/common/nav/main.js');
require('page/common/header/main.js');
require('./main.css');
var _mall         = require('util/mall.js');
var _product      = require('service/product-service.js');
var templateIndex = require('./index.string');
var _cart         = require('service/cart-service.js');
var page = {
    data : {
        listParam : {
            productId       : _mall.getUrlParam('productId') || '',
        }
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        if(!this.data.listParam.productId){
            _mall.goHome();
        }
        this.loadDetail();
    },
    bindEvent : function(){
        var _this = this;
        // 图片预览
        $(document).on('mouseenter','.p-img-item', function(){
            var imgUrl = $(this).find('.sub-img').attr('src');
            $('.main-img').attr('src', imgUrl);
        });
        //购买数量按钮
        $(document).on('click', '.p-count-btn', function(){
            var type = $(this).hasClass('plus') ? 'plus' : 'minus';
            var $pCount = $('.p-count');
            var currentCount = parseInt($pCount.val());
            var minCount = 1;
            var maxCount = _this.data.detailInfo.stock || 1;
            if(type === 'plus'){
                $pCount.val(currentCount < maxCount ? currentCount+1 : maxCount);
            }else if(type === 'minus'){
                $pCount.val(currentCount <= minCount ? minCount : currentCount-1);
            }
        });
        //加入购物车
        $(document).on('click', '.cart-add', function(){
            _cart.add({
                productId   : _this.data.listParam.productId,
                count       : $('.p-count').val()
            }, function(res){
                window.location.href = './result.html?type=cart-add';
            }, function(err){
                _mall.errorTips(err);
            });
        });
    },
    loadDetail : function(){
        var _this = this;
        var html = '';
        $('page-wrap').html('<div class="loading"></div>');
        _product.getDetail(_this.data.listParam.productId, function(res){
            _this.data.detailInfo = res;
            html = _mall.renderHtml(templateIndex, res);
            $('.page-wrap').html(html);
        }, function(err){
            $('.page-wrap').html('<p class="errTips">此商品已下架</p>');
        })
    }
};
$(function(){
    page.init();
})