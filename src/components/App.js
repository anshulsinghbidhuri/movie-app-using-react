import React from "react";
// import {connect} from "react-redux";
// import { connect } from "react-redux";
import { data } from "../data";
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";
import { addMovies, setShowFavourite } from "../actions";
// import { StoreContext } from "..";

//..........we would have used connect form "../index" if we have not used react-redux libarary
// import { connect } from "..";

import {connect} from "react-redux";


class App extends React.Component {
 
  componentDidMount(){
    // const {store}= this.props;

    // store.subscribe(()=>{
    //   console.log("UPDATED");
    //   this.forceUpdate();
    // });
    //making api call
    //dispatching
    // store.dispatch({
    //   type:"ADD_MOVIE",
    //   movies: data,    
    // })
    this.props.dispatch(addMovies(data));

    // console.log("STATE",store.getState())
  }
    
  isMovieFavourite = (movie)=>{
    // const {movies}= this.props.store.getState();
    const {movies} =this.props;
    const index = movies.favourite.indexOf(movie);
    // const {favourite}= this.props.store.getState();

    // const index = favourite.indexOf(movie);

    if(index !== -1){
      return true;
    }

    return false;
  }
  onChangeTab = (val) =>{
    this.props.dispatch(setShowFavourite(val));
  }
  render(){
    // const {movies,search} = this.props.store.getState();// as it has the object as Movies, and search
        //we need to give only this.props as we have not passed whole store too app component

        const {movies, search} = this.props;
        console.log("movies", movies);

    // const {list,favourite,showFavourite}= this.props.store.getState(); // as it has object of list and favourite , {list:[], favourite:[]}
    const {list,favourite = [],showFavourite =[]}= movies; // as movies has objects as list , favourites and setShowfab;
    const displayMovies= showFavourite ? favourite: list;
    // console.log("REnder", this.props.store.getState());
    return (
      <div className="App">
        <Navbar  search={search} />
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourite ? "": "active-tabs"}`} onClick={()=>this.onChangeTab(false)} >Movies</div>
            <div className={`tab ${showFavourite ? "active-tabs": "" }`} onClick={()=>this.onChangeTab(true)} >Favourites</div>
          </div>
  
          <div className="list">
          {displayMovies.map((movie, index) => (
            <MovieCard 
            movie={movie} 
            key={`movies-${index}`}
            isFavourite={this.isMovieFavourite(movie)}
            dispatch={this.props.dispatch}
             />
          ))}
          {displayMovies.length ===0 ? <div className="no-movies">No Movies To Display!!</div> : null}
        </div>
        </div>
  
      
      </div>
    );
  }
}

// class AppWrapper extends React.Component{
//   render(){
//     return(
//       <StoreContext.Consumer>
//         {(store)=>
//           <App store={store} />
//         }
//       </StoreContext.Consumer>
//     );
//   }
// }

function mapStateToProps(state){
  return {
    movies: state.movies,
    search: state.search
  }
}

const connectedAppComponent= connect(mapStateToProps)(App);


export default connectedAppComponent;
