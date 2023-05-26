const BASE_URL = "assets/content/"

function mediaFactory(data) {
    const buildMediaCard = () => {
        const elementFactory = mediaElementFactory(data);
        const card = document.createElement( 'article' );
        card.setAttribute("data-date", data.date);
        card.setAttribute("data-likes", data.likes);
        card.classList.add("media__card");
        const cardThumb = elementFactory.buildThumbElement(data, data.video ? true : false, false);
        const cardTitle = elementFactory.buildTitleElement(data);
        const likeButton = elementFactory.buildLikeElement(data.likes);
        const cardFigcaption = elementFactory.buildFigcaptionElement([cardTitle, likeButton]);
            card.appendChild(cardThumb);    
            card.appendChild(cardFigcaption);    
        return card;
    };

    const buildLightboxCard = () => {
        const elementFactory = mediaElementFactory(data);
        const card = document.createElement( 'article' );
        card.classList.add("lightbox__card");
        const cardThumb = elementFactory.buildThumbElement(data, data.video ? true : false, true);
        const cardTitle = elementFactory.buildTitleElement(data);
        const cardFigcaption = elementFactory.buildFigcaptionElement([cardTitle]);
            card.appendChild(cardThumb);
            card.appendChild(cardFigcaption);
        return card;
    };

    return { 
        buildMediaCard,
        buildLightboxCard
    };
};


function mediaElementFactory(data) {
    const buildThumbElement = (data, itsVideo, hasControl = false) => {
        const thumb = document.createElement( itsVideo ? 'video' : 'img' );
        thumb.setAttribute("src", `${BASE_URL}${data.photographerId}/${itsVideo ? data.video : data.image}`);
        if(itsVideo) {
            if(hasControl){
                thumb.setAttribute("controls", "true");
            }
            thumb.setAttribute("type", "video/mp4");
            thumb.setAttribute("preload", "metadata");
            thumb.setAttribute("aria-label", `Vidéo ${data.title} du photographe ${data.photographerId}}`);
            thumb.setAttribute("title", `Vidéo du photographe ${data.photographerId}`);
            thumb.textContent = "Votre navigateur ne prend pas en charge la vidéo HTML5. Voici un lien pour télécharger la vidéo à la place.";
            const videoLink = document.createElement("a");
                videoLink.setAttribute("href", `${BASE_URL}${data.photographerId}/${data.video}`);
                videoLink.setAttribute("target", "_blank");
                videoLink.setAttribute("rel", "noopener");
                videoLink.setAttribute("aria-label", `Télécharger la vidéo du photographe ${data.photographerId}`);
                videoLink.setAttribute("type", "video/mp4");
                videoLink.setAttribute("title", `Télécharger la vidéo du photographe ${data.photographerId}`);
                videoLink.setAttribute("role", "link");
                videoLink.setAttribute("download", `${data.video}`);
                videoLink.textContent = "Télécharger la vidéo";
            thumb.appendChild(videoLink);
        } else {
            thumb.setAttribute("alt", `Photo ${data.title} du photographe ${data.photographerId}}`);
        }
        thumb.setAttribute("tabindex", "0");
        thumb.classList.add("media__thumb");
        thumb.setAttribute("data-id", data.id);
        return thumb;
    }
    const buildLikeElement = (likeNumber) =>{
        const likeButton = document.createElement("button");
            likeButton.classList.add("like__button");
            likeButton.setAttribute("aria-label", "likes");
            likeButton.setAttribute("type", "button");
        const likeCount = document.createElement("span");
            likeCount.classList.add("like__button--count");
            likeCount.textContent = likeNumber;
        const likeIcon = document.createElement("i");
            likeIcon.classList.add("fas", "fa-heart");
        likeButton.appendChild(likeCount);
        likeButton.appendChild(likeIcon);
        return likeButton;
    }

    const buildTitleElement = (data) => {
        const title = document.createElement("h2");
        title.classList.add("media__title");
        title.textContent = data.title;
        return title;
    }

    const buildFigcaptionElement = (elements) => {
        const figcaption = document.createElement("aside");
        figcaption.classList.add("media__details");
        elements.forEach(element => {
            figcaption.appendChild(element);
        });
        return figcaption;
    }
    return {
        buildThumbElement,
        buildLikeElement,
        buildTitleElement,
        buildFigcaptionElement,
    };
}
