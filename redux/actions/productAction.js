import { ALERT, PRODUCT } from '../types';

import { postDataAPI, getDataAPI, deleteDataAPI, putDataAPI } from '../../utils/fetchData';

export const getProductsData =
    ({ auth }) =>
    async (dispatch) => {
        console.log('get products data');
        try {
            const res = await getDataAPI(`products/`, auth.token);
            dispatch({
                type: PRODUCT.GET_PRODUCTS,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: ALERT,
                payload: {
                    error: 'Get products data failed!',
                },
            });
        }
    };

export const receiveProduct =
    ({ auth, data }) =>
    async (dispatch) => {
        try {
            const res = await postDataAPI(
                `logistics/${data.delivery_id}`,
                data.storage_id,
                auth.token,
            );
            dispatch({
                type: PRODUCT.RECEIVE_PRODUCT,
                payload: res,
            });
        } catch (err) {
            dispatch({
                type: ALERT,
                payload: {
                    error: 'Receive product data failed!',
                },
            });
        }
    };
