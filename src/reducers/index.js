import {combineReducers} from 'redux';

import {ADD_MOVIES,
        ADD_TO_FAVOURITES,
        REMOVE_FROM_FAVOURITES,
        SET_SHOW_FAVOURITES,
        ADD_MOVIE_TO_LIST,
        ADD_SEARCH_RESULT} from '../actions';

//state will be undefined in the beginning,so we use default parameters
const initialMoviesState={
    list:[],
    favourites:[],
    showFavourites:false
}

export function movies(state=initialMoviesState,action){  //current state of store
    
     //return new state..dont append it to the original state
    //if no defined action,return the unmodified original state

    switch(action.type){
        case ADD_MOVIES:
            return {
                ...state,
                list:action.movies
            }
        case ADD_TO_FAVOURITES:
            return{
                ...state,
                favourites:[action.movie,...state.favourites]  //adding movie at the first index and spread rest of the movies which are already present in the favourites array
            }
        case REMOVE_FROM_FAVOURITES:
            const filteredArray=state.favourites.filter(
                movie => movie.Title !== action.movie.Title //can also use movie !==action.movie 
            );
            return{
                ...state,
                favourites:filteredArray
            }   
         case SET_SHOW_FAVOURITES:
             return{
                 ...state,
                 showFavourites:action.val
             }    
         case ADD_MOVIE_TO_LIST:
             return {
                 ...state,
                 list:[action.movie,...state.list]
             }    
        default:
                return state;

    }
}

const initialSearchState={
    result:{},
    showSearchResults:false,
}

export function search(state=initialSearchState,action){
   
    switch(action.type){
        case  ADD_SEARCH_RESULT:
            return{
                ...state,
                result:action.movie,
                showSearchResults:true
            }
            case ADD_MOVIE_TO_LIST:
             return {
                 ...state,
                 showSearchResults:false
                
             }    
        default:
                return state;

    }

}

// const initialRootState={
//     movies:initialMoviesState,
//     search:initialSearchState
// }

// export default function rootReducer(state=initialRootState,action){ //action contains action type and the new data to be added or modified

//  return{
//      movies:movies(state.movies,action),
//      search:search(state.search,action)
//  }


// }
//same as above... redux is smart enough to call the reducers with the appropriate parameters if we just mention the property:reducer
export default combineReducers({
    movies, //or movies:movies 
    search //or search:search
})