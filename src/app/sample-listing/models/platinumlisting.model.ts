export interface PlatinumListing {
    imageUrl:string,
    name: string,
    description:string,
    about:string,
    openingTime:Date,
    closingTime:Date,
    workingDays:string[],
    galleryImageUrls:string[], 
    products:Products[],
    servicesDescription:string,
    services:Services[],
    reviews:Reviews[],
    facebookLink: string,
    instagramLink:string,
    contactNumber:string,
    footerText:string,
}

export interface Products {
    productImageUrl:string,
    name:string,
    description:string,
    price:number,
}
export interface Services {
    description:string,
}
export interface Reviews {
    profilePicUrl:string,
    name:string,
    reviewText:string,
    rating:number,
    reviewDate:Date,
}

