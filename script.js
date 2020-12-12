var Remote = /** @class */ (function () {
    function Remote(tv) {
        var _this = this;
        this.collection = ['https://res.cloudinary.com/dndxifzl4/video/upload/v1607761709/TvApp/dareDevil-batman_bgmb5t.mp4',
            'https://res.cloudinary.com/dndxifzl4/video/upload/v1607761716/TvApp/starwars_ulaavh.mp4',
            'https://res.cloudinary.com/dndxifzl4/video/upload/v1607761700/TvApp/dareDevil_t8lu6s.mp4',
            'https://res.cloudinary.com/dndxifzl4/video/upload/v1607761689/TvApp/avengers_hkfn6x.mp4'
        ];
        this.tv = tv;
        this.currentVideoIndex = 0;
        this.video = document.getElementById('tv');
        var buttonsDiv = document.createElement('div');
        buttonsDiv.setAttribute('class', 'remoteButtons mt-3');
        buttonsDiv.setAttribute('id', 'remoteFrame');
        var showNextBtn = document.createElement('div');
        showNextBtn.classList.add();
        showNextBtn.innerHTML = '<i class="fas fa-forward"></i>';
        showNextBtn.onclick = function () {
            if (_this.currentVideoIndex === _this.collection.length - 1) {
                _this.currentVideoIndex = 0;
            }
            else {
                _this.currentVideoIndex++;
            }
            _this.video = null;
            var tv = document.getElementById('tv');
            tv.parentNode.removeChild(tv);
            var videoFrame = _this.tv.createVideo(_this.collection[_this.currentVideoIndex]);
            _this.video = videoFrame; //<HTMLVideoElement>document.getElementById('tv');
            document.getElementById('tvFrame').append(videoFrame);
        };
        var showPreviousBtn = document.createElement('div');
        showPreviousBtn.innerHTML = '<i class="fas fa-backward"></i>';
        showPreviousBtn.onclick = function () {
            if (_this.currentVideoIndex === 0) {
                _this.currentVideoIndex = _this.collection.length - 1;
            }
            else {
                _this.currentVideoIndex--;
            }
            var tv = document.getElementById('tv');
            tv.parentNode.removeChild(tv);
            var videoFrame = _this.tv.createVideo(_this.collection[_this.currentVideoIndex]);
            _this.video = videoFrame; //<HTMLVideoElement>document.getElementById('tv');
            document.getElementById('tvFrame').append(videoFrame);
        };
        var playBtn = document.createElement('div');
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        playBtn.onclick = function () {
            _this.playVideo(_this.video);
        };
        var pauseBtn = document.createElement('div');
        pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        pauseBtn.onclick = function () {
            _this.pauseVideo(_this.video);
        };
        var stopBtn = document.createElement('div');
        stopBtn.innerHTML = '<i class="fas fa-stop"></i>';
        stopBtn.onclick = function () {
            _this.stopVideo(_this.video);
        };
        var muteUnMuteVolumeBtn = document.createElement('div');
        muteUnMuteVolumeBtn.setAttribute('id', 'muteUnMute');
        muteUnMuteVolumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        muteUnMuteVolumeBtn.onclick = function () {
            _this.muteUnMuteVolume(_this.video);
        };
        var increaseVolumeBtn = document.createElement('div');
        increaseVolumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        increaseVolumeBtn.onclick = function () {
            _this.increaseVolume(_this.video);
        };
        var decreaseVolumeBtn = document.createElement('div');
        decreaseVolumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        decreaseVolumeBtn.onclick = function () {
            _this.decreaseVolume(_this.video);
        };
        buttonsDiv.append(showPreviousBtn, showNextBtn, playBtn, pauseBtn, stopBtn, muteUnMuteVolumeBtn, increaseVolumeBtn, decreaseVolumeBtn);
        document.getElementById('remoteColumn').append(buttonsDiv);
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
        this.tvMute = !this.tvMute;
        var muteBtn = document.querySelector('#muteUnMute');
        if (this.tvMute) {
            muteBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
            muteBtn.classList.add('bg-danger');
            muteBtn.style.width = '40px';
            v.muted = true;
        }
        else {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            muteBtn.classList.remove('bg-danger');
            v.muted = false;
        }
    };
    Remote.prototype.increaseVolume = function (v) {
        var volume = +((v.volume).toFixed(1));
        if (volume <= 0.9) {
            volume = volume + 0.1;
        }
        v.volume = volume;
    };
    Remote.prototype.decreaseVolume = function (v) {
        var volume = +((v.volume).toFixed(1));
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
        var video = this.createVideo('https://res.cloudinary.com/dndxifzl4/video/upload/v1607761709/TvApp/dareDevil-batman_bgmb5t.mp4');
        tvDiv.append(video);
        document.getElementById('tvColumn').append(tvDiv);
    }
    TV.prototype.createVideo = function (channelSrc) {
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
