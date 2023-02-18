import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../apiService';
export const homeSlice = createSlice({
   name: 'home',
   initialState: {
      status: 'idle',
      books: [],
      error: '',
      query: '',
      page: 0,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchData.pending, (state, action) => {
            state.status = 'loading';
         })
         .addCase(fetchData.fulfilled, (state, action) => {
            state.query = action.payload[0];
            state.books = action.payload[1];
            state.page = action.payload[2];
            state.status = 'idle';
         })
         .addCase(fetchData.rejected, (state, action) => {
            state.status = 'error';
            state.error = 'something Wrong';
         });
   },
});

export const fetchData = createAsyncThunk('home/fetchData', async (object) => {
   if (object.query) {
      let url = `/books?_page=${object.page}&_limit=10&q=${object.query}`;
      const res = await api.get(url);
      return [object.query, res.data, object.page];
   } else {
      let url = `/books?_page=${object.page}&_limit=10`;
      const res = await api.get(url);
      return [object.query, res.data, object.page];
   }
});

const { reducer } = homeSlice;

export default reducer;
