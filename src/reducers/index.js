
import { ADD_FAVOURITE, ADD_MOVIE,ADD_SEARCH_RESULT,REMOVE_FAVOURITE, SHOW_FAVOURITE,ADD_MOVIE_TO_LIST } from "../actions";
import { combineReducers } from "redux";


//for making the initial state as object of list and favorite

const initialMovieState= {
    list:[],
    favourite:[],
    showFavourite: false,
}

export  function movies(state= initialMovieState, action){
    if(action.type === ADD_MOVIE){
        // return action.movies;
        return {
            ...state,
            list: action.movies
        }
    }

    if(action.type === ADD_FAVOURITE){
        return {
            ...state,
            favourite:[action.movie, ...state.favourite]
        }
    }

    if(action.type === REMOVE_FAVOURITE){
        const filterArr= state.favourite.filter(
            movie=> movie.Title !== action.movie.Title
        );

        return {
            ...state,
            favourite:filterArr
        }
    }

    if(action.type === SHOW_FAVOURITE){
        return {
            ...state,
            showFavourite:action.val,
        }
    }

    if(action.type === ADD_MOVIE_TO_LIST){
        return{
            ...state,
            list: [action.movie, ...state.list],
        }
    }

    return state;
}

const initialSearchState= {
    result:{},
    showSearchResults: false,
};

export function search(state= initialSearchState,action){
    // return state;

    // ADD_SEARCH_RESULT

    switch(action.type){
        case ADD_SEARCH_RESULT:
            return {
                    ...state,
                    result: action.movie,
                    showSearchResults: true
            }

            case ADD_MOVIE_TO_LIST:
                return{
                    ...state,
                //    state.movies.list : [action.movie,...state.list],
                    showSearchResults: false,
                }
            default: return state;

    }
}

// const initialRootState={
//     movies: initialMovieState,
//     search: initialSearchState
// }
// // export default function rootReducer(state= initialRootState,action){
//     return {
//         movies: movies(state.movies, action),
//         search: search(state.search,action)
//     }
// }
export default combineReducers({
    movies,
    search
})


