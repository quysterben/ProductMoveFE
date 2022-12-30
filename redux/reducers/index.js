import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import modelReducer from './modelReducer';
import productReducer from './productReducer';
import userReducer from './userReducer';
import lotReducer from './lotReducer';
import storageReducer from './storageReducer';
import deliveryReducer from './deliveryReducer';
import customerReducer from './customerReducer';
import logisticsReducer from './logisticsReducer';

export default combineReducers({
    alert: alertReducer,
    auth: authReducer,
    user: userReducer,
    model: modelReducer,
    product: productReducer,
    lot: lotReducer,
    storage: storageReducer,
    delivery: deliveryReducer,
    customer: customerReducer,
    logistics: logisticsReducer,
});
