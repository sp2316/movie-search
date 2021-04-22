export default function movies(state=[],action){  //current state of store
    
    if(action.type === 'ADD_MOVIES'){
        return action.movies; //return new state..dont append it to the original state
    }
    return state; //if no defined action,return the unmodified original state

}