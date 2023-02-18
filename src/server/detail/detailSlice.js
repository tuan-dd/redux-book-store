import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../apiService';

export const detailSlice = createSlice({
   name: 'detail',
   initialState: {
      status: 'idle',
      book: {},
      error: '',
      isSuccess: false,
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchData.pending, (state, action) => {
            state.status = 'loading';
         })
         .addCase(fetchData.fulfilled, (state, action) => {
            state.book = action.payload;
            state.status = 'idle';
         })
         .addCase(fetchData.rejected, (state, action) => {
            state.status = 'error';
            console.log(action)
            state.error = 'Id of book wrong';
         })
         .addCase(fetchAddBooks.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.status = 'success';
         })
         .addCase(fetchAddBooks.rejected, (state, action) => {
            state.status = 'error';
            state.error = action.error.message;
            state.isSuccess = false;
         });
   },
});

export const fetchData = createAsyncThunk(
   'reading/fetchData',
   async (bookId) => {
      const res = await api.get(`/books/${bookId}`);
      return res.data;
   },
);

export const fetchAddBooks = createAsyncThunk(
   'reading/fetchAddBooks',
   async (book) => {
      const res = await api.post(`/favorites`, book);
      return res.data;
   },
);

const { reducer } = detailSlice;
export default reducer;
