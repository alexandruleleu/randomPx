import '../../css/main.css'
import $ from 'jquery';
require('../../js/500px');

//array with photos
let PHOTOS = [];

function appendPhotos(tag) {
    const myNode = document.getElementById('my-photos');
    const myCarousel = document.getElementById('slideshow');
    const myLoader = document.getElementById('myLoader');
    myCarousel.style.display = 'none';
    myLoader.style.display = 'block';
        _500px.api('/photos/search', {term: tag, image_size: 3, page: 1}, function (response) {
            let photos = response.data.photos;
            PHOTOS = PHOTOS.concat(photos);
            for (let i = 0; i < 9; i++) {
                let newNode = document.createElement('figure');
                newNode.className = 'shadow';
                let imgChild = document.createElement("img");
                imgChild.id = "photo-img";
                imgChild.setAttribute('src', photos[i].image_url[0]);
                let alt = photos[i].name;
                imgChild.setAttribute('alt', alt);
                // imgChild.setAttribute('height', '200px');
                // imgChild.setAttribute('width', '170px');
                imgChild.dataset.photoId = i;
                newNode.appendChild(imgChild);
                myNode.appendChild(newNode);
            }
            setTimeout(() => { 
                myCarousel.style.display = 'block';
                myLoader.style.display = 'none';
            }, 1000);
        });
};

//500px requests
_500px.init({
  sdk_key: '6763229ce9c9af86b8e4f65f3365422daf36883e'
});

//search photos by tags
function searchPhotosByTags(e) {
    if (e.keyCode == 13) {
        let tag = document.getElementById("searchInput").value;
        const myNode = document.getElementById('my-photos');

        //remove previous photos
        if (myNode.firstChild) {
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
        }

        PHOTOS = [];
        appendPhotos(tag);
    }
}

//modal - information
document.addEventListener('click',function(event) {
  if(event.target && event.target.id === 'photo-img'){
    console.log(PHOTOS);
    //add content for modal = information about photo
    let photoId = event.target.dataset.photoId;
    let myNewNode = document.getElementById("modal-img");
    let name = document.getElementById("modal-img-name");
    name.innerHTML = PHOTOS[photoId].name;
    let imgChild = document.createElement("img");
    imgChild.setAttribute('src', PHOTOS[photoId].image_url);
    let alt = PHOTOS[photoId].name;
    myNewNode.appendChild(imgChild);

    let date = document.getElementById("date");
    const myDate = new Date(PHOTOS[photoId].created_at).toDateString();
    date.innerHTML =  myDate ? myDate : 'empty field';
    let iso = document.getElementById("iso");
    iso.innerHTML =  PHOTOS[photoId].iso ? PHOTOS[photoId].iso : 'empty field';
    let camera = document.getElementById("camera");
    camera.innerHTML =  PHOTOS[photoId].camera ? PHOTOS[photoId].camera : 'empty field';
    let description = document.getElementById("description");
    description.innerHTML = PHOTOS[photoId].description  ? PHOTOS[photoId].description : 'empty field';
    const modal = document.getElementById('myModal');
    modal.style.display = "block";
  }
});

const closeModal = () => {
  let myNode = document.getElementById("modal-img");

  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
  const modal = document.getElementById('myModal');
  modal.style.display = "none";
};

window.searchPhotosByTags = searchPhotosByTags;
window.closeModal = closeModal;
