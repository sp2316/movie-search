import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './components/App'
import rootReducer from './reducers'
// import haha from './reducers' check by using thus in createStore()

//curried form of function logger(obj,next,action) ... 
// Redux calls middleware with the obj..obj contains dispatch, getState and other properties and we use destructuring to get only those two properties..
//  Redux calls as logger(obj)(next_reference)(action)


/*
const logger = function({dispatch,getState}){
    return function(next){
      return function(action){
        //middleware code
        console.log('ACTION_TYPE',action.type)
        next(action);
      }
    }

}
*/
//second way to write reducers
const logger=({dispatch,getState})=>(next)=>(action)=>{
  //logger code
  if(typeof(action) !== 'function'){
    console.log('ACTION_TYPE',action.type)
  }
  next(action);
}

//the package redux-thunk does the following 

// const thunk =({dispatch,getState}) => (next) => (action)=>{
//   if(typeof(action) === 'function'){
//     action(dispatch);
//     return;
//   }
//   next(action);
// }

const store=createStore(rootReducer,applyMiddleware(logger,thunk)); //no matter what reducer you call, the combineReducers() is only called here




//console.log('store',store);
//console.log('BEFORE STATE',store.getState());

// store.dispatch({
//   type:'ADD_MOVIES',
//   movies:[{name:'Superman'}]
// });

//console.log('AFTER STATE',store.getState());


ReactDOM.render(
  <React.StrictMode>
    <App store={store}/>
  </React.StrictMode>,
  document.getElementById('root')
);


