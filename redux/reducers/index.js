import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import modelReducer from './modelReducer';
import productReducer from './productReducer';
import userReducer from './userReducer';
import lotReducer from './lotReducer';

export default combineReducers({
    alert: alertReducer,
    auth: authReducer,
    user: userReducer,
    model: modelReducer,
    product: productReducer,
    lot: lotReducer,
});
