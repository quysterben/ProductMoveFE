import { PRODUCT } from '../types';

const initialState = {
    products: [],
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT.GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };
        case PRODUCT.SELL_PRODUCT:
            return action.payload;
        default:
            return state;
    }
};

export default productReducer;
