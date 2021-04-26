import {ADD_MOVIES} from '../actions';

const initialMoviesState={
    list:[],
    favourites:[]
}

export default function movies(state=initialMoviesState,action){  //current state of store
    
    if(action.type === ADD_MOVIES){
        return {
            ...state,
            list:action.movies
        } //return new state..dont append it to the original state
    }
    return state; //if no defined action,return the unmodified original state

}
