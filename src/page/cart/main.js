/*
* @Author: MR.S
* @Date:   2020-04-02 20:19:52
* @Last Modified by:   MR.S
* @Last Modified time: 2020-04-05 17:20:08
*/
var _nav = require('page/common/nav/main.js');
require('page/common/header/main.js');
require('./main.css');
var _mall         = require('util/mall.js');
var templateIndex = require('./index.string');
var _cart         = require('service/cart-service.js');
var page = {
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadCart();
    },
    bindEvent : function(){
        var _this = this;
        //单选商品
        $(document).on('click', '.cart-select', function(){
            var $this = $(this);
            var productId = $this.parents('.cart-table').data('product-id');
            //选中
            if($this.is(':checked')){
                _cart.selectProduct(productId, function(res){
                    var html = _mall.renderHtml(templateIndex, res);
                    $('.page-wrap').html(html);
                }, function(err){
                    $('.page-wrap').html('<p class="errTips">' + err.msg + '</p>');
                });
            }else{//取消选中
                _cart.unSelectProduct(productId, function(res){
                    var html = _mall.renderHtml(templateIndex, res);
                    $('.page-wrap').html(html);
                }, function(err){
                    $('.page-wrap').html('<p class="errTips">' + err.msg + '</p>');
                });
            }
        });
        //全选商品
        $(document).on('click', '.cart-select-all', function(){
            var $this = $(this);
            //选中
            if($this.is(':checked')){
                _cart.selectAll(function(res){
                    var html = _mall.renderHtml(templateIndex, res);
                    $('.page-wrap').html(html);
                }, function(err){
                    $('.page-wrap').html('<p class="errTips">' + err.msg + '</p>');
                });
            }else{//取消选中
                _cart.unSelectAll(function(res){
                    var html = _mall.renderHtml(templateIndex, res);
                    $('.page-wrap').html(html);
                }, function(err){
                    $('.page-wrap').html('<p class="errTips">' + err.msg + '</p>');
                });
            }
        });
        //商品选购数量
        $(document).on('click', '.count-btn', function(){
            var $this       = $(this);
            var $pCount     = $this.siblings('.count-input');
            var type        = $this.hasClass('plus') ? 'plus' : 'minus';
            var productId   = $this.parents('.cart-table').data('product-id');
            var currentCount= parseInt($pCount.val());
            var minCount    = 1;
            var maxCount    = parseInt($pCount.data('max'));
            var newCount    = 0;
            if(type === 'plus'){
                if(currentCount >= maxCount){
                    _mall.errorTips('该商品库存不足');
                    return;
                }
                newCount = currentCount + 1;
            }else if (type === 'minus') {
                if(currentCount <= minCount){
                    return;
                }
                newCount = currentCount - 1;
            }
            _cart.update({
                productId : productId,
                count     : newCount
            }, function(res){
                var html = _mall.renderHtml(templateIndex, res);
                $('.page-wrap').html(html);
                _nav.loadCartCount();
            }, function(err){
                _mall.errorTips(err);
            });
        });
        //删除单个商品
        $(document).on('click', '.cart-delete', function(){
            if(window.confirm('确定要删除该商品吗？')){
                var productIds = $(this).parents('.cart-table').data('product-id');
                _cart.deleteProduct(productIds, function(res){
                    var html = _mall.renderHtml(templateIndex, res);
                    $('.page-wrap').html(html);
                    _nav.loadCartCount();
                }, function(err){
                    _mall.errorTips(err);
                })
            }else{
                return;
            }
        });
        //删除多个商品
        $(document).on('click', '.delete-selected', function(){
            if(window.confirm('确定要删除选中的所有商品吗？')){
                var arrayProductIds = [];
                //循环压入所有checked的productId值
                var $selectedItem = $('.cart-select:checked');
                for(var i=0, length=$selectedItem.length; i<length; i++){
                    arrayProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
                }
                if(arrayProductIds.length > 0){
                    _cart.deleteProduct(arrayProductIds.join(','), function(res){
                        var html = _mall.renderHtml(templateIndex, res);
                        $('.page-wrap').html(html);
                        _nav.loadCartCount();
                    }, function(err){
                        _mall.errorTips(err);
                    })
                }else{
                    _mall.errorTips('请选中要删除的商品');
                }
            }else{
                return;
            }
        });
        //结算购物车
        $(document).on('click', '.btn-submit', function(){
            var totalPrice = $(this).siblings('.price-total').data('total');
            if(totalPrice > 0){
                window.location.href = "./order-confirm.html";
            }else{
                _mall.errorTips('请选择商品后在进行结算');
            }
        });
    },
    loadCart : function(){
        var _this = this;
        var html = '';
        _cart.getList(function(res){
            html = _mall.renderHtml(templateIndex, res);
            $('.page-wrap').html(html);
        }, function(err){
            $('.page-wrap').html('<p class="errTips">' + err + '</p>');
        });
    }
    
};
$(function(){
    page.init();
})