async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        /* Add card img */
        const photographerCardThumbnail = photographerModel.buildCardThumbnail();
        /* Add card name */
        const photographerCardName = photographerModel.buildCardName(false);
        /* Add country and city */
        const photographerLocation = photographerModel.buildLocation(false);
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
        const photographerLink = photographerModel.buildLink([photographerCardThumbnail, photographerCardName]);
       
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
    const { photographers } = await dataFetch("./data/photographers.json", "GET");
    displayData(photographers);
};
    
init();
    
