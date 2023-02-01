import React from 'react';
// import { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
// import movies from './reducers';
import rootReducer from "./reducers"
import { Provider } from 'react-redux';

//middleware
// const logger= function({dispatch,getState}){
//   return function(next){
//     return function(action){
//       //middleware
//       console.log('ACTION_TYPE', action.type);

//       next(action);
//     }
//   }
// }

const logger= ({dispatch,getState})=>(next)=> (action)=>{
  if(typeof action !== "function"){
    console.log("Action Type",action.type);
  }
  next(action);
}

// const thunk= ({dispatch,getState})=>(next)=> (action)=>{
//   if(typeof  action === "function"){
//     action(dispatch);
//     return ;
//   }
//   next(action);
// }



const store= createStore(rootReducer, applyMiddleware(logger,thunk));

console.log("state", store.getState());


//...........WE WOULD HAVE USED THESE STORE CONTEXT, CLASS "PROVIDER", CONNECTED_COMPONENT FUNCTION, IF WE HAD NOT USED "PROVIDER" FROM "REACT-REDUX"..........
// export const StoreContext = createContext();

// console.log("storeContex", StoreContext);

// class Provider extends React.Component{
//   render(){
//     const {store} = this.props;

//     return (
//       <StoreContext.Provider value={store}>
//       {this.props.children}
//     </StoreContext.Provider>
//     );
//   }
// }
// console.log(store);
// console.log("BEFORE STATE", store.getState());


// store.dispatch({
//   type:"ADD_MOVIE",
//   movies: [{name: "lehanga me AC"}],
// });

// console.log("after store", store.getState());



// const connectedComponent = connect(callback)(App);
// export function connect(callback) {
//   return function (Component) {
//     class ConnectedComponent extends React.Component {
//       constructor(props) {
//         super(props);
//         this.unsubscribe = this.props.store.subscribe(() => {
//           this.forceUpdate();
//         });
//       }

//       componentWillUnmount() {
//         this.unsubscribe();
//       }
//       render() {
//         const { store } = this.props;
//         const state = store.getState();
//         const dataToBeSentAsProps = callback(state);

//         return <Component dispatch={store.dispatch} {...dataToBeSentAsProps} />;
//       }
//     }

//     class ConnectedComponentWrapper extends React.Component {
//       render() {
//         return (
//           <StoreContext.Consumer>
//             {(store) => {
//               return <ConnectedComponent store={store} />;
//             }}
//           </StoreContext.Consumer>
//         );
//       }
//     }
//     return ConnectedComponentWrapper;
//   };
// }


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App  />
    </Provider>
  </React.StrictMode>
);

