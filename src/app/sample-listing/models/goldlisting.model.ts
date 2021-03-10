export interface GoldListing {
    imageUrl:string,
    name: string,
    rating:number,
    about:string,
    openingTime:Date,
    closingTime:Date,
    workingDays:string[],
    galleryImageUrl:string[], 
    products:Products[],
    services:Services[],
    reviews:Reviews[],
    facebookLink: string,
    instagramLink:string,
    twitterLink:string,
    webLink:string,
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