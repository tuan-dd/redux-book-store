import React, { useEffect } from 'react';
import {
   Container,
   Button,
   Box,
   Card,
   Stack,
   CardMedia,
   Typography,
   CardContent,
} from '@mui/material';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../server/reading/readingSlice';
const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const ReadingPage = () => {
   const dataReading = useSelector((state) => state.reading);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const handleClickBook = (bookId) => {
      navigate(`/books/${bookId}`);
   };

   useEffect(() => {
      dispatch(fetchData());
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      if (dataReading.isSuccess && dataReading.status === 'idle') {
         toast.success('The book has been removed');
      } else if (dataReading.status === 'error') {
         toast('something Wrong');
      }
   }, [dataReading.isSuccess, dataReading.status]);

   return (
      <Container>
         <Typography variant='h3' sx={{ textAlign: 'center' }} m={3}>
            Book Store
         </Typography>
         {dataReading.status === 'loading' ? (
            <Box sx={{ textAlign: 'center', color: 'primary.main' }}>
               <ClipLoader color='inherit' size={150} loading={true} />
            </Box>
         ) : (
            <Stack
               direction='row'
               spacing={2}
               justifyContent='space-around'
               flexWrap={'wrap'}
            >
               {dataReading.books?.map((book) => (
                  <Card
                     key={book.id}
                     sx={{
                        width: '12rem',
                        height: '27rem',
                        marginBottom: '2rem',
                     }}
                  >
                     <Card sx={{ position: 'relative', height: '100%' }}>
                        <CardMedia
                           component='img'
                           image={`${BACKEND_API}/${book.imageLink}`}
                           alt={`${book.title}`}
                           onClick={() => handleClickBook(book.id)}
                        />
                        <CardContent>
                           <Typography
                              gutterBottom
                              variant='h5'
                              component='div'
                           >
                              {`${book.title}`}
                           </Typography>
                           <Typography
                              gutterBottom
                              variant='body1'
                              component='div'
                           >
                              {`${book.author}`}
                           </Typography>
                           <Button
                              sx={{
                                 position: 'absolute',
                                 top: '5px',
                                 right: '5px',
                                 backgroundColor: 'secondary.light',
                                 color: 'secondary.contrastText',
                                 padding: '0',
                                 minWidth: '1.5rem',
                              }}
                              size='small'
                              onClick={() => dispatch(fetchData(book.id))}
                           >
                              &times;
                           </Button>
                        </CardContent>
                     </Card>
                  </Card>
               ))}
            </Stack>
         )}
      </Container>
   );
};

export default ReadingPage;
