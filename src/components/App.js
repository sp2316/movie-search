import React from 'react';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies, setShowFavourites} from '../actions'
import {connect} from 'react-redux';

class App extends React.Component {

  componentDidMount(){
      
      this.props.dispatch(addMovies(data));

  }

  isMovieFavourite=(movie)=>{

    const {movies}=this.props;

    const index= movies.favourites.indexOf(movie);

    if(index !== -1){
      return true; //Found the movie
    }
    return false;

  }

 onChangeTab =(val) =>{
        
  this.props.dispatch(setShowFavourites(val))


 }
  render(){
    const {movies,search}=this.props;//{movies:{},search:{}}
    const { list,favourites,showFavourites }=movies; 


    const displayMovies =showFavourites? favourites : list ;
    
    return (
      //we can place the consumer method here also but we wont be able to access the store outside our render i.e in CDM or CDU() calls,
      //so we use wrapper so that all the methods can make use of store 
        <div className="App">
            <Navbar 
             search={search}
            />
          <div className="main">

            <div className="tabs">
                <div className={`tab ${showFavourites?'':'active-tabs'}`} onClick={()=>this.onChangeTab(false)}>Movies </div>
                <div className={`tab ${showFavourites?'active-tabs':''}`} onClick={()=>this.onChangeTab(true)}>Favourites</div>
            </div>

            <div className="list">
              {displayMovies.map((movie,index) => (
                <MovieCard 
                movie={movie} 
                key={`movies-${index}`} 
                dispatch={this.props.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
                 />
              ))}

            </div>
            {displayMovies.length === 0?<div className="no-movies">No movies to display!</div>:null}
          </div>
        </div>
        );
}
}

//wrapper
// class AppWrapper extends React.Component{
//   render(){
//     return(
//     <StoreContext.Consumer>
//       {
//         (store)=><App store={store}/>
//       }
//     </StoreContext.Consumer>
//     );
//   }
// }

//mapping redux state to props for the app component
function mapStateToProps(state){
  return{
    movies:state.movies,
    search:state.search
  }
}

const connectedAppComponent =connect(mapStateToProps)(App);//the properties mentioned above will be coming as props to app component


export default connectedAppComponent;
