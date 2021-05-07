import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware} from 'redux';

import './index.css';
import App from './components/App'
import rootReducer from './reducers'
// import haha from './reducers' check by using thus in createStore()

//curried form of function logger(obj,next,action)
//  [[ [logger(obj)] (next)](action)]
const logger = function({dispatch,getState}){
    return function(next){
      return function(action){
        //middleware code
        console.log('ACTION_TYPE',action.type)
        next(action);
      }
    }

}


const store=createStore(rootReducer,applyMiddleware(logger)); //no matter what reducer you call, the combineReducers() is only called here




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


