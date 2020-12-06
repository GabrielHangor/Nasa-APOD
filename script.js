// NASA API
count = 10;
const apirKey = "DEMO_KEY";
const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apirKey}&count=${count}`;

let resultsArray = [];

// Get 10 images from NASA API
async function getNasaPictures() {
  try {
    const response = await fetch(apiURL);
    resultsArray = await response.json();
  } catch (error) {
    
  }
}

// On Load
getNasaPictures();
