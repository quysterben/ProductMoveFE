import { ALERT, STORAGE } from '../types';

import { postDataAPI, getDataAPI, deleteDataAPI, putDataAPI } from '../../utils/fetchData';
import { data } from 'autoprefixer';

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

export const createNewStorage =
    ({ url, auth, data }) =>
    async (dispatch) => {
        console.log('create new storage');
        try {
            const res = await postDataAPI(`storages/`, data, auth.token);
            dispatch({
                type: STORAGE.CREATE_NEW_STORAGE,
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
