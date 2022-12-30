import { ALERT, CUSTOMER, PRODUCT } from '../types';

import { postDataAPI, getDataAPI, deleteDataAPI, putDataAPI } from '../../utils/fetchData';

export const getAllCustomers =
    ({ auth }) =>
    async (dispatch) => {
        console.log('get all customers data');
        try {
            const res = await getDataAPI(`customers/`, auth.token);
            dispatch({
                type: CUSTOMER.GET_CUSTOMERS,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: ALERT,
                payload: {
                    error: 'Get customers data failed!',
                },
            });
        }
    };

export const createNewCustomerAndSell =
    ({ auth, data, product_id }) =>
    async (dispatch) => {
        console.log('create customer data');
        try {
            console.log(data);
            console.log(product_id);
            const res = await postDataAPI(`customers/`, data, auth.token);
            const res1 = await postDataAPI(
                `distribution/sales/`,
                { customer_id: res.data.id, product_id: product_id },
                auth.token,
            );
            dispatch({
                type: CUSTOMER.CREATE_CUSTOMER,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: ALERT,
                payload: {
                    error: 'Get create new customer data failed!',
                },
            });
        }
    };
