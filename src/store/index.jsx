import { configureStore } from '@reduxjs/toolkit'
import isLoadingSlice from './slices/isLoadingSlice'
import productsListSlice from './slices/productsList.slice'
import  purchaseSlice  from './slices/purchases.slice'
import  sideBarSlice  from './slices/sideBar.slice'

export default configureStore({
    reducer: {
      productsList: productsListSlice,
      isloading: isLoadingSlice,
      purchases: purchaseSlice,
      sidebar: sideBarSlice
    }
})
