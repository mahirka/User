export interface FreeListing {
    bgImage:string,
    imageUrl:string[],
    name: string,
    rating:number,
    about:string,
    openingTime:Date,
    closingTime:Date,
    workingDays:string[], 
    tags:string[],
    products:Products[],
    facebookLink: string,
    whatsappNumber:string,
    instagramLink:string,
    contactNumber:string,
    reviews:Reviews[],
}

export interface Products {
    productImageUrl:string,
    name:string,
    description:string,
    price:number,
}
export interface Reviews {
    profilePicUrl:string,
    name:string,
    reviewText:string,
    rating:number,
    reviewDate:Date,
}