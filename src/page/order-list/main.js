/*
* @Author: MR.S
* @Date:   2020-04-05 21:47:48
* @Last Modified by:   MR.S
* @Last Modified time: 2020-04-08 00:42:13
*/
require('page/common/nav/main.js');
require('page/common/header/main.js');
require('./main.css');
var _navSide      = require('page/common/nav-side/main.js');
var _mall         = require('util/mall.js');
var _order        = require('service/order-service.js');
var templateIndex = require('./index.string');
var Pagination    = require('util/pagination/main.js');


var page = {
    data : {
        listParam : {
            pageSize : 2,
            pageNum  : 1
        }
    },
    init : function(){
        this.onLoad();
    },
    onLoad : function(){
        _navSide.init({
            name : 'order-list'
        });
        this.loadOrderList();
    },
    loadOrderList : function(){
        $('.order-list-content').html('<div class="loading"></div>');
        var _this = this;
        var orderListHtml = '';
        _order.getList(this.data.listParam, function(res,msg){
            orderListHtml = _mall.renderHtml(templateIndex, res);
            $('.order-list-content').html(orderListHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages,
                hasNextPage     : res.hasNextPage,
            });
        }, function(err){
            $('.order-list-content').html('<p class="errTips">'+ err +'</p>');
        });
    },
    //加载分页信息
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }
};
$(function(){
    page.init();
}) 