import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../apiService';
export const readingSlice = createSlice({
   name: 'reading',
   initialState: {
      status: 'idle',
      books: [],
      isSuccess: false,
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchData.pending, (state, action) => {
            state.status = 'loading';
         })
         .addCase(fetchData.fulfilled, (state, action) => {
            state.books = action.payload[0];
            state.status = 'idle';
            state.isSuccess = action.payload[1];
         })
         .addCase(fetchData.rejected, (state, action) => {
            state.status = 'error';
            state.isSuccess = false;
         });
   },
});

export const fetchData = createAsyncThunk(
   'reading/fetchData',
   async (removedBookId) => {
      if (removedBookId) {
         await api.delete(`/favorites/${removedBookId}`);
         const res = await api.get(`/favorites`);
         return [res.data, true]; /// true mean delete success
      } else {
         const res = await api.get(`/favorites`);
         return [res.data, false];
      }
   },
);

const { reducer } = readingSlice;

export default reducer;
