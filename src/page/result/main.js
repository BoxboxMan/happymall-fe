/*
* @Author: MR.S
* @Date:   2019-12-21 14:55:24
* @Last Modified by:   MR.S
* @Last Modified time: 2020-04-08 03:28:37
*/
require('./main.css');
require('page/common/nav-simple/main.js');
var _mall = require('util/mall.js');

$(function(){
    var type = _mall.getUrlParam('type') || 'default';
    $('.' + type + '-success').show();
    if(type === 'payment'){
        var orderNumber = _mall.getUrlParam('orderNumber');
        var $orderNumber = $('.' + type + '-success').find('.orderNumber');
        $orderNumber.attr('href',$orderNumber.attr('href')+orderNumber);
    }
})