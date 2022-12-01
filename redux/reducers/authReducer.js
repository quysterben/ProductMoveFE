import { AUTH } from '../type';

const initialState = {
    email: 'quysterben@gmail.com',
    name: 'Sterben',
    role: 4,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default authReducer;
