/*
* @Author: MR.S
* @Date:   2020-04-03 11:38:09
* @Last Modified by:   MR.S
* @Last Modified time: 2020-04-05 21:06:42
*/
require('page/common/nav/main.js');
require('page/common/header/main.js');
require('./main.css');
var _mall                = require('util/mall.js');
var templateIndex        = require('./address-modal.string');
var _address             = require('service/address-service.js');
var _cityInfo            = require('util/city/main.js');
var page = {
    data : {
        listParam : {

        }
    },
    show : function(option){
        this.option = option;
        this.loadModal();
        this.bindEvent();
    },
    hide : function(){
        $('.modal-wrap').empty();
    },
    bindEvent : function(){
        var _this = this;
        //省市二级联动
        $('#receiverProvince').change(function(){
            var selectedProvince = $(this).val();
            _this.loadCities(selectedProvince);
        });
        //保存收获地址
        $('.address-btn').click(function(){
            var receiverInfo = _this.getReceiverInfo();
            var isUpdate     = _this.option.isUpdate;
            //新增地址
            if(!isUpdate && receiverInfo.status){
                _address.save(receiverInfo.data, function(res,msg){
                    _mall.successTips(msg);
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                }, function(err){

                });
            }else if(isUpdate && receiverInfo.status){//更新地址
                _address.update(receiverInfo.data, function(res,msg){
                    _mall.successTips(msg);
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                }, function(err){
                    _mall.errorTips(err);
                });
            }else{
                _mall.errorTips(receiverInfo.msg || '哪里出错了哦!');
            }
        });
        //关闭弹窗
        $('.close').click(function(){
            _this.hide();
        });
        //点击modal内容区域的时候不关闭弹窗
        $('.modal-content').click(function(e){
            e.stopPropagation();
        });
    },
    loadModal : function(){
        var addressModalHtml = _mall.renderHtml(templateIndex, {
            isUpdate : this.option.isUpdate,
            data     : this.option.data
        });
        $('.modal-wrap').html(addressModalHtml);
        this.loadProvince();
    },
    loadProvince : function(){
        var provinces = _cityInfo.getProvinces();
        $('#receiverProvince').html(this.getSelectOptions(provinces));
        if(this.option.isUpdate && this.option.data.receiverProvince){
            $('#receiverProvince').val(this.option.data.receiverProvince);
            this.loadCities(this.option.data.receiverProvince);
        }
    },
    loadCities : function(province){
        var cities = _cityInfo.getCities(province);
        $('#receiverCity').html(this.getSelectOptions(cities));
        if(this.option.isUpdate && this.option.data.receiverCity){
          $('#receiverCity').val(this.option.data.receiverCity);
        }
    },
    getSelectOptions : function(optionArray){
        var html = '<option value="">---请选择---</option>';
        for(var i=0, length=optionArray.length; i<length; i++){
            html += '<option value="'+ optionArray[i] +'">'+ optionArray[i] +'</option>';
        }
        return html;
    },
    // 获取新增地址中表单信息并作验证
    getReceiverInfo : function(){
        var receiverInfo = {};
        var result  = {
            status  : false,
            msg     : '',
            data    : null
        };
        receiverInfo.receiverName       = $.trim($('#receiverName').val());
        receiverInfo.receiverPhone      = $.trim($('#receiverPhone').val());
        receiverInfo.receiverProvince   = $.trim($('#receiverProvince').val());
        receiverInfo.receiverCity       = $.trim($('#receiverCity').val());
        receiverInfo.receiverAddress    = $.trim($('#receiverAddress').val());
        receiverInfo.receiverZip        = $.trim($('#receiverZip').val());
        if(this.option.isUpdate){
            receiverInfo.id                 = $.trim($('.modal-content').data('id'));
        }
        if(!_mall.validate(receiverInfo.receiverName,'require')){
            result.msg = '收货人姓名不能为空';
            return result;
        }
        if(!_mall.validate(receiverInfo.receiverProvince,'require')){
            result.msg = '请选择所在省份';
            return result;
        }
        if(!_mall.validate(receiverInfo.receiverCity ,'require')){
            result.msg = '请选择所在城市';
            return result;
        }
        if(!_mall.validate(receiverInfo.receiverAddress,'require')){
            result.msg = '请输入详细地址';
            return result;
        }
        if(!_mall.validate(receiverInfo.receiverPhone,'phone')){
            result.msg = '请输入正确的手机号码';
            return result;
        }
        result.data   = receiverInfo;
        result.status = true;
        if(result.status){
            return result;
        }
    }
};
module.exports = page;