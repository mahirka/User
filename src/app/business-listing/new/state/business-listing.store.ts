import { EmailValidator } from "@angular/forms";

export interface BusinessListingBasicDetails {
    firstName:  string,
    lastName:string,         
    category:string,
    subCategory: string,
    floorDoorNumber: number,
    buildingName: string,
    landmark: string,
    streetName:string ,
    nearestTown: string, 
    district: string, 
    zipCode: string ,
    province: string ,
    country: string ,
    keyWords: string ,
    openingTime: Date,
    closingTime: Date,
    workingDays: string,
    personName: string,
    mobile: number,
    designation: string,
    email: string,
    aboutDescription:string, 
    url:string,
    publicUrl:string, 
}

export interface BusinessListingPlan {
    plan:string,
}
export interface BusinessListingPlanDetails {
    facebookLink:string,
    websiteLink:string,
    youtubeLink:string,
    whatsappNumber:string,
    instagramLink:string,
    twitterLink: string,
    linkedinLink:string,

}
