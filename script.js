const resultsNav = document.querySelector("#resultsNav");
const favoritesNav = document.queryCommandEnabled("#favoritesNav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

// NASA API
count = 10;
const apirKey = "DEMO_KEY";
const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apirKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

// Create card element and insert in into the DOM
function updateDOM() {
  resultsArray.forEach((result) => {
    // Card container
    const card = document.createElement("div");
    card.classList.add("card");
    // Img link
    const link = document.createElement("a");
    link.href = result.hdurl;
    link.title = "View  Full Image";
    link.target = "_blank";
    // Image
    const image = document.createElement("img");
    image.src = result.url;
    image.alt = "NASA Picture of the Day";
    image.loading = "lazy";
    image.classList.add("card-img-top");
    // Card body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    // Card title
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = result.title;
    // Save Text
    const saveText = document.createElement("p");
    saveText.classList.add("clickable");
    saveText.textContent = "Add To Favorites";
    saveText.setAttribute("onclick", `saveFavorite('${result.url}')`);
    // Card Text
    const cardText = document.createElement("p");
    cardText.textContent = result.explanation;
    // Footer Container
    const footer = document.createElement("small");
    footer.classList.add("text-muted");
    // Date
    const date = document.createElement("strong");
    date.textContent = result.date;
    // Copyright
    const copyrightResult =
      result.copyright === undefined ? "" : result.copyright;
    const copyright = document.createElement("span");
    copyright.textContent = ` ${copyrightResult}`;
    // Append elements to the Images Container
    footer.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
}

// Get 10 images from NASA API
async function getNasaPictures() {
  try {
    const response = await fetch(apiURL);
    resultsArray = await response.json();
    updateDOM();
  } catch (error) {}
}

// Add result to favorites object and to localstorage
function saveFavorite(itemUrl) {
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden = true;
      }, 2000);
    }
  });

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// On Load
getNasaPictures();
