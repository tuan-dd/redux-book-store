import React, { useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Button, Box, Grid, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddBooks, fetchData } from '../server/detail/detailSlice';

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const BookDetailPage = () => {
   const dataBook = useSelector((state) => state.detail);
   const dispatch = useDispatch();
   const params = useParams();
   const bookId = params.id;

   useEffect(() => {
      if (dataBook.isSuccess && dataBook.status === 'success') {
         toast.success('add favorites success');
      }
      if (dataBook.status === 'error') {
         if (!dataBook.isSuccess) {
            toast.error(dataBook.error);
         }
      }
   }, [dataBook]);

   useEffect(() => {
      dispatch(fetchData(bookId));
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [bookId]);

   return (
      <Container>
         {dataBook.status === 'loading' ? (
            <Box sx={{ textAlign: 'center', color: 'primary.main' }}>
               <ClipLoader color='#inherit' size={150} loading={true} />
            </Box>
         ) : (
            <Grid
               container
               spacing={2}
               p={4}
               mt={5}
               sx={{ border: '1px solid black' }}
            >
               <Grid item md={4}>
                  {dataBook.book && (
                     <img
                        width='100%'
                        src={`${BACKEND_API}/${dataBook.book.imageLink}`}
                        alt=''
                     />
                  )}
               </Grid>
               <Grid item md={8}>
                  {dataBook.book && (
                     <Stack>
                        <h2>{dataBook.book.title}</h2>
                        <Typography variant='body1'>
                           <strong>Author:</strong> {dataBook.book.author}
                        </Typography>
                        <Typography variant='body1'>
                           <strong>Year:</strong> {dataBook.book.year}
                        </Typography>
                        <Typography variant='body1'>
                           <strong>Country:</strong> {dataBook.book.country}
                        </Typography>
                        <Typography variant='body1'>
                           <strong>Pages:</strong> {dataBook.book.pages}
                        </Typography>
                        <Typography variant='body1'>
                           <strong>Language:</strong> {dataBook.book.language}
                        </Typography>
                        <Button
                           variant='outlined'
                           sx={{ width: 'fit-content' }}
                           onClick={() =>
                              dispatch(fetchAddBooks(dataBook.book))
                           }
                        >
                           Add to Reading List
                        </Button>
                     </Stack>
                  )}
               </Grid>
            </Grid>
         )}
      </Container>
   );
};

export default BookDetailPage;
