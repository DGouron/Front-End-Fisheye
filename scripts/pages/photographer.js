function extractIdFromUrl(url) {
  const urlParams = new URLSearchParams(url);
  return urlParams.get("id");
}

function getPhotographer(photographers, id) {
  return photographers.find(photographer => photographer.id == id);
}

function constructMessage(messageToDisplay, anchor){
  const message = document.createElement("p");
  message.classList.add("message");
  message.textContent = messageToDisplay;
  anchor.appendChild(message);
  return message;
}

async function getPhotographerMedia(media, id) {
  return media.filter(media => media.photographerId == id);
}

async function displayHeader(photographers, photographerId){
   
  const photographer = getPhotographer(photographers, photographerId);
  if(!photographer) return "Photographer not found";

  const photographerModel = photographerFactory(photographer);
  const photographerHeader = document.querySelector(".photographer__header");

  const photographerCardThumbnail = photographerModel.buildCardThumbnail();
  const photographerContactButton = photographerModel.buildContactButton();
  const photographerCardName = photographerModel.buildCardName();
  const photographerLocation = photographerModel.buildLocation();
  const photographerTagline = photographerModel.buildTagline();

  const photographerDetails = photographerModel.compileDetails(
    [
    photographerCardName,
    photographerLocation,
    photographerTagline,
  ]);

    photographerHeader.appendChild(photographerDetails);
    photographerHeader.appendChild(photographerContactButton);
    photographerHeader.appendChild(photographerCardThumbnail);

    return "success";
}

async function displayMedia(photographers, photographerId){
  const mediaSection = document.querySelector(".media__container");
  if(!mediaSection) return "Media section not found";

  const mediaFound = await getPhotographerMedia(photographers, photographerId);
  if(mediaFound.length <= 0){
    const message = constructMessage("Pas encore de média", mediaSection);
    return "No media found";
  }

  mediaFound.forEach(media => {
    const mediaModel = mediaFactory(media);
    let mediaCard = undefined;
    if(media.image || media.video) {
      mediaCard = mediaModel.buildMediaCard();
    } else {
      return "Media type not found";
    }
    if(!mediaCard || mediaCard === undefined) return "Media card cannot be created";
    else 

    mediaSection.appendChild(mediaCard);
  });
  return "success";
};

/**
 * Bind a media card to a lightbox modal when clicked 
 * or when the enter key is pressed
 * @param {HTML Element} mediaCardToBind 
 */

async function displayEncart(photographers, photographerId){
  const encart = document.querySelector(".photographer__encart--container");
  if(!encart) return "Encart not found";

  const photographer = getPhotographer(photographers, photographerId);
  if(!photographer) return "Photographer not found";

  const photographerModel = photographerFactory(photographer);
  encart.appendChild(photographerModel.populateEncart());
  
  return "success";
};

function bindContactModal(){
  const contactButton = document.querySelector(".modal__contact--button");
  const modalContact = document.getElementById("modal__contact");
  const closeModalButton = document.querySelector(".modal__close--button");

  contactButton.addEventListener("click", () => {
    modalContact.classList.add("modal--active");
    modalContact.setAttribute("aria-hidden", "false");
  });

  closeModalButton.addEventListener("click", () => {
    modalContact.classList.remove("modal--active");
    modalContact.setAttribute("aria-hidden", "true");
  });

  const submitButton = document.querySelector(".contact__button--submit");
  submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      const form = document.querySelector(".contact__form");
      const formData = new FormData(form);
      const formValues = Object.fromEntries(formData.entries());
      console.table(formValues);
    }
  );
}

function bindLightboxModal(){
  const mediaCards = document.querySelectorAll(".media__card");
  const modalLightbox = document.getElementById("modal__lightbox");
  const closeModalButton = document.querySelector(".modal__lightbox--close");

  const lightboxActivation = () => {
      modalLightbox.classList.add("modal__active--flex");
      modalLightbox.setAttribute("aria-hidden", "false");
      modalLightbox.classList.remove("modal--inactive");
  };

  mediaCards.forEach(mediaCard => {
    mediaCard.addEventListener("click", () => {
      lightboxActivation();
    });
    mediaCard.addEventListener("keydown", (e) => {
      if(e.key === "Enter" || e.key === " "){
        lightboxActivation();
      }
    });
  });

  closeModalButton.addEventListener("click", () => {
    modalLightbox.classList.remove("modal__active--flex");
    modalLightbox.setAttribute("aria-hidden", "true");
    modalLightbox.classList.add("modal--inactive");
  });

  const previousButton = document.querySelector(".modal__lightbox--prev");
  const nextButton = document.querySelector(".modal__lightbox--next");

  previousButton.addEventListener("click", () => {
    console.log("previous");
  }
  );

  nextButton.addEventListener("click", () => {
    console.log("next");
  }
  );

  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape"){
      modalLightbox.classList.remove("modal__active--flex");
      modalLightbox.setAttribute("aria-hidden", "true");
      modalLightbox.classList.add("modal--inactive");
    }

    if(e.key === "ArrowLeft" || e.keyCode === 37 ){
      console.log("previous");
    }

    if(e.key === "ArrowRight" || e.keyCode === 39){
      console.log("next");
    }
  }
  );
}

async function init() {
  const { photographers, media } = await dataFetch("./data/photographers.json", "GET");
  const photographerId = extractIdFromUrl(window.location.search);
  if(!photographerId) throw new Error("Photographer id not found");

  const headerCreationStatus = await displayHeader(photographers, photographerId);
  if(headerCreationStatus !== "success") throw new Error(headerCreationStatus);

  const mediaCreationStatus = await displayMedia(media, photographerId);
  if(mediaCreationStatus !== "success") throw new Error(mediaCreationStatus);

  const encartCreationStatus = await displayEncart(photographers, photographerId);
  if(encartCreationStatus !== "success") throw new Error(encartCreationStatus);

  bindContactModal();
  bindLightboxModal();
};

init();