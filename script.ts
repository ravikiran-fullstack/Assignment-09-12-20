class Remote{
  tv:TV;
  collection:string[] = [ 'https://res.cloudinary.com/dndxifzl4/video/upload/v1607761709/TvApp/dareDevil-batman_bgmb5t.mp4',
                          'https://res.cloudinary.com/dndxifzl4/video/upload/v1607761716/TvApp/starwars_ulaavh.mp4',
                          'https://res.cloudinary.com/dndxifzl4/video/upload/v1607761700/TvApp/dareDevil_t8lu6s.mp4',
                          'https://res.cloudinary.com/dndxifzl4/video/upload/v1607761689/TvApp/avengers_hkfn6x.mp4'
                        ];
  currentVideoIndex: number;
  tvVolume: number;
  tvMute: boolean;
  video: HTMLVideoElement;
  constructor(tv:TV){
    this.tv = tv;
    this.currentVideoIndex = 0;
    this.video = <HTMLVideoElement>document.getElementById('tv');

    const buttonsDiv = document.createElement('div');
    buttonsDiv.setAttribute('class', 'remoteButtons mt-3');
    buttonsDiv.setAttribute('id', 'remoteFrame');

    const showNextBtn = document.createElement('div');
      showNextBtn.classList.add();
      showNextBtn.innerHTML = '<i class="fas fa-forward"></i>';

      showNextBtn.onclick = () => {
        if(this.currentVideoIndex === this.collection.length - 1){
          this.currentVideoIndex = 0;  
        } else {
          this.currentVideoIndex++;
        }
        this.video = null;
        const tv = document.getElementById('tv');
        tv.parentNode.removeChild(tv);
        const videoFrame = this.tv.createVideo(this.collection[this.currentVideoIndex]);
        this.video = videoFrame; //<HTMLVideoElement>document.getElementById('tv');
        document.getElementById('tvFrame').append(videoFrame);
      }

      const showPreviousBtn = document.createElement('div');
      showPreviousBtn.innerHTML = '<i class="fas fa-backward"></i>';

      showPreviousBtn.onclick = () => {
        if(this.currentVideoIndex === 0){
          this.currentVideoIndex = this.collection.length - 1;   
        } else {
          this.currentVideoIndex--;
        }
        
        const tv = document.getElementById('tv');
        tv.parentNode.removeChild(tv);
        const videoFrame = this.tv.createVideo(this.collection[this.currentVideoIndex]);
        this.video = videoFrame; //<HTMLVideoElement>document.getElementById('tv');
        document.getElementById('tvFrame').append(videoFrame);  
      }

      const playBtn = document.createElement('div');
      playBtn.innerHTML = '<i class="fas fa-play"></i>';

      playBtn.onclick = () => {
        this.playVideo(this.video);
      }

      const pauseBtn = document.createElement('div');
      pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';

      pauseBtn.onclick = () => {
        this.pauseVideo(this.video);
      }

      const stopBtn = document.createElement('div');
      stopBtn.innerHTML = '<i class="fas fa-stop"></i>';

      stopBtn.onclick = () => {
        this.stopVideo(this.video);
      }

      const muteUnMuteVolumeBtn = document.createElement('div');
      muteUnMuteVolumeBtn.setAttribute('id', 'muteUnMute');
      muteUnMuteVolumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';

      muteUnMuteVolumeBtn.onclick = () => {
        this.muteUnMuteVolume(this.video);
      }

      const increaseVolumeBtn = document.createElement('div');
      increaseVolumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';

      increaseVolumeBtn.onclick = () => {
        this.increaseVolume(this.video);
      }

      const decreaseVolumeBtn = document.createElement('div');
      decreaseVolumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';

      decreaseVolumeBtn.onclick = () => {
        this.decreaseVolume(this.video);
      }

      buttonsDiv.append(showPreviousBtn, showNextBtn, playBtn, pauseBtn, stopBtn, muteUnMuteVolumeBtn, increaseVolumeBtn,decreaseVolumeBtn);
      document.getElementById('remoteColumn').append(buttonsDiv);
  }

  stopVideo(v: HTMLVideoElement){
    v.load();
    v.pause();
  }

  playVideo( v: HTMLVideoElement){
    v.play();
  }

  pauseVideo(v: HTMLVideoElement){
    v.pause();
  }

  muteUnMuteVolume(v: HTMLVideoElement){
    this.tvMute = !this.tvMute;
    const muteBtn = <HTMLElement>document.querySelector('#muteUnMute');

    if(this.tvMute){
      muteBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
      muteBtn.classList.add('bg-danger');
      muteBtn.style.width = '40px';
      v.muted = true;
    } else{
      muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
      muteBtn.classList.remove('bg-danger');
      v.muted = false;
    }
  }

  increaseVolume(v: HTMLVideoElement){
    let volume = +((v.volume).toFixed(1))
    if(volume <= 0.9){
      volume = volume + 0.1;
    }
    v.volume = volume;
  }

  decreaseVolume(v: HTMLVideoElement){
    let volume = +((v.volume).toFixed(1))
    if(volume >= 0.1){
      volume = volume - 0.1;
    }
    v.volume = volume;
  }
}

class TV{

  constructor(){
    const tvDiv = document.createElement('div');
    tvDiv.classList.add('tvFrame','mt-3');
    tvDiv.setAttribute('id', 'tvFrame');
    const video = this.createVideo('https://res.cloudinary.com/dndxifzl4/video/upload/v1607761709/TvApp/dareDevil-batman_bgmb5t.mp4');      
    tvDiv.append(video);
    document.getElementById('tvColumn').append(tvDiv);

  }

  createVideo(channelSrc: string): HTMLVideoElement{
    const video = document.createElement('video');
    video.setAttribute('id', 'tv');
    video.classList.add('hidden', 'mt-2');
    video.setAttribute('controls', 'true');
    video.style.height = '253px';
    video.style.width = '600px';
    video.setAttribute('src', channelSrc);
    video.play();
    return video;
  }

  
}

let tvOn = false;
function onOffTV(){
  tvOn = !tvOn;
  if(tvOn){
    document.getElementById('onOffTvId').innerHTML = 'Turn Off';
    const tv = new TV();
    const remote = new Remote(tv);
  } else {
    document.getElementById('onOffTvId').innerHTML = 'Turn On';
    const tvFrame = document.getElementById('tvFrame');
    tvFrame.parentNode.removeChild(tvFrame);
    const remoteFrame = document.getElementById('remoteFrame');
    remoteFrame.parentNode.removeChild(remoteFrame);
  }
}
