import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoadingSlice';

export const producstListSlice = createSlice({
    name: 'ProductsList',
    initialState: [],
    reducers: {
      setProducts: (state,action) => {
        return action.payload
      }
    }
})

export const getProductsThunk=()=>dispatch =>{
  dispatch(setIsLoading(true))
  axios.get('https://e-commerce-api.academlo.tech/api/v1/products')
    .then(res=>dispatch(setProducts(res.data.data.products)))
    .finally(()=>dispatch(setIsLoading(false)))
}

export const filtercategorythun = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://e-commerce-api.academlo.tech/api/v1/products?category=${id}`)
        .then((res) => dispatch(setProducts(res.data.data.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const inputFilterThunk = (inputSearch) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://e-commerce-api.academlo.tech/api/v1/products?query=${inputSearch}`)
        .then((res) => dispatch(setProducts(res.data.data.products)))
        .finally(() => dispatch(setIsLoading(false)));
}


export const { setProducts } = producstListSlice.actions;

export default producstListSlice.reducer;
