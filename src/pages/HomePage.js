/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import PaginationBar from '../components/PaginationBar';
import SearchForm from '../components/SearchForm';
import { FormProvider } from '../form';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
   Container,
   Alert,
   Box,
   Card,
   Stack,
   CardMedia,
   CardActionArea,
   Typography,
   CardContent,
} from '@mui/material';
import { fetchData } from '../server/homepage/homeSlice';

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const HomePage = () => {
   const totalPage = 10;
   const navigate = useNavigate();
   const handleClickBook = (bookId) => {
      navigate(`/books/${bookId}`);
   };
   const dispatch = useDispatch();
   const dataBooks = useSelector((state) => state.home);
   useEffect(() => {
      dispatch(fetchData({ page: 1, query: '' }));
   }, []);
   //--------------form
   const defaultValues = {
      searchQuery: '',
   };
   const methods = useForm({
      defaultValues,
   });
   const { handleSubmit } = methods;
   const onSubmit = (data) => {
      dispatch(fetchData({ page: 1, query: data.searchQuery }));
   };
   return (
      <Container>
         <Stack sx={{ display: 'flex', alignItems: 'center', m: '2rem' }}>
            <Typography variant='h3' sx={{ textAlign: 'center' }}>
               Book Store
            </Typography>
            {dataBooks.error && (
               <Alert severity='success'>{dataBooks.error}</Alert>
            )}
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
               <Stack
                  spacing={2}
                  direction={{ xs: 'column', sm: 'row' }}
                  alignItems={{ sm: 'center' }}
                  justifyContent='space-between'
                  mb={2}
               >
                  <SearchForm />
               </Stack>
            </FormProvider>
            <PaginationBar
               query={dataBooks.query}
               totalPageNum={totalPage}
               pageNum={dataBooks.page}
            />
         </Stack>
         <div>
            {dataBooks.status === 'loading' ? (
               <Box sx={{ textAlign: 'center', color: 'primary.main' }}>
                  <ClipLoader color='inherit' size={150} loading={true} />
               </Box>
            ) : (
               <Stack
                  direction='row'
                  spacing={2}
                  justifyContent='space-around'
                  flexWrap='wrap'
               >
                  {dataBooks?.books.map((book) => (
                     <Card
                        key={book.id}
                        onClick={() => handleClickBook(book.id)}
                        sx={{
                           width: '12rem',
                           height: '27rem',
                           marginBottom: '2rem',
                        }}
                     >
                        <CardActionArea>
                           <CardMedia
                              component='img'
                              image={`${BACKEND_API}/${book.imageLink}`}
                              alt={`${book.title}`}
                           />
                           <CardContent>
                              <Typography
                                 gutterBottom
                                 variant='h5'
                                 component='div'
                              >
                                 {`${book.title}`}
                              </Typography>
                           </CardContent>
                        </CardActionArea>
                     </Card>
                  ))}
               </Stack>
            )}
         </div>
      </Container>
   );
};

export default HomePage;
