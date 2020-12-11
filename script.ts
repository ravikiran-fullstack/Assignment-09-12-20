class MediaSystem{
  currentSong: string;
  nextSong: string;
  previousSong: string;

  constructor(){

  }

  playNext(){

  }

  playPrevious(){

  }

  playCurrent(){

  }

  pauseCurrent(){

  }
  
}

class Tv extends MediaSystem{

}

class Remote extends MediaSystem{

}

class Gallery{

  collection:string[] = ['./images/1.jpg','./images/2.jpg','./images/3.jpg'];
  currentImageIndex: number;
  constructor(){
    let value = this.test('Hello');
    this.delay();
    console.log(value)
    this.currentImageIndex = 0;
    const galleryDiv = document.createElement('div');
    galleryDiv.classList.add('galleryFrame','mt-3');
    galleryDiv.setAttribute('id', 'galleryFrame');

      const showNextBtn = document.createElement('button');
      showNextBtn.classList.add('btn', 'btn-warning');
      showNextBtn.innerHTML = 'Show Next';

      showNextBtn.onclick = () => {
        console.log(this);
        console.log('Next clicked');
        if(this.currentImageIndex === 2){
          this.currentImageIndex = 0;  
        } else {
          this.currentImageIndex++;
        }
        
        document.getElementById('galleryImage').setAttribute('src', `${this.collection[this.currentImageIndex]}`)
      }

      const showPreviousBtn = document.createElement('button');
      showPreviousBtn.classList.add('btn', 'btn-danger', 'ml-2');
      showPreviousBtn.innerHTML = 'Show Previous';

      showPreviousBtn.onclick = () => {
        console.log(this);
        console.log('Previous clicked');
        if(this.currentImageIndex === 0){
          this.currentImageIndex = 2;   
        } else {
          this.currentImageIndex--;
        }
        
        document.getElementById('galleryImage').setAttribute('src', `${this.collection[this.currentImageIndex]}`)
      }

      const image = document.createElement('img');
      image.setAttribute('src', `${this.collection[this.currentImageIndex]}`);
      image.setAttribute('id', 'galleryImage');
      image.classList.add('imgStyle', 'mt-2');
      image.setAttribute('alt', 'error');
    
    galleryDiv.append(showNextBtn, showPreviousBtn, image);
    document.getElementById('galleryColumn').append(galleryDiv);
  }

  test(a){
    console.log('testing', a)
    return a;
  }

  delay() : Promise<void>{
    return new Promise((res, rej) => {
      setTimeout(()=> {
        console.log('resolved')
        res();
      }, 1000)
    })
  }
}

//         <div class="galleryFrame mt-3" id="galleryFrame">
//           <button class="btn btn-warning">Show Next</button>
//           <button class="btn btn-danger" >Show Previous</button>
//           <img src="./images/2.jpg" class="imgStyle" alt="Responsive image">
//         </div>

function showGallery(){
  const gallery = new Gallery();
}