
import {createReducer,  on,  createAction,  createFeatureSelector,  createSelector} from '@ngrx/store';
import * as AppState from '../../../state/app.reducer'
import * as BusinessListingActions from './business-listing.actions'



export interface State extends AppState.State {
    businessListingState: BusinessListingState
}

export interface BusinessListingState {
    
    businessListingStep:string,
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
    plan:string,
    facebookLink:string,
    websiteLink:string,
    youtubeLink:string,
    whatsappNumber:string,
    instagramLink:string,
    twitterLink: string,
    linkedinLink:string,
    url:string,
    publicUrl:string,
    medias:[],


}

const initialState: BusinessListingState = {
    //businessListingStep:'basic-details',
    businessListingStep:'basic-details',
    firstName:  '',
    lastName:'',         
    category:'',
    subCategory: '',
    floorDoorNumber: 0,
    buildingName: '',
    landmark: '',
    streetName:'' ,
    nearestTown: '', 
    district: '', 
    zipCode: '' ,
    province: '' ,
    country: '' ,
    keyWords: '' ,
    openingTime: new Date(),
    closingTime: new Date(),
    workingDays: '',
    personName: '',
    mobile: 0,
    designation: '',
    email: '',
    aboutDescription:'',
    plan:'',
    facebookLink:'',
    websiteLink:'',
    youtubeLink:'',
    whatsappNumber:'',
    instagramLink:'',
    twitterLink: '',
    linkedinLink:'',
    url:'',
    publicUrl:'',
    medias:[],
}



const getBusinessListingFeatureState = createFeatureSelector<BusinessListingState>('businessListingState')

export const getStep = createSelector(
    getBusinessListingFeatureState,
    state => state.businessListingStep
);
export const getbusinessListingBasicDetails = createSelector(
    getBusinessListingFeatureState,
    state => state
);

export const businessListingReducer = createReducer<BusinessListingState>(
    initialState,
    on(BusinessListingActions.changeBusinessListingStep , (state, action): BusinessListingState => {
        return {
            ...state,
            businessListingStep: action.businessListingStep
        }
    }),
    
    on(BusinessListingActions.saveBusinessListingBasicDetails, (state, action): BusinessListingState => {

        return {
            ...state,
            firstName:  action.businessListingBasicDetails.firstName,
            lastName:action.businessListingBasicDetails.lastName,         
            category:action.businessListingBasicDetails.category, 
            subCategory: action.businessListingBasicDetails.subCategory,
            floorDoorNumber:action.businessListingBasicDetails.floorDoorNumber,
            buildingName: action.businessListingBasicDetails.buildingName,
            landmark: action.businessListingBasicDetails.landmark,
            streetName:action.businessListingBasicDetails.streetName,
            nearestTown: action.businessListingBasicDetails.nearestTown, 
            district: action.businessListingBasicDetails.district,  
            zipCode: action.businessListingBasicDetails.zipCode, 
            province: action.businessListingBasicDetails.province,
            country: action.businessListingBasicDetails.country,
            keyWords: action.businessListingBasicDetails.keyWords ,
            openingTime:action.businessListingBasicDetails.openingTime ,
            closingTime: action.businessListingBasicDetails.closingTime ,
            workingDays:action.businessListingBasicDetails.workingDays ,
            personName: action.businessListingBasicDetails.personName ,
            mobile: action.businessListingBasicDetails.mobile ,
            designation: action.businessListingBasicDetails.designation ,
            email:  action.businessListingBasicDetails.email ,
             aboutDescription:action.businessListingBasicDetails.aboutDescription , 
        }
    }),
    
    on(BusinessListingActions.saveBusinessListingPlan, (state, action): BusinessListingState => {
        return {
            ...state,
            plan: action.businessListingPlan.plan,
            
        }
    }),
    
    on(BusinessListingActions.saveBusinessListingPlanDetails, (state, action): BusinessListingState => {
        return {
            ...state,
            facebookLink: action.businessListingPlanDetails.facebookLink,
            websiteLink: action.businessListingPlanDetails.websiteLink,
            youtubeLink: action.businessListingPlanDetails.youtubeLink,
            whatsappNumber: action.businessListingPlanDetails.whatsappNumber,
            instagramLink: action.businessListingPlanDetails.instagramLink,
            twitterLink: action.businessListingPlanDetails.twitterLink,
            linkedinLink: action.businessListingPlanDetails.linkedinLink,
        }
    }),
);

