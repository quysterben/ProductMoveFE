import { ALERT, USER } from '../types';

import { postDataAPI, getDataAPI, deleteDataAPI, putDataAPI } from '../../utils/fetchData';

export const getAllUsers =
    ({ url, auth }) =>
    async (dispatch) => {
        console.log('Get All Users');
        try {
            const res = await getDataAPI(`users/`, auth.token);
            dispatch({
                type: USER.GET_USERS,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: ALERT,
                payload: {
                    error: 'Get all users failed!',
                },
            });
        }
    };

export const createUser =
    ({ data, auth }) =>
    async (dispatch) => {
        console.log('create user');
        try {
            const res = await postDataAPI(`users/`, data, auth.token);
            console.log(res);
            dispatch({
                type: USER.ADD_USER,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: ALERT,
                payload: {
                    error: 'Create user failed!',
                },
            });
        }
    };
