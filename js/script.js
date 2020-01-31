// Variables ===================================================================
//   - with HTML elements ......................................................
const breeds = document.querySelector(".breeds");
const dog = document.querySelector(".dog");

//   - with API ................................................................
const BREEDS_URL = "https://dog.ceo/api/breeds/list/all";
const DOG_URL = "https://dog.ceo/api/breeds/image/random";

// Fill select tag with breeds =================================================
fetch(BREEDS_URL)
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
