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

        var navBox              = document.getElementById('detailed-nav-list');
        navBox.addEventListener('click', function ( e ) {
            $View.detailedNavTab.apply( e.target, arguments );
        }, false);

        document.body.addEventListener('click', function (e) {
            $View.detailedNavClose();
        }, false);
        document.getElementById('detailed-nav-box').addEventListener('click', function (e) {
            e.stopPropagation();
            e.defaultPrevented();
        }, false);
    },
    detailedSetPlan: function (time) {
        var allTime             = $fmPlay.getAllTime();
        var planLength          = time / allTime * 100;
        var planDom             = document.getElementById('detailed-plan-full');
        planDom.style.width     = planLength + "%";

        var playBtn             = document.getElementById('detailed-content-play');
        playBtn.innerHTML       = '&#xe62f;';

        var residueTime         = allTime - time;
        var min                 = residueTime / 60;
        var sec                 = residueTime % 60;
        var planTime            = document.getElementById('detailed-plan-time');
        planTime.innerHTML      = min.toFixed(0) + ':' + sec.toFixed(0);

    },
    detailedNavOpen: function () {
        var navBox              = document.getElementById('detailed-nav-box');
        navBox.style.right      = 0;
    },
    detailedNavClose: function () {
        var navBox              = document.getElementById('detailed-nav-box');
        navBox.style.right      = '-3.5rem';
    },
    detailedNavTab: function (e) {

        var navId               = this.getAttribute('data-id');
        var currentAction       = this.parentElement.querySelector('.detailed-nav-action');
        var showTab             = document.querySelector('[data-tab-id=' + navId + ']');
        var currentTabAction    = showTab && showTab.parentElement.querySelector('.detailed-tab-action');

        this.classList.add('detailed-nav-action');
        currentAction       && currentAction.classList.remove('detailed-nav-action');
        currentTabAction    && currentTabAction.classList.remove('detailed-tab-action');
        showTab             && showTab.classList.add('detailed-tab-action');

        $View.detailedNavOpen();


    }
};
document.addEventListener('DOMContentLoaded', $View.detailedInit, false);
