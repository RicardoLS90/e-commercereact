import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { setIsLoading } from './isLoadingSlice';
import getConfig from '../../Utils/getConfig';

export const purchaseSlice = createSlice({
  name: 'purchases',
  initialState: [],
  reducers: {
    setPurchases: (state, action) => {
      return action.payload
    }
  }
})

export const getPurchasesThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios.get('https://e-commerce-api.academlo.tech/api/v1/purchases', getConfig())
    .then((res) => dispatch(setPurchases(res.data.data.purchases)))
    .finally(() => dispatch(setIsLoading(false)));
}


export const { setPurchases } = purchaseSlice.actions;

export default purchaseSlice.reducer;
