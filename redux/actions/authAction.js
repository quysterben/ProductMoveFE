import { ALERT, AUTH } from '../types';

import { postDataAPI, getDataAPI, deleteDataAPI, putDataAPI } from '../../utils/fetchData';

export const login = (data) => async (dispatch) => {
    try {
        const res = await postDataAPI('login/', data);
        localStorage.setItem('loggedIn', true);
        dispatch({
            type: AUTH,
            payload: res,
        });
        location.replace('/');
    } catch (err) {
        dispatch({
            type: ALERT,
            payload: {
                err: err,
            },
        });
    }
};

export const logout =
    ({ data }) =>
    async (dispatch) => {
        console.log('logout');
        localStorage.setItem('loggedIn', false);
        dispatch({
            type: AUTH,
            payload: {
                token: null,
                user: null,
            },
        });
        location.replace('/');
    };
