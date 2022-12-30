import { STORAGE } from '../types';

const initialState = {
    storages: [],
};

const storageReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORAGE.GET_STORAGES:
            return {
                ...state,
                storages: action.payload,
            };
        case STORAGE.CREATE_NEW_STORAGE:
            return {
                ...state,
                res: action.payload,
            };
        default:
            return state;
    }
};

export default storageReducer;
