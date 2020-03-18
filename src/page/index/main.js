/*
* @Author: MR.S
* @Date:   2019-11-13 19:13:06
* @Last Modified by:   MR.S
* @Last Modified time: 2019-12-20 22:33:35
*/
require('./main.css');
require('page/common/nav/main.js');
var _navSide = require('page/common/nav-side/main.js');
var mall = require('util/mall.js');
require('page/common/header/main.js');

_navSide.init({
    name : 'about'
});
