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

export const sellProduct =
    ({ auth, data }) =>
    async (dispatch) => {
        try {
            const res = await postDataAPI(`distribution/sales/`, data, auth.token);
            dispatch({
                type: PRODUCT.SELL_PRODUCT,
                payload: res,
            });
        } catch (err) {
            dispatch({
                type: ALERT,
                payload: {
                    error: 'Sell product data failed!',
                },
            });
        }
    };

export const getSelledProducts =
    ({ auth, data }) =>
    async (dispatch) => {
        try {
            const res = await getDataAPI(`distribution/sales/`, auth.token);
            dispatch({
                type: PRODUCT.GET_SELLED_PRODUCT,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: ALERT,
                payload: {
                    error: 'Sell product data failed!',
                },
            });
        }
    };

export const recallErrorProduct =
    ({ auth, data }) =>
    async (dispatch) => {
        try {
            const res = await postDataAPI(`distribution/receive/`, data, auth.token);
            dispatch({
                type: PRODUCT.RECALL_ERROR_PRODUCT,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: ALERT,
                payload: {
                    error: 'recall product data failed!',
                },
            });
        }
    };

export const returnProductToCustomer =
    ({ auth, data }) =>
    async (dispatch) => {
        try {
            const res = await postDataAPI(`distribution/return-customer`, data, auth.token);
            dispatch({
                type: PRODUCT.RETURN_CUSTOMER,
                payload: res,
            });
        } catch (err) {
            dispatch({
                type: ALERT,
                payload: {
                    error: 'return product failed!',
                },
            });
        }
    };
