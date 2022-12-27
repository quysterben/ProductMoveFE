import { ALERT, MODEL } from '../types';

import { postDataAPI, getDataAPI, deleteDataAPI, putDataAPI } from '../../utils/fetchData';

export const getAllModels = 
    ({url, auth}) => 
    async (dispatch) => {
    console.log('Get all Models')
    try {
        const res = await getDataAPI(`products/models/`, auth.token);
        dispatch({
            type: MODEL.GET_MODELS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ALERT,
            payload: {
                error: 'Get all models failed'
            }
        })
    }
}

export const createModel = ({data, auth}) => async (dispatch) => {
    console.log('create Models')
    try {
        const res = await postDataAPI(`products/models/`, data, auth.token);
        console.log(res)
        dispatch({
            type: USER.ADD_MODEL,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ALERT,
            payload: {
                error: 'Create model failed'
            }
        })
    }
}

