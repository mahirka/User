import { createAction, props } from '@ngrx/store';
import { BusinessListingBasicDetails, BusinessListingPlan, BusinessListingPlanDetails } from './business-listing.store';

export const changeBusinessListingStep = createAction(
    '[BusinessListing] Change BusinessListing Step',
    props<{businessListingStep:string}>()
)

export const saveBusinessListingBasicDetails = createAction(
    '[BusinessListing] save BusinessListingBasicDetails',
    props<{businessListingBasicDetails:BusinessListingBasicDetails}>()
)

export const saveBusinessListingPlan = createAction(
    '[BusinessListing] Save BusinessListingPlan',
    props<{businessListingPlan:BusinessListingPlan}>()
    
)

export const saveBusinessListingPlanDetails = createAction(
    '[BusinessListing] Save BusinessListingPlanDetails',
    props<{businessListingPlanDetails:BusinessListingPlanDetails}>()
    
)


