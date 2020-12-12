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
    const remoteDiv = document.createElement('div');
    remoteDiv.classList.add('mt-3');
    remoteDiv.setAttribute('id', 'remoteFrame');

    const showNextBtn = document.createElement('button');
      showNextBtn.classList.add('btn', 'btn-warning');
      showNextBtn.innerHTML = 'Show Next';

      showNextBtn.onclick = () => {
        if(this.currentVideoIndex === this.collection.length - 1){
          this.currentVideoIndex = 0;  
        } else {
          this.currentVideoIndex++;
        }
        this.video = null;
        const tv =document.getElementById('tv');
        tv.parentNode.removeChild(tv);
        const videoFrame = this.tv.createVideo(this.collection[this.currentVideoIndex]);
        this.video = <HTMLVideoElement>document.getElementById('tv');
        document.getElementById('tvFrame').append(videoFrame);
      }

      const showPreviousBtn = document.createElement('button');
      showPreviousBtn.classList.add('btn', 'btn-danger', 'ml-2');
      showPreviousBtn.innerHTML = 'Show Previous';

      showPreviousBtn.onclick = () => {
        console.log(this);
        console.log('Previous clicked');
        if(this.currentVideoIndex === 0){
          this.currentVideoIndex = this.collection.length - 1;   
        } else {
          this.currentVideoIndex--;
        }
        
        const tv =document.getElementById('tv');
        tv.parentNode.removeChild(tv);
        const video = this.tv.createVideo(this.collection[this.currentVideoIndex]);
        this.video = <HTMLVideoElement>document.getElementById('tv');
        document.getElementById('tvFrame').append(video);  
      }

      const playBtn = document.createElement('button');
      playBtn.classList.add('btn', 'btn-primary', 'ml-2');
      playBtn.innerHTML = 'Play';

      playBtn.onclick = () => {
        this.playVideo(this.video);
      }

      const pauseBtn = document.createElement('button');
      pauseBtn.classList.add('btn', 'btn-info', 'ml-2');
      pauseBtn.innerHTML = 'Pause';

      pauseBtn.onclick = () => {
        this.pauseVideo(this.video);
      }

      const stopBtn = document.createElement('button');
      stopBtn.classList.add('btn', 'ml-2');
      stopBtn.innerHTML = 'Stop';

      stopBtn.onclick = () => {
        this.stopVideo(this.video);
      }

      const muteUnMuteVolumeBtn = document.createElement('button');
      muteUnMuteVolumeBtn.classList.add('btn', 'ml-2');
      muteUnMuteVolumeBtn.innerHTML = 'mute/unmute';

      muteUnMuteVolumeBtn.onclick = () => {
        this.muteUnMuteVolume(this.video);
      }

      const increaseVolumeBtn = document.createElement('button');
      increaseVolumeBtn.classList.add('btn', 'ml-2');
      increaseVolumeBtn.innerHTML = 'Increase';

      increaseVolumeBtn.onclick = () => {
        this.increaseVolume(this.video);
      }

      const decreaseVolumeBtn = document.createElement('button');
      decreaseVolumeBtn.classList.add('btn', 'ml-2');
      decreaseVolumeBtn.innerHTML = 'Decrease';

      decreaseVolumeBtn.onclick = () => {
        this.decreaseVolume(this.video);
      }

      remoteDiv.append(showNextBtn, showPreviousBtn, playBtn, pauseBtn, stopBtn, muteUnMuteVolumeBtn, increaseVolumeBtn,decreaseVolumeBtn);
      document.getElementById('remoteColumn').append(remoteDiv);
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
    console.log(v);
    this.tvMute = !this.tvMute;
    
    if(this.tvMute){
      v.muted = true;
    } else{
      v.muted = false;
    }
  }

  increaseVolume(v: HTMLVideoElement){
    let volume = +(parseFloat(v.volume).toFixed(1))
    if(volume <= 0.9){
      volume = volume + 0.1;
    }
    v.volume = volume;
  }

  decreaseVolume(v: HTMLVideoElement){
    let volume = +(parseFloat(v.volume).toFixed(1))
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

  createVideo(channelSrc: string){
    console.log('channelSrc',channelSrc);
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
