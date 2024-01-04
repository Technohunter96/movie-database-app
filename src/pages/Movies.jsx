import React, { useEffect, useContext } from 'react';
import MovieList from "../components/MovieList";
import MovieContext from '../context/MovieContext';
import axios from 'axios';

function Movies() {
   const { setMovies, setLoading, apiUrl, fetchData } = useContext(MovieContext);
   
   useEffect(() => {
      const getMovies = async () => {
         try {
            setLoading(true);
            const response = await axios.get(apiUrl);
            const { data } = response;
            setMovies(data.results);
            setLoading(false);
         } catch (error) {
            console.log(error);
         }
      };
      getMovies();
   }, [setMovies, setLoading, apiUrl]);

   return <MovieList />;
}


export default Movies;
