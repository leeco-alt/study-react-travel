import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProductDetail {
  loading: boolean
  error: string | null
  data: any
}

const initialState: ProductDetail = {
  loading: true,
  error: null,
  data: null
}

export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    fetchStart: (state) => {
      // return { ...state, loading: true }
      // immer
      state.loading = true
    },
    fetchSuccess: (state, action) => {
      state.data = action.payload
      state.loading = false
      state.error = null
    },
    fetchFail: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})
