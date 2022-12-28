import { ALERT, STORAGE } from '../types';

import { postDataAPI, getDataAPI, deleteDataAPI, putDataAPI } from '../../utils/fetchData';

export const getAllStorages =
    ({ url, auth }) =>
    async (dispatch) => {
        console.log('Get all storages');
        try {
            const res = await getDataAPI(`storages/`, auth.token);
            dispatch({
                type: STORAGE.GET_STORAGES,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: ALERT,
                payload: {
                    error: 'Get all storages failed',
                },
            });
        }
    };
