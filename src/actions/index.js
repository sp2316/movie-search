//action types,used as variables instead of directly assigning as string to type
export const ADD_MOVIES = 'ADD_MOVIES';

export const ADD_TO_FAVOURITES = 'ADD_TO_FAVOURITES';

export const REMOVE_FROM_FAVOURITES ='REMOVE_FROM_FAVOURITES'

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