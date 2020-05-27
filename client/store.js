import { combineReducers,createStore,applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
// import loggingMiddleware from 'redux-logger';
import getData from './redux/getData';
import getRecord from './redux/getRecord';

const reducer = combineReducers({ getData,getRecord });
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(
        thunkMiddleware,
        // loggingMiddleware
    ))
);

export default store;