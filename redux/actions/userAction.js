import { ALERT, USER } from '../types';

import { postDataAPI, getDataAPI, deleteDataAPI, putDataAPI } from '../../utils/fetchData';

export const getAllUsers =
    ({ url, auth }) =>
    async (dispatch) => {
        console.log('Get All Users');
        try {
            const res = await getDataAPI(`users/`);
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
