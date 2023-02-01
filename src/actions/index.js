export const ADD_MOVIE= "ADD-MOVIE";
export const ADD_FAVOURITE="ADD-FAVOURITE";
export const REMOVE_FAVOURITE="REMOVE_FAVOURITE";
export const SHOW_FAVOURITE= "SHOW_FAVOURITE";
export const ADD_SEARCH_RESULT= "ADD_SEARCH_RESULT";
export const ADD_MOVIE_TO_LIST = "ADD_MOVIE_TO_LIST";


export function addMovies(movies){
    return { 
        type: ADD_MOVIE,
        movies: movies
    }
}

export function addfavourite(movie){
    return {
        type: ADD_FAVOURITE,
        movie: movie,
    }
}

export function removefavourite(movie){
    return {
        type: REMOVE_FAVOURITE,
        movie: movie,
    }
}

export function setShowFavourite(val){
    return {
        type: SHOW_FAVOURITE,
        val: val,
    }
}

export function addMovieToList(movie){
    return{
        type: ADD_MOVIE_TO_LIST,
        movie: movie,
    };
}

export function handleMovieSearch(movie){
    const url =  `https://www.omdbapi.com/?apikey=3ca5df7&t=${movie}`;

   return function (dispatch){
    fetch(url)
    .then(response=>response.json())
    .then(movie => {
        console.log("movie", movie);

        //dispatch an action
        // dispatch({type: "ADD_SEARCH_RESULTS", movie})
        dispatch(addMovieSearchResult(movie))
    })
   }
}

export function addMovieSearchResult(movie){
    return {
        type: ADD_SEARCH_RESULT,
        movie:movie,
    }
}