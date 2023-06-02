function photographerFactory(data) {
    const { name, portrait } = data;

    const picture = `assets/portraits/${portrait}`;

    const compilePhotographerArticle = (items) => {
        const photographer = document.createElement( 'article' );
        console.log(items);
        items.forEach(item => {
            photographer.appendChild(item);
        });
        return photographer;
    };
    const compileDetails = (items) => {
        const details = document.createElement( 'div' );
        details.id = "details";
        details.classList.add("details");
        items.forEach(item => {
            details.appendChild(item);
        });
        return details;
    };
    const buildCardThumbnail = () => {
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Photo du photographe ${name}`);
        return img;
    };
    const buildCardName = () => {
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        return h2;
    };
    const buildLocation = () => {
        const city = document.createElement( 'h3' );
        city.textContent = `${data.city}, ${data.country}`;
        return city;
    };

    const buildTagline = () => {
        const tagline = document.createElement( 'p' );
        tagline.textContent = data.tagline;
        return tagline;
    };

    const buildPrice = () => {
        const price = document.createElement( 'p' );
        price.textContent = `${data.price}€ / jour`;
        return price;
    };
    const buildLikesCounter = () => {
        const likeCount = document.createElement("span");
            likeCount.classList.add("likes__count");
        const likeIcon = document.createElement("i");
            likeIcon.classList.add("fas", "fa-heart");
        const likeCounter = document.createElement("p");
            likeCounter.classList.add("likes__counter");
            likeCounter.setAttribute("aria-label", "likes");
            likeCounter.appendChild(likeCount);
            likeCounter.appendChild(likeIcon);
        return likeCounter;
    };

    const  buildCard = () => {
        const card = document.createElement( 'div' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Photo du photographe ${name}`);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        card.appendChild(img);
        card.appendChild(h2);
        return card;
    }

    const buildLink = (itemsToWrap) => {
        const linkToPhotographer = document.createElement( 'a' );
        linkToPhotographer.setAttribute("href", `photographer.html?id=${data.id}`);
        linkToPhotographer.setAttribute("aria-label", `lien vers ${name} profil`);
        itemsToWrap.forEach(item => {
            linkToPhotographer.appendChild(item);
        });
        return linkToPhotographer;
    }

    const buildContactButton = () => {
        const contactButton = document.createElement( 'button' );
        contactButton.classList.add("modal__contact--button");
        contactButton.setAttribute("aria-label", `Contact Me`);
        contactButton.setAttribute("id", `openContactModal`);
        contactButton.textContent = "Contactez-moi";
        return contactButton;
    }

    const populateEncart = () => {
        const encartContent = document.createElement( 'p' );
        encartContent.classList.add("photographer__encart--content");
        const likeCounterElement = buildLikesCounter();
        const priceElement = buildPrice();
        encartContent.appendChild(likeCounterElement);
        encartContent.appendChild(priceElement);
        return encartContent;
    }

    return { 
        buildLink,
        buildCardThumbnail, 
        buildCardName, 
        compilePhotographerArticle,
        compileDetails,
        buildLocation,
        buildTagline,
        buildPrice,
        buildLikesCounter,
        buildContactButton,
        populateEncart,
     }
}