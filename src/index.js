import React from 'react';
import {Provider} from 'react-redux';
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

// class Provider extends React.Component{
//   render(){
//   const {store}=this.props;
//   return <StoreContext.Provider value ={store}> 
//             {this.props.children}
//           </StoreContext.Provider>

//   }
// }

const store=createStore(rootReducer,applyMiddleware(logger,thunk)); //no matter what reducer you call, the combineReducers() is only called here

//this is how we create context manually
// export const StoreContext=createContext();

//this is how connect works manually
//const connectedAppComponent = connect(callback)(App)

// export function connect(callback){

//     return function(Component){

//        class ConnectedComponent extends React.Component{

//           constructor(props){
//             super(props);
//             this.unsubscribe =this.props.store.subscribe(() => this.forceUpdate());
//           }

//           componentWillUnmount(){
//             this.unsubscribe();
//           }

//           render(){
//                   const {store}=this.props;
//                   const state=store.getState();
//                   const dataToBePassedAsProps = callback(state);
//                   return (
//                   <Component 
//                   {...dataToBePassedAsProps} //spread will do something like this-> movies={movies} search={search}
//                   dispatch={store.dispatch} //passing dispatch by default
//                   />
//                   );
//                 }
              
//           }
    
      

//         class ConnectedComponentWrapper extends React.Component{
//           render(){
//             return(
//             <StoreContext.Consumer>
//               {store => <ConnectedComponent store={store}/>}
//             </StoreContext.Consumer>
//             );
//           }
//         };

//         return ConnectedComponentWrapper;
//     }

// }


ReactDOM.render(
  <Provider store={store}> //provider from the package
      <App store={store}/>
  </Provider>,
  document.getElementById('root')
);


