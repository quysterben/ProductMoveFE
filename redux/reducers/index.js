import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import modelReducer from './modelReducer';
import userReducer from './userReducer';

export default combineReducers({
    alert: alertReducer,
    auth: authReducer,
    user: userReducer,
    model: modelReducer
});
