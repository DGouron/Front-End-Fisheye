const sortThumbByLikeCount = () => {
    const thumbs = document.querySelectorAll('.media__card');
    const sortedThumbs = Array.from(thumbs);
    sortedThumbs.sort((a, b) => {
        const aLikes = parseInt(a.getAttribute('data-likes'));
        const bLikes = parseInt(b.getAttribute('data-likes'));
        return bLikes - aLikes;
    });
    return sortedThumbs;
}

const sortThumbByDate = () => {
    const thumbs = document.querySelectorAll('.media__card');
    const sortedThumbs = Array.from(thumbs);
    sortedThumbs.sort((a, b) => {
        const aDate = new Date(a.getAttribute('data-date'));
        const bDate = new Date(b.getAttribute('data-date'));
        return bDate - aDate;
    });
    return sortedThumbs;
}

const sortThumbByTitle = () => {
    const thumbs = document.querySelectorAll('.media__card');
    const sortedThumbs = Array.from(thumbs);
    sortedThumbs.sort((a, b) => {
        const aTitle = a.querySelector('.media__title').textContent;
        const bTitle = b.querySelector('.media__title').textContent;
        return aTitle.localeCompare(bTitle);
    });
    return sortedThumbs;
}

const getSortedThumb = (order) => {
  switch (order)  {
    case 'Popularité':
      return sortThumbByLikeCount();
    case 'Date':
      return sortThumbByDate();
    case 'Titre':
      return sortThumbByTitle();
    default:
      return sortThumbByDate();
  }
}

const clearThumbs = (mediaContainer) => {
  if(!mediaContainer) throw new Error('mediaContainer is not defined'); 
  else mediaContainer.innerHTML = '';
}

const refreshThumbs = (order) => {
  const sortedThumbs = getSortedThumb(order);
  const mediaContainer = document.querySelector('.media__container');
  clearThumbs(mediaContainer);
  sortedThumbs.forEach(thumb => {
    mediaContainer.appendChild(thumb);
  });
}