import { ALERT, LOGISTICS } from "../types";

import { postDataAPI, getDataAPI, deleteDataAPI, putDataAPI } from '../../utils/fetchData';

export const getLogistic = 
    ({url, auth, data}) => 
    async (dispatch) => {
        console.log(`Get logistics number ${data}`)
        try {
            const res = await getDataAPI(`logistics/${data}`, auth.token);
            dispatch({
                type: LOGISTICS.GET_LOGISTICS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: ALERT,
                payload: {
                    error: 'Get all logistics failed'
                }
            })
        }
}