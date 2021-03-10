import { createAction, props } from '@ngrx/store';
import { LoggedInUserDetails } from './app.state';


export const updateLoggedInUserDetails = createAction(
    '[App] Update LoggedInUser Details',
    props<{loggedInUserDetails:LoggedInUserDetails}>()
)

export const initializeLoggedInUserDetails = createAction(
    '[App] Initialize LoggedInUser Details',
)

