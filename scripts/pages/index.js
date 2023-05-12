async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        /* Add card img */
        const photographerCardImg = photographerModel.buildCardImg();
        /* Add card name */
        const photographerCardName = photographerModel.buildCardName();
        /* Add country and city */
        const photographerLocation = photographerModel.buildLocation();
        /* Add tagline */
        const photographerTagline = photographerModel.buildTagline();
        /* Add price */
        const photographerPrice = photographerModel.buildPrice();
        
        /* Wrap details in block */
        const photographerDetails = photographerModel.compileDetails([
            photographerLocation,
            photographerTagline,
            photographerPrice
        ]);

        /* Wrap card into link */
        const photographerLink = photographerModel.buildLink([photographerCardImg, photographerCardName]);
       
        /* Add link to section */   
        photographersSection.appendChild(photographerLink);

        /* Create article */
        const photographerArticle = 
        photographerModel.compilePhotographerArticle([
            photographerLink,
            photographerDetails,
        ]);

        /* Add article to section */
        photographersSection.appendChild(photographerArticle);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await dataFetch("./data/photographers.json", "GET");
    displayData(photographers);
};
    
init();
    
