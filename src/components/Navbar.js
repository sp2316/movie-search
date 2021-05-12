import React from 'react';
import {addMovieToList,handleMovieSearch} from '../actions'
import {connect} from 'react-redux';

class Navbar extends React.Component {

    constructor(props){
        super(props);
        this.state={
            searchText:''
        }
    }

    handleAddToMovies = (movie)=>{
        this.props.dispatch(addMovieToList(movie));

    }

    handleSearch = () =>{
        const {searchText} = this.state;

        this.props.dispatch(handleMovieSearch(searchText));
    }

    handleChange= (event) =>{
       
        this.setState({
            searchText:event.target.value
        });
    }

    render(){
        //renaming the destructured obj can be done using :
        const {result:movie,showSearchResults}=this.props.search;
        return (
        <div className="nav">
            <div className="search-container">
                <input onChange={this.handleChange}/>
                <button id="search-btn" onClick={this.handleSearch}>Search</button>

                {showSearchResults && (movie.Title===undefined? 
                <div className="search-results">
                 No movies found..!
                </div>
                 :
                 <div className="search-results">
                    <div className="search-result">
                    <img src={movie.Poster} alt="search-pic"/>
                    
                    <div className="movie-info">
                        <span>{movie.Title}</span>
                        <button onClick={()=>this.handleAddToMovies(movie)}>
                            Add to Movies
                        </button>
                    </div>
                
            </div>
              </div>
              
                 ) }
        </div>
        </div>
        );
}
}

// class NavbarWrapper extends React.Component{
//     render(){
//         return(
//             <StoreContext.Consumer>
//                     {/* we only need the dispatch method so we save only that method*/}
//                 {(store)=><Navbar dispatch={store.dispatch} search={this.props.search}/>}
//                     {/*we pass search from the App component..so we store it..*/}

//             </StoreContext.Consumer>
//         )
//     }
// }



//mapping redux state to props for the app component
function mapStateToProps(state){
    return{
      search:state.search
    }
  }
  
  const connectedNavbarComponent =connect(mapStateToProps)(Navbar);//the properties mentioned above will be coming as props to Navbar component
  

export default connectedNavbarComponent;
