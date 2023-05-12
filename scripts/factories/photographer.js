function photographerFactory(data) {
    const { name, portrait } = data;

    const picture = `assets/portraits/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Photo du photographe ${name}`);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        const city = document.createElement( 'h3' );
        city.textContent = `${data.city}, ${data.country}`;
        article.appendChild(city);
        const tagline = document.createElement( 'p' );
        tagline.textContent = data.tagline;
        article.appendChild(tagline);
        const price = document.createElement( 'p' );
        price.textContent = `${data.price}€/jour`;
        article.appendChild(price);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}