import { createSlice, createAsyncThunk, AnyAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface UserState {
  loading: boolean
  error: string | null
  token: string | null
}

const initialState: UserState = {
  loading: false,
  error: null,
  token: null
}

export const signIn = createAsyncThunk(
  'user/signIn',
  async (
    paramaters: {
      email: string
      password: string
    },
    thunkAPI
  ) => {
    let url = `http://123.56.149.216:8080/auth/login`
    const response = await axios.post(url, {
      email: paramaters.email,
      password: paramaters.password
    })

    return response.data.token
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [signIn.pending.type]: (state) => {
      state.loading = true
    },
    [signIn.fulfilled.type]: (state, action) => {
      state.token = action.payload
      state.loading = false
      state.error = null
    },
    [signIn.rejected.type]: (state, action: AnyAction) => {
      state.loading = false
      state.error = action.error.message
    }
  }
})
