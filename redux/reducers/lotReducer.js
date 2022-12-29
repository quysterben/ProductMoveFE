import { LOT } from '../types';

const initialState = {
    lot: {},
};

const lotReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOT.GET_LOT:
            return {
                ...state,
                lot: action.payload,
            };
        case LOT.PROCEDURE_LOT:
            return {
                ...state,
                res: action.payload,
            };
        case LOT.DELIVERY_LOT:
            return action.payload;
        case LOT.RECEIVE_LOT:
            return action.payload;
        default:
            return state;
    }
};

export default lotReducer;
