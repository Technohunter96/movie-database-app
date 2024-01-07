import React, { useEffect, useContext } from 'react';
import MovieList from "../components/MovieList";
import MovieContext from '../context/MovieContext';
import axios from 'axios';

function Series() {
   const { setMovies, setLoading, apiUrl, page } = useContext(MovieContext);
   
   useEffect(() => {
      const getMovies = async () => {
         try {
            const response = await axios.get(`${apiUrl}&page=${page}`)
            const { data } = response;
            setMovies(data.results);
            setLoading(false);
         } catch (error) {
            console.log(error);
            setLoading(false);
         }
      };
      getMovies();
   }, [setMovies, setLoading, apiUrl, page]);
   
   return <MovieList />;
}


export default Series;
