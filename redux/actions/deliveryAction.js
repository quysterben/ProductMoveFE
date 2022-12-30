import { ALERT, DELIVERY } from '../types';

import { postDataAPI, getDataAPI, deleteDataAPI, putDataAPI } from '../../utils/fetchData';

export const getIncomingData =
    ({ auth }) =>
    async (dispatch) => {
        console.log('get incoming data');
        try {
            const res = await getDataAPI(`logistics/inbox/`, auth.token);
            dispatch({
                type: DELIVERY.INCOMING,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: ALERT,
                payload: {
                    error: 'Get incoming data failed!',
                },
            });
        }
    };

export const getDeliveringData =
    ({ auth }) =>
    async (dispatch) => {
        console.log('get delivering data');
        try {
            const res = await getDataAPI(`logistics/sent/`, auth.token);
            // const temp = []
            // for (let i = 0; i < res.data.length; i++) {
            //     const res1 = await getDataAPI(`logistics/${res.data[i].id}`, auth.token);
            //     console.log(i);
            //     console.log(res1);
            // }
            dispatch({
                type: DELIVERY.DELIVERING,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: ALERT,
                payload: {
                    error: 'Get delivering data failed!',
                },
            });
        }
    };
