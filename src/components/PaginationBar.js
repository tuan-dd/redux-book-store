import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch } from 'react-redux';
import { fetchData } from '../server/homepage/homeSlice';
const PaginationBar = ({ query, totalPageNum, pageNum }) => {
   const dispatch = useDispatch();
   const handleChange = (event, value) => {
      dispatch(fetchData({ page: value, query: query }));
   };
   return (
      <Stack spacing={2}>
         <Pagination
            page={pageNum}
            count={totalPageNum}
            onChange={handleChange}
            showFirstButton
            showLastButton
         />
      </Stack>
   );
};

export default PaginationBar;
