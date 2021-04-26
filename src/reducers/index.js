import {ADD_MOVIES,ADD_FAVOURITE} from '../actions';

const initialMoviesState={
    list:[],
    favourites:[]
}

export default function movies(state=initialMoviesState,action){  //current state of store
    
     //return new state..dont append it to the original state
    //if no defined action,return the unmodified original state

    switch(action.type){
        case ADD_MOVIES:
            return {
                ...state,
                list:action.movies
            }
        case ADD_FAVOURITE:
            return{
                ...state,
                favourites:[action.movie,...state.favourites]  //adding movie at the first index and spread rest of the movies which are already present in the favourites array
            }
        default:
                return state;

    }
}
