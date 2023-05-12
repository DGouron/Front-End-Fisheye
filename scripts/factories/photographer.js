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
    const buildCardImg = () => {
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
        price.textContent = `${data.price}€/jour`;
        return price;
    };

    function buildCard(){
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

    function buildLink(itemsToWrap) {
        const linkToPhotographer = document.createElement( 'a' );
        linkToPhotographer.setAttribute("href", `photographer.html?id=${data.id}`);
        linkToPhotographer.setAttribute("aria-label", `lien vers ${name} profil`);
        itemsToWrap.forEach(item => {
            linkToPhotographer.appendChild(item);
        });
        return linkToPhotographer;
    }

    return { 
        buildLink,
        buildCardImg, 
        buildCardName, 
        compilePhotographerArticle,
        compileDetails,
        buildLocation,
        buildTagline,
        buildPrice,
     }
}