import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoadingSlice';
import getConfig from '../../Utils/getConfig';

export const sideBarSlice = createSlice({
    name: 'sidebar',
    initialState: [],
    reducers: {
      setSideBar: (state,action)=> {
        return action.payload
      }
    }
})

export const getsideBarThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://e-commerce-api.academlo.tech/api/v1/cart',getConfig())
        .then((res) => dispatch(setSideBar(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const createPurchasesThunk = (addProducts) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios.post('https://e-commerce-api.academlo.tech/api/v1/cart', addProducts, getConfig())
    .then((res) => dispatch(getsideBarThunk()))
    .finally(() => dispatch(setIsLoading(false)));
}

export const checkOutThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios.post('https://e-commerce-api.academlo.tech/api/v1/purchases', {}, getConfig())
    .then((res) => dispatch(setSideBar([])))
    .finally(() => dispatch(setIsLoading(false)));
}


export const { setSideBar } = sideBarSlice.actions;

export default sideBarSlice.reducer;
