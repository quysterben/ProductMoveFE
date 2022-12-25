import { AUTH } from '../types';

// Ban điều hành : excutive
// Cơ sở sản xuất : production
// Đại lý : distribution
// Bảo hành : warranty

const initialState = {
    loggedIn: true,
    email: 'quysterben@gmail.com',
    name: 'Sterben',
    role: 'excutive',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default authReducer;
