import { USER } from '../types';

const initialState = {
    users: [],
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER.GET_USERS:
            return {
                ...state,
                users: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
