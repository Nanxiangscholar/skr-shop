import {
    legacy_createStore as createStore,
    applyMiddleware, 
    combineReducers
} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
// 引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk';

import shopcarReducer from './reducers/shopCarReducer';
import userReducer from './reducers/userReducers';

// 3.汇总所有的reducer变为一个总的reducer
const allReducer = combineReducers({
    shopCar:shopcarReducer,
    user:userReducer
});

// 4.暴露store
export default createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)));