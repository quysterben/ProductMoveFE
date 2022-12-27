import { MODEL } from "../types";

const initialState = {
    models: [],
};

const modelReducer = (state = initialState, action) => {
    switch(action.type) {
        case MODEL.GET_MODELS:
            return {
                ...state,
                models: action.payload,
            };
        default:
            return state
    }
}

export default modelReducer