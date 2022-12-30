import { CUSTOMER } from '../types';

const initialState = {
    customers: [],
};

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case CUSTOMER.GET_CUSTOMERS:
            return {
                ...state,
                customers: action.payload,
            };
        case CUSTOMER.CREATE_CUSTOMER:
            return {
                ...state,
                res: action.payload,
            };
        default:
            return state;
    }
};

export default customerReducer;
