/*
* @Author: MR.S
* @Date:   2020-03-31 20:09:55
* @Last Modified by:   MR.S
* @Last Modified time: 2020-03-31 23:39:07
*/
require('./main.css');
var templatePagination  = require('./index.string');
var _mall               = require('util/mall.js');
var Pagination = function(){
    var _this = this;
    this.defaultOption = {
        container       : null,
        pageNum         : 1,
        pageRange       : 3,
        onSelectPage    : null
    };
    $(document).on('click', '.page-item', function(){
        var $this = $(this);
        if($this.hasClass('active') || $this.hasClass('disabled')){
            return;
        }
        typeof _this.option.onSelectPage === 'function'
            ? _this.option.onSelectPage($this.data('value')) : null;
    })

}
//渲染分页组件 ,这样写 Pagination new出来的对象是继承这些方法的
Pagination.prototype.render = function(userOption){
    //合并选项
    this.option = $.extend({}, this.defaultOption, userOption);
    //容器是否为合法的jquery对象
    if(!(this.option.container instanceof jQuery)){
        return;
    }
    //判断是否只有一页
    if(this.option.pages <= 1){
        return;
    }
    //渲染分页内容
    this.option.container.html(this.getPaginationHtml());

}

//获取分页的html
Pagination.prototype.getPaginationHtml = function(){
     var html = '';
     var pageArray =[];
     //起始页码
     var start = this.option.pageNum - this.option.pageRange > 0 
        ? this.option.pageNum - this.option.pageRange : 1;
    //结束页码
     var end = this.option.pageNum + this.option.pageRange > this.option.pages 
        ? this.option.pages : this.option.pageNum + this.option.pageRange;
     //上一页按钮
     pageArray.push({
        name : '上一页',
        value : this.option.prePage,
        disabled : !this.option.hasPreviousPage,
     });
     //放入页码
     for(var i = start; i <= end; i++){
        pageArray.push({
            name : i,
            value : i,
            actived : (i === this.option.pageNum)
        });
     }
     //下一页按钮
     pageArray.push({
        name : '下一页',
        value : this.option.nextPage,
        disabled : !this.option.hasNextPage,
     });
     html = _mall.renderHtml(templatePagination, {
        pageArray   : pageArray,
        pageNum     : this.option.pageNum,
        pages       : this.option.pages,
     });
     return html;
};

module.exports = Pagination;