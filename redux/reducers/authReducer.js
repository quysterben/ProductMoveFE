import { AUTH } from '../types';

// Ban điều hành : excutive
// Cơ sở sản xuất : production
// Đại lý : distribution
// Bảo hành : warranty

const initialState = {
    token: null,
    user: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH:
            return action.payload;
        default:
            return state;
    }
};

export default authReducer;
