//action types,used as variables instead of directly assigning as string to type
export const ADD_MOVIES = 'ADD_MOVIES';

export const ADD_FAVOURITE = 'ADD_FAVOURITE';


//action creators
export function addMovies(movies){
    return{
        type:ADD_MOVIES,     //{---} Action
        movies:movies
    }
}

export function addFavourite(movie){
    return{
        type:ADD_FAVOURITE,     //{---} Action
        movie:movie
    }
}