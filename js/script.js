// Variables ===================================================================

//   - with HTML elements ......................................................
const breeds = document.querySelector(".breeds");
const dog = document.querySelector(".dog");
const img = document.querySelector(".dog-img");
const loader = document.querySelector(".loader");

//   - with API ................................................................
const BREEDS_URL = "https://dog.ceo/api/breeds/list/all";
const DOG_URL = "https://dog.ceo/api/breeds/image/random";


// Event Listener ==============================================================

// Add event listener to breeds ................................................
breeds.addEventListener("change", function(event){
  // when breeds change, catch breed
  const breed = event.target.value;
  // make API url with breed
  const DOG_BY_BREED_URL = `https://dog.ceo/api/breed/${breed}/images/random`;
  // call function that get image from API url and show image on page
  getDog(DOG_BY_BREED_URL);
});


// Functions ===================================================================

// init function: get first random image and fill select with breeds ...........
function init() {
  getDog(DOG_URL);
  getBreeds(BREEDS_URL);
}

// Get image from API url and add image to html ................................
function getDog(url){
  // show loader and hide img before image load
  loader.classList.add("show");
  img.classList.remove("show");

  fetch(url)
    .then(response => response.json())
    .then(function(data){
      let dogImgUrl = data.message;
      img.src = dogImgUrl; // add image to html 
      
      // check when img load
      img.addEventListener('load', function (event) {
        // hide loader and show image after image load
        loader.classList.remove("show");
        img.classList.add("show");
      });
      
    });
}

// Get breeds from dog.ceo API and fill select tag with breeds .................
function getBreeds(url){
  fetch(url)
    .then(response => response.json())
    .then(function(data){
      const breedsObj = data.message;
      const breedsArr = Object.keys(breedsObj); // Transform Object to Array
      for (let i = 0; i < breedsArr.length; i++){
        let option = document.createElement("option"); // Create option element
        // Add text to option with capitalize first letter
        option.innerText = breedsArr[i].charAt(0).toUpperCase() + breedsArr[i].slice(1);
        // Add property value to option
        option.value = breedsArr[i];
        // Add option element to breeds(<select>)
        breeds.appendChild(option);
      }
    });
}


// initialize app ==============================================================
init();