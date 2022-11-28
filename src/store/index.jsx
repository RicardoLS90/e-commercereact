import { configureStore } from '@reduxjs/toolkit'
import isLoadingSlice from './slices/isLoadingSlice'
import productsListSlice from './slices/productsList.slice'

export default configureStore({
    reducer: {
      productsList: productsListSlice,
      isloading: isLoadingSlice
    }
})
