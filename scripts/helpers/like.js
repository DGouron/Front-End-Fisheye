const incrementTotalLikes = () => {
    const likes = document.querySelector('.likes__count');
    likes.textContent = parseInt(likes.textContent) + 1;
}

const decrementTotalLikes = () => {
    const likes = document.querySelector('.likes__count');
    likes.textContent = parseInt(likes.textContent) - 1;
}

const getTotalLikes = async (media, photographerId) => {  
  const mediaFound = await getPhotographerMedia(media, photographerId);
  const totalLikes = mediaFound.reduce((accumulator, media) => accumulator + media.likes, 0); 
  return totalLikes;
};

const likeThisThumb = (thumb, buttonPressed) => {
  const likeCount = thumb.querySelector(".like__button--count");
  likeCount.textContent =
      Number(likeCount.textContent) + 1;
  thumb.setAttribute("data-liked", "true");
  const likeButtonIcon = buttonPressed.querySelector(".far");
    likeButtonIcon.classList.remove("far");
    likeButtonIcon.classList.add("fas");
  incrementTotalLikes();
  buttonPressed.removeAttribute("disabled");
};

const unlikeThisThumb = (thumb, buttonPressed) => {
  const likeCount = thumb.querySelector(".like__button--count");
  likeCount.textContent =
      Number(likeCount.textContent) - 1;
      thumb.setAttribute("data-liked", "false");
  const likeButtonIcon = buttonPressed.querySelector(".fas");
    likeButtonIcon.classList.remove("fas");
    likeButtonIcon.classList.add("far");
  decrementTotalLikes();
  buttonPressed.removeAttribute("disabled");
}

