//action types,used as variables instead of directly assigning as string to type
export const ADD_MOVIES = 'ADD_MOVIES';

export const ADD_TO_FAVOURITES = 'ADD_TO_FAVOURITES';

export const REMOVE_FROM_FAVOURITES ='REMOVE_FROM_FAVOURITES'

export const SET_SHOW_FAVOURITES ='SET_SHOW_FAVOURITES';

export const ADD_MOVIE_TO_LIST ='ADD_MOVIE_TO_LIST';

export const ADD_SEARCH_RESULT="ADD_SEARCH_RESULT";

//action creators
export function addMovies(movies){
    return{
        type:ADD_MOVIES,     //{---} Action
        movies:movies
    }
}

export function addToFavourites(movie){
    return{
        type:ADD_TO_FAVOURITES,     //{---} Action
        movie:movie
    }
}

export function removeFromFavourites(movie){
    return{
        type:REMOVE_FROM_FAVOURITES,     //{---} Action
        movie:movie
    }
}

export function setShowFavourites(val){
    return{
        type: SET_SHOW_FAVOURITES,     //{---} Action
        val:val // or simply val as both key and value are same
    }
}

export function addMovieToList(movie){
    return{
        type:ADD_MOVIE_TO_LIST,
        movie
    }
}
//responsible for fetching data from server
//async action
export function handleMovieSearch(movie){

    const url=`http://www.omdbapi.com/?apikey=2614370f&t=${movie}`; //returns one movie only

    return function(dispatch){
    fetch(url)
        .then(response => response.json())
        .then(movie => {
            console.log(movie);
            //dispatch an action
            dispatch(addMovieSearchResult(movie));
        });

    }

}

export function addMovieSearchResult(movie){
    return{
        type: ADD_SEARCH_RESULT,
        movie
    };
}