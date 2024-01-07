import React, { useEffect, useContext } from 'react';
import MovieList from "../components/MovieList";
import MovieContext from '../context/MovieContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function Kids() {
   const { setMovies, setLoading, apiUrl, page, setHasMore } = useContext(MovieContext);
   
   useEffect(() => {
      const getMovies = async () => {
         try {
            const response = await axios.get(`${apiUrl}&page=${page}`)
            const { data } = response;
            if (!data.results || data.results.length === 0) {
               setHasMore(false);
               setLoading(false);
               toast.error("No results in current category");
            } else {
               setMovies(data.results);
               setLoading(false);
            }
         } catch (error) {
            console.log(error);
            setLoading(false);
         }
      };
      getMovies();
   }, [setMovies, setLoading, apiUrl, page, setHasMore]);
   
   return <MovieList />;
}

export default Kids;