import { createReducer, on, createAction, createFeatureSelector, createSelector } from '@ngrx/store';
import { LoggedInUserDetails } from './app.state';
import * as AppActions from './app.actions'



export interface State {
    
    loggedInUserDetails: LoggedInUserDetails,
    
}

const initialLoggedInUserDetails: LoggedInUserDetails = {
    userId: 'userId',
    name: 'name',
    profilePic:'profilePic',
    email:'email',
    mobile:'mobile',
    mediaId:'mediaId'
}




const initialState: State = {
    loggedInUserDetails:initialLoggedInUserDetails,
}

const getAppFeatureState = createFeatureSelector<State>('appState')

export const getLoggedInUserDetails = createSelector(
    getAppFeatureState,
    state => state.loggedInUserDetails
);
export const getAppState = createSelector(
    getAppFeatureState,
    state => state
);

export const appReducer = createReducer<State>(
    initialState,
    on(AppActions.updateLoggedInUserDetails, (state, action): State => {
        return {
            ...state,
            loggedInUserDetails: action.loggedInUserDetails
        }
    }),
    on(AppActions.initializeLoggedInUserDetails, (state): State => {
        return {
            ...state,
            loggedInUserDetails: initialState.loggedInUserDetails
        }
    }),
    
);