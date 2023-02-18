import { configureStore } from '@reduxjs/toolkit';
import { detailSlice } from '../server/detail/detailSlice';
import { homeSlice } from '../server/homepage/homeSlice';
import { readingSlice } from '../server/reading/readingSlice';

export default configureStore({
   reducer: {
      home: homeSlice.reducer,
      reading: readingSlice.reducer,
      detail: detailSlice.reducer,
   },
});
