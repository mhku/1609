/**
 *
 * 登录
 * */

;(function( window ){

    var LoginBox            = function () {

        _private.init.apply(arguments);
    };

    var _private            = {};
    var $public             = window.prototype;
    
    _private.init           = function ( data ) {

        //创建HTML
        //创建头部
        var header          = _private.createElementByHeader.call( this );

        document.body.appendChild(header);
    };

    _private.createElementByHeader      = function () {

        var header                      = document.createElement('header');
        var btnPhone                    = document.createElement('button');
        var btnEmail                    = document.createElement('button');
        var btnClose                    = document.createElement('button');

        btnPhone.innerHTML              = '手机验证登录';
        btnEmail.innerHTML              = '帐号密码登录';
        btnClose.className              = 'login-close';
        btnPhone.className              = 'login-tab-btn login-btn-action';
        btnEmail.className              = 'login-tab-btn';
        header.className                = 'login-header';

        header.appendChild( btnPhone );
        header.appendChild( btnEmail );
        header.appendChild( btnClose );

        return header;

    }


    LoginBox();


})( window );