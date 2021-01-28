import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { ProductDetailsReducer, productListReducer } from '../reducers/productReducer';
import { cartReducer } from '../reducers/cartReducer';
import { userSigninReducer } from '../reducers/userReducer';


const initialState = {
    //set userInfo to what stored in localStorage
    userSignin: {
        userInfo: localStorage.getItem('userInfo') 
            ? JSON.parse(localStorage.getItem('userInfo')) 
            : null
    },
    // set cart initial value to localStorage if exists 
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
    }
};

// all reducers  
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: ProductDetailsReducer,
    cart:cartReducer,
    userSignin: userSigninReducer
});

//https://extension.remotedev.io/#usage
//https://redux.js.org/api/compose
//connect to chrome redux developer extension (download the extension first in Chrome)
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
);

export default store;