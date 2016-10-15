var FM_CONFIG                   = {

    fmURL : './res/mp3/fm-1.mp3'

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
    $public.loadMedia           = function (event) {
        var config              = this._config;
        var audio               = this.audio;
        if( !audio ){
            audio               = this.audio = document.createElement('audio');
        }
        audio.src               = config.fmURL;
        for( var key in event ){
            audio[key]          = event[key];
        }


    };
    $public.play                = function () {
        this.audio.play();
    };
    $public.getAllTime          = function () {
        return this.audio.duration;
    };
    window.$fmPlay              = new FMPlay( FM_CONFIG );

})(window, FM_CONFIG);

window.$View                    = {
    detailedInit: function () {
        $fmPlay.loadMedia({
            ontimeupdate: function ( e ) {
                $View.detailedSetPlan( e.path[0].currentTime );
            }
        });
        $fmPlay.play();
    },
    detailedSetPlan: function (time) {
        var allTime             = $fmPlay.getAllTime();
        var planLength          = time / allTime * 100;
        var planDom             = document.getElementById('detailed-plan-full');
        planDom.style.width     = planLength + "%";
        var playBtn             = document.getElementById('detailed-content-play');
        playBtn.innerHTML     = '&#xe62f;';
    }
};
document.addEventListener('DOMContentLoaded', $View.detailedInit, false);