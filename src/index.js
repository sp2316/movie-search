import React, { createContext } from 'react';
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

class Provider extends React.Component{
  render(){
  const {store}=this.props;
  return <StoreContext.Provider value ={store}> 
            {this.props.children}
          </StoreContext.Provider>

  }
}

const store=createStore(rootReducer,applyMiddleware(logger,thunk)); //no matter what reducer you call, the combineReducers() is only called here


export const StoreContext=createContext();


ReactDOM.render(
  <Provider store={store}>
      <App store={store}/>
  </Provider>,
  document.getElementById('root')
);


