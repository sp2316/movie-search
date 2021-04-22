//action types,used as variables instead of directly assigning as string to type
export const ADD_MOVIES = 'ADD_MOVIES';

//action creators
export function addMovies(movies){
    return{
        type:ADD_MOVIES,     //{---} Action
        movies:movies
    }
}