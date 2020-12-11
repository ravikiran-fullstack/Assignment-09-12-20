var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MediaSystem = /** @class */ (function () {
    function MediaSystem() {
    }
    MediaSystem.prototype.playNext = function () {
    };
    MediaSystem.prototype.playPrevious = function () {
    };
    MediaSystem.prototype.playCurrent = function () {
    };
    MediaSystem.prototype.pauseCurrent = function () {
    };
    return MediaSystem;
}());
var Tv = /** @class */ (function (_super) {
    __extends(Tv, _super);
    function Tv() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Tv;
}(MediaSystem));
var Remote = /** @class */ (function (_super) {
    __extends(Remote, _super);
    function Remote() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Remote;
}(MediaSystem));
var Gallery = /** @class */ (function () {
    function Gallery() {
        var _this = this;
        this.collection = ['./images/1.jpg', './images/2.jpg', './images/3.jpg'];
        var value = this.test('Hello');
        this.delay();
        console.log(value);
        this.currentImageIndex = 0;
        var galleryDiv = document.createElement('div');
        galleryDiv.classList.add('galleryFrame', 'mt-3');
        galleryDiv.setAttribute('id', 'galleryFrame');
        var showNextBtn = document.createElement('button');
        showNextBtn.classList.add('btn', 'btn-warning');
        showNextBtn.innerHTML = 'Show Next';
        showNextBtn.onclick = function () {
            console.log(_this);
            console.log('Next clicked');
            if (_this.currentImageIndex === 2) {
                _this.currentImageIndex = 0;
            }
            else {
                _this.currentImageIndex++;
            }
            document.getElementById('galleryImage').setAttribute('src', "" + _this.collection[_this.currentImageIndex]);
        };
        var showPreviousBtn = document.createElement('button');
        showPreviousBtn.classList.add('btn', 'btn-danger', 'ml-2');
        showPreviousBtn.innerHTML = 'Show Previous';
        showPreviousBtn.onclick = function () {
            console.log(_this);
            console.log('Previous clicked');
            if (_this.currentImageIndex === 0) {
                _this.currentImageIndex = 2;
            }
            else {
                _this.currentImageIndex--;
            }
            document.getElementById('galleryImage').setAttribute('src', "" + _this.collection[_this.currentImageIndex]);
        };
        var image = document.createElement('img');
        image.setAttribute('src', "" + this.collection[this.currentImageIndex]);
        image.setAttribute('id', 'galleryImage');
        image.classList.add('imgStyle', 'mt-2');
        image.setAttribute('alt', 'error');
        galleryDiv.append(showNextBtn, showPreviousBtn, image);
        document.getElementById('galleryColumn').append(galleryDiv);
    }
    Gallery.prototype.test = function (a) {
        console.log('testing', a);
        return a;
    };
    Gallery.prototype.delay = function () {
        return new Promise(function (res, rej) {
            setTimeout(function () {
                console.log('resolved');
                res();
            }, 1000);
        });
    };
    return Gallery;
}());
//         <div class="galleryFrame mt-3" id="galleryFrame">
//           <button class="btn btn-warning">Show Next</button>
//           <button class="btn btn-danger" >Show Previous</button>
//           <img src="./images/2.jpg" class="imgStyle" alt="Responsive image">
//         </div>
function showGallery() {
    var gallery = new Gallery();
}
