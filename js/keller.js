var FM_CONFIG                   = {

    fmURL : './src/mp3/fm-1.mp3'

    };
(function ( window, FM_CONFIG ) {

    var FMPlay                  = function () {

        _private.init.apply( this, arguments );
    }
    var _private                = {};
    var $public                 = FMPlay.prototype;
    _private.init               = function ( data ) {
        this._config            = data;
    };
    $public.loadMedia           = function () {
        var config              = this._config;
        var audio               = this.audio;
        if( !audio ){
            audio               = this.audio = document.createElement('audio');
        }
        audio.src               = config.fmURL;


    };
    window.$fmPlay              = FMPlay( FM_CONFIG );
})(window, FM_CONFIG);

document.addEventListener('DOMContentLoaded', function (e) {

    $fmPlay.loadMedia();
}, false);