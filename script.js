var Remote = /** @class */ (function () {
    function Remote(tv) {
        var _this = this;
        this.collection = ['http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4'
        ];
        this.tv = tv;
        this.currentVideoIndex = -1;
        this.video = document.getElementById('tv');
        var remoteDiv = document.createElement('div');
        remoteDiv.classList.add('mt-3');
        remoteDiv.setAttribute('id', 'remoteFrame');
        var showNextBtn = document.createElement('button');
        showNextBtn.classList.add('btn', 'btn-warning');
        showNextBtn.innerHTML = 'Show Next';
        showNextBtn.onclick = function () {
            if (_this.currentVideoIndex === 2) {
                _this.currentVideoIndex = 0;
            }
            else {
                _this.currentVideoIndex++;
            }
            _this.video = null;
            var tv = document.getElementById('tv');
            tv.parentNode.removeChild(tv);
            var videoFrame = _this.tv.createVideo(_this.collection[_this.currentVideoIndex]);
            _this.video = document.getElementById('tv');
            document.getElementById('tvFrame').append(videoFrame);
        };
        var showPreviousBtn = document.createElement('button');
        showPreviousBtn.classList.add('btn', 'btn-danger', 'ml-2');
        showPreviousBtn.innerHTML = 'Show Previous';
        showPreviousBtn.onclick = function () {
            console.log(_this);
            console.log('Previous clicked');
            if (_this.currentVideoIndex === 0) {
                _this.currentVideoIndex = 2;
            }
            else {
                _this.currentVideoIndex--;
            }
            var tv = document.getElementById('tv');
            tv.parentNode.removeChild(tv);
            var video = _this.tv.createVideo(_this.collection[_this.currentVideoIndex]);
            _this.video = document.getElementById('tv');
            document.getElementById('tvFrame').append(video);
        };
        var playBtn = document.createElement('button');
        playBtn.classList.add('btn', 'btn-primary', 'ml-2');
        playBtn.innerHTML = 'Play';
        playBtn.onclick = function () {
            _this.playVideo(_this.video);
        };
        var pauseBtn = document.createElement('button');
        pauseBtn.classList.add('btn', 'btn-info', 'ml-2');
        pauseBtn.innerHTML = 'Pause';
        pauseBtn.onclick = function () {
            _this.pauseVideo(_this.video);
        };
        var stopBtn = document.createElement('button');
        stopBtn.classList.add('btn', 'ml-2');
        stopBtn.innerHTML = 'Stop';
        stopBtn.onclick = function () {
            _this.stopVideo(_this.video);
        };
        var muteUnMuteVolumeBtn = document.createElement('button');
        muteUnMuteVolumeBtn.classList.add('btn', 'ml-2');
        muteUnMuteVolumeBtn.innerHTML = 'mute/unmute';
        muteUnMuteVolumeBtn.onclick = function () {
            _this.muteUnMuteVolume(_this.video);
        };
        var increaseVolumeBtn = document.createElement('button');
        increaseVolumeBtn.classList.add('btn', 'ml-2');
        increaseVolumeBtn.innerHTML = 'Increase';
        increaseVolumeBtn.onclick = function () {
            _this.increaseVolume(_this.video);
        };
        var decreaseVolumeBtn = document.createElement('button');
        decreaseVolumeBtn.classList.add('btn', 'ml-2');
        decreaseVolumeBtn.innerHTML = 'Decrease';
        decreaseVolumeBtn.onclick = function () {
            _this.decreaseVolume(_this.video);
        };
        remoteDiv.append(showNextBtn, showPreviousBtn, playBtn, pauseBtn, stopBtn, muteUnMuteVolumeBtn, increaseVolumeBtn, decreaseVolumeBtn);
        document.getElementById('remoteColumn').append(remoteDiv);
    }
    Remote.prototype.stopVideo = function (v) {
        v.load();
        v.pause();
    };
    Remote.prototype.playVideo = function (v) {
        v.play();
    };
    Remote.prototype.pauseVideo = function (v) {
        v.pause();
    };
    Remote.prototype.muteUnMuteVolume = function (v) {
        console.log(v);
        this.tvMute = !this.tvMute;
        if (this.tvMute) {
            v.muted = true;
        }
        else {
            v.muted = false;
        }
    };
    Remote.prototype.increaseVolume = function (v) {
        var volume = +(parseFloat(v.volume).toFixed(1));
        if (volume <= 0.9) {
            volume = volume + 0.1;
        }
        v.volume = volume;
    };
    Remote.prototype.decreaseVolume = function (v) {
        var volume = +(parseFloat(v.volume).toFixed(1));
        if (volume >= 0.1) {
            volume = volume - 0.1;
        }
        v.volume = volume;
    };
    return Remote;
}());
var TV = /** @class */ (function () {
    function TV() {
        var tvDiv = document.createElement('div');
        tvDiv.classList.add('tvFrame', 'mt-3');
        tvDiv.setAttribute('id', 'tvFrame');
        var video = this.createVideo('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4');
        tvDiv.append(video);
        document.getElementById('tvColumn').append(tvDiv);
    }
    TV.prototype.createVideo = function (channelSrc) {
        console.log('channelSrc', channelSrc);
        var video = document.createElement('video');
        video.setAttribute('id', 'tv');
        video.classList.add('hidden', 'mt-2');
        video.setAttribute('controls', 'true');
        video.style.height = '253px';
        video.style.width = '600px';
        video.setAttribute('src', channelSrc);
        video.play();
        return video;
    };
    return TV;
}());
var tvOn = false;
function onOffTV() {
    tvOn = !tvOn;
    if (tvOn) {
        document.getElementById('onOffTvId').innerHTML = 'Turn Off';
        var tv = new TV();
        var remote = new Remote(tv);
    }
    else {
        document.getElementById('onOffTvId').innerHTML = 'Turn On';
        var tvFrame = document.getElementById('tvFrame');
        tvFrame.parentNode.removeChild(tvFrame);
        var remoteFrame = document.getElementById('remoteFrame');
        remoteFrame.parentNode.removeChild(remoteFrame);
    }
}
