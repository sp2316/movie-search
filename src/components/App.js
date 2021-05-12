import React from 'react';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies, setShowFavourites} from '../actions'
import {StoreContext} from '../index';

class App extends React.Component {

  componentDidMount(){
      //make api call
      //dispatch action
      const {store}=this.props;
      store.subscribe(()=>{
        console.log('UPDATED')
        this.forceUpdate();
      })
      store.dispatch(addMovies(data));

      console.log('STATE',this.props.store.getState())

  }

  isMovieFavourite=(movie)=>{

    const {movies}=this.props.store.getState();

    const index= movies.favourites.indexOf(movie);

    if(index !== -1){
      return true; //Found the movie
    }
    return false;

  }

 onChangeTab =(val) =>{
        
  this.props.store.dispatch(setShowFavourites(val))


 }
  render(){
    const {movies,search}=this.props.store.getState();//{movies:{},search:{}}
    const { list,favourites,showFavourites }=movies; 

    console.log('RENDER',this.props.store.getState());

    const displayMovies =showFavourites? favourites : list ;
    
    return (
      //we can place the consumer method here also but we wont be able to access the store outside our render i.e in CDM or CDU() calls,
      //so we use wrapper so that all the methods can make use of store 
        <div className="App">
            <Navbar 
             dispatch={this.props.store.dispatch}
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
                dispatch={this.props.store.dispatch}
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
class AppWrapper extends React.Component{
  render(){
    return(
    <StoreContext.Consumer>
      {
        (store)=><App store={store}/>
      }
    </StoreContext.Consumer>
    );
  }
}

export default AppWrapper;
