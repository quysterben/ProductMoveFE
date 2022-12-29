import { DELIVERY } from '../types';

const initialState = {
    incoming: [],
    delivering: [],
};

const deliveryReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELIVERY.INCOMING:
            return {
                ...state,
                incoming: action.payload,
            };
        case DELIVERY.DELIVERING:
            return {
                ...state,
                delivering: action.payload,
            };
        default:
            return state;
    }
};

export default deliveryReducer;
