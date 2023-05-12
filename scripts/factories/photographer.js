function photographerFactory(data) {
    const { name, portrait } = data;

    const picture = `assets/portraits/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        const city = document.createElement( 'h3' );
        city.textContent = `${data.city}, ${data.country}`;
        article.appendChild(city);
        const tagline = document.createElement( 'h4' );
        tagline.textContent = data.tagline;
        article.appendChild(tagline);
        const price = document.createElement( 'h5' );
        price.textContent = `${data.price}€/jour`;
        article.appendChild(price);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}