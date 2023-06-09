//TODO : use i18n for all the text content in the future
const SORT__TYPES = ["Popularité", "Date", "Titre"];

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

function getMediaById(media, id) {
  return media.find(media => media.id == id);
}

async function displayHeader(photographers, photographerId){
   
  const photographer = getPhotographer(photographers, photographerId);
  if(!photographer) return "Photographer not found";

  const photographerModel = photographerFactory(photographer);
  const photographerHeader = document.querySelector(".photographer__header");

  const photographerCardThumbnail = photographerModel.buildCardThumbnail();
  const photographerContactButton = photographerModel.buildContactButton();
  const photographerCardName = photographerModel.buildCardName(true);
  const photographerLocation = photographerModel.buildLocation(true);
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

async function displayMediaInLightbox(mediaId){
  // Fetch media from API
  const { media } = await dataFetch("./data/photographers.json", "GET");
  const mediaFound = getMediaById(media, mediaId);
  if(!mediaFound) throw new Error("Media not found");
  const mediaModel = mediaFactory(mediaFound);
  const lightboxCard = mediaModel.buildLightboxCard();
  const lightboxContainer = document.querySelector(".modal__lightbox--container");
  lightboxContainer.removeChild(lightboxContainer.lastChild);
  lightboxContainer.appendChild(lightboxCard);
} 

async function displayTotalLikes (totalLikes){
  const totalLikesContainer = document.querySelector(".likes__count");
  if(!totalLikesContainer) throw new Error("Total likes container not found");
  totalLikesContainer.textContent = totalLikes;
  return "success";
};


async function displaySortMenu(){
  const sortMenu = document.querySelector(".sort__menu");
  if(!sortMenu) throw new Error("Sort menu not found");

  const sortSelection = document.querySelector(".sort__selection");
  if(!sortSelection) throw new Error("Sort selection not found");

  SORT__TYPES.forEach(sortType => {
    const sortOption = document.createElement("option");
      sortOption.setAttribute("value", sortType);
      sortOption.setAttribute("aria-label", sortType);
      sortOption.setAttribute("role", "option");
      sortOption.setAttribute("aria-selected", "false");
      sortOption.textContent = sortType;
    sortSelection.appendChild(sortOption);
  });

  return "success";
};

function bindContactModal(){
  const contactButton = document.querySelector(".modal__contact--button");
  const modalContact = document.getElementById("modal__contact");
  const closeModalButton = document.querySelector(".modal__close--button");

  contactButton.addEventListener("click", () => {
    modalContact.classList.add("modal--active");
    modalContact.setAttribute("aria-hidden", "false");
    focus(modalContact);
  });

  contactButton.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
      focus(modalContact);
    }
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
  const mediaCards = document.querySelectorAll(".media__thumb");
  const modalLightbox = document.getElementById("modal__lightbox");
  const closeModalButton = document.querySelector(".modal__lightbox--close");

  const getCurrentMediaCardId = () => {
    const lightboxCard = document.querySelector(".lightbox__card");
    const currentCardId = lightboxCard.firstChild.getAttribute("data-id");
    return currentCardId;
  };
  
  const getAllMediaCards = () => {
    const mediaCards = document.querySelectorAll(".media__thumb");
    const mediaCardsArray = Array.from(mediaCards);
    return mediaCardsArray;
  };
  
  const findPreviousMediaCard = (currentMediaCardId) => {
    const mediaCards = getAllMediaCards();
    const currentMediaCardIndex = mediaCards.findIndex(mediaCard =>
       mediaCard.getAttribute("data-id") === currentMediaCardId);
    if(currentMediaCardIndex !== 0) return mediaCards[currentMediaCardIndex - 1];
    return mediaCards[mediaCards.length - 2]
  };
  
  const findNextMediaCard = (currentMediaCardId) => {
    const mediaCards = getAllMediaCards();
    const currentMediaCardIndex = mediaCards.findIndex(mediaCard =>
        mediaCard.getAttribute("data-id") === currentMediaCardId);
    if(currentMediaCardIndex === mediaCards.length - 2) return mediaCards[0];
    else return mediaCards[currentMediaCardIndex + 1];
  };

  const lightboxActivation = (dataId) => {
      modalLightbox.classList.add("modal__active--flex");
      modalLightbox.setAttribute("aria-hidden", "false");
      modalLightbox.classList.remove("modal--inactive");
      displayMediaInLightbox(dataId);
  };

  mediaCards.forEach(mediaCard => {
    mediaCard.addEventListener("click", (e) => {
      lightboxActivation(e.target.getAttribute("data-id"));
    });
    mediaCard.addEventListener("keydown", (e) => {
      if(e.key === "Enter" || e.key === " "){
        lightboxActivation(e.target.getAttribute("data-id"));
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
    const previousMediaCard = findPreviousMediaCard(getCurrentMediaCardId());
    lightboxActivation(previousMediaCard.getAttribute("data-id"));
  });

  nextButton.addEventListener("click", () => { 
    const nextMediaCard = findNextMediaCard(getCurrentMediaCardId());
    lightboxActivation(nextMediaCard.getAttribute("data-id"));
  }
  );

  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape"){
      modalLightbox.classList.remove("modal__active--flex");
      modalLightbox.setAttribute("aria-hidden", "true");
      modalLightbox.classList.add("modal--inactive");
    }

    if(e.key === "ArrowLeft" || e.keyCode === 37 ){
      const previousMediaCard = findPreviousMediaCard(getCurrentMediaCardId());
      lightboxActivation(previousMediaCard.getAttribute("data-id"));
    }

    if(e.key === "ArrowRight" || e.keyCode === 39){
      const nextMediaCard = findNextMediaCard(getCurrentMediaCardId());
      lightboxActivation(nextMediaCard.getAttribute("data-id"));
    }
  }
  );
}

function bindLikeButtons(){
  const likeButtons = document.querySelectorAll(".like__button");
  likeButtons.forEach(likeButton => {
    likeButton.addEventListener("click", (e) => {
      e.preventDefault();
      const thumb = e.target.closest(".media__card");
      const buttonPressed = e.target.closest(".like__button");
      buttonPressed.setAttribute("disabled", "true")
      const likeStatus = thumb.getAttribute("data-liked");
      if(likeStatus === "false"){
        likeThisThumb(thumb, buttonPressed);
      } else {
        unlikeThisThumb(thumb, buttonPressed);
      }
    });
  });
};

function bindSortSelection(){
  const sortSelection = document.querySelector(".sort__selection");
  sortSelection.addEventListener("change", (e) => {
    const selectedOption = e.target.value;
    refreshThumbs(selectedOption);
  });
};
      


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

  const totalLikes = await getTotalLikes(media, photographerId);
  const displayTotalLikesStatus = await displayTotalLikes(totalLikes);
  if(displayTotalLikesStatus !== "success") throw new Error(displayTotalLikesStatus);

  const sortdOptionsCreationStatus = await displaySortMenu();
  if(sortdOptionsCreationStatus !== "success") throw new Error(sortdOptionsCreationStatus);
  
  bindContactModal();
  bindLightboxModal();
  bindLikeButtons();
  bindSortSelection();

  // Sort by default
  refreshThumbs("Popularité");

};

init();