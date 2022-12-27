import { LOT } from '../types';

const initialState = {
    lots: [],
};

const lotReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOT.GET_LOTS:
            return {
                ...state,
                lots: action.payload,
            };
        case LOT.PROCEDURE_LOT:
            return action.payload;
        case LOT.DELIVERY_LOT:
            return action.payload;
        case LOT.RECEIVE_LOT:
            return action.payload;
        default:
            return state;
    }
};

export default lotReducer;
