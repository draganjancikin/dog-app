// Variables ===================================================================

//   - with HTML elements ......................................................
const breeds = document.querySelector(".breeds");
const dog = document.querySelector(".dog");
const img = document.querySelector(".dog-img");

//   - with API ................................................................
const BREEDS_URL = "https://dog.ceo/api/breeds/list/all";
const DOG_URL = "https://dog.ceo/api/breeds/image/random";


// Event Listeners =============================================================
breeds.addEventListener("change", function(event){
  // when change heapens catch breed
  const breed = event.target.value;
  // define dog variable with API
  const DOG_BY_BREED_URL = `https://dog.ceo/api/breed/${breed}/images/random`;
  // call function that get dog API and add dog image to html
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
  fetch(url)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    let dogImgUrl = data.message;
    // add image to html
    img.src = dogImgUrl;
  });
}

// Get breeds from dog.ceo API and fill select tag with breeds .................
function getBreeds(url){
  fetch(url)
  .then(function(response){
    return response.json();
  })
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