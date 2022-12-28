import { ALERT, LOT } from '../types';

import { postDataAPI, getDataAPI, deleteDataAPI, putDataAPI } from '../../utils/fetchData';

export const getLotData =
    ({ url, auth, data }) =>
    async (dispatch) => {
        console.log('getLotData');
        try {
            const res = await getDataAPI(`lots/${data}`, auth.token);
            dispatch({
                type: LOT.GET_LOT,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: ALERT,
                payload: {
                    error: 'Get lot data failed!',
                },
            });
        }
    };

export const procedureLot =
    ({ url, auth, data }) =>
    async (dispatch) => {
        console.log('procedureLot');
        try {
            const res = await postDataAPI(`products/`, data, auth.token);
            dispatch({
                type: LOT.PROCEDURE_LOT,
                payload: res,
            });
        } catch (err) {
            dispatch({
                type: ALERT,
                payload: {
                    error: 'Procedure lot failed!',
                },
            });
        }
    };

export const deliveryLot =
    ({ url, auth, data }) =>
    async (dispatch) => {
        console.log('deliveryLot');
        try {
            const res = await postDataAPI(`logistics/`, data, auth.token);
            dispatch({
                type: LOT.DELIVERY_LOT,
                payload: res,
            });
        } catch (err) {
            dispatch({
                type: ALERT,
                payload: {
                    error: 'Delivery lot failed!',
                },
            });
        }
    };

//chua xong
export const receiveLot =
    ({ url, auth, data }) =>
    async (dispatch) => {
        console.log('receiveLot');
        try {
        } catch (err) {
            dispatch({
                type: ALERT,
                payload: {
                    error: 'Receive lot failed!',
                },
            });
        }
    };
