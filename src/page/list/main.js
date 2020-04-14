/*
* @Author: MR.S
* @Date:   2020-03-20 07:53:59
* @Last Modified by:   MR.S
* @Last Modified time: 2020-04-15 03:25:10
*/
require('page/common/nav/main.js');
require('page/common/header/main.js');
require('./main.css');
var Pagination    = require('util/pagination/main.js');
var _mall         = require('util/mall.js');
var _product      = require('service/product-service.js');
var templateIndex = require('./index.string');

var page = {
    data : {
        listParam : {
            keyword         : _mall.getUrlParam('keyword') || '',
            categoryId      : _mall.getUrlParam('categoryId') || '',
            orderBy         : _mall.getUrlParam('orderBy') || 'default',
            pageNum         : _mall.getUrlParam('pageNum') || 1,
            pageSize        : _mall.getUrlParam('pageSize') || 5,
        }
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadList();
    },
    bindEvent : function(){
        var _this = this;
        //排序点击
        $('.sort-item').click(function(){
            var $this = $(this);
            if($this.data('type') === 'default'){
                if($this.hasClass('active')){
                    return;
                }else{
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';  
                }
            }else if($this.data('type') === 'price'){
                if(!$this.hasClass('active')){
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');    
                }
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }else{3 
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            _this.loadList();
        })
    },
    loadList : function(){
        var _this         = this;
        var listHtml      = '';
        var listParam     = this.data.listParam;
        var $pListContent = $('.p-list-content');
        $pListContent.html('<div class="loading"></div>');
        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
        _product.getList(listParam, function(res){
            listHtml = _mall.renderHtml(templateIndex,{
                list : res.list
            });
            $pListContent.html(listHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages,
                hasNextPage     : res.hasNextPage,
            });
        }, function(err){
            _mall.errorTips(err);
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
                _this.loadList();
            }
        }));
    }
};
$(function(){
    page.init();
})