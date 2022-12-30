import { LOGISTICS } from '../types';

const initialState = {
    products: [],
};

const logisticsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGISTICS.GET_LOGISTICS:
            return {
                ...state,
                products: action.payload,
            };
        default:
            return state;
    }
};

export default logisticsReducer;