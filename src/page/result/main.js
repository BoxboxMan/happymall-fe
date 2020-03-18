/*
* @Author: MR.S
* @Date:   2019-12-21 14:55:24
* @Last Modified by:   MR.S
* @Last Modified time: 2019-12-21 16:26:11
*/
require('./main.css');
require('page/common/nav-simple/main.js');
var _mall = require('util/mall.js');

$(function(){
    var type = _mall.getUrlParam('type') || 'default';
    $('.' + type + '-success').show();
})