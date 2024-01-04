import React, { useEffect, useContext } from 'react';
import MovieList from "../components/MovieList";
import MovieContext from '../context/MovieContext';

function Kids() {
   const { setMovies, setLoading, apiUrl } = useContext(MovieContext);

   useEffect(() => {
      setLoading(true);
      fetch(apiUrl)
         .then(response => response.json())
         .then(data => {
            setMovies(data.results);
            setLoading(false);
         })
         .catch(error => {
            console.error('Error fetching movies:', error);
            setLoading(false);
         });
   }, [setMovies, setLoading, apiUrl]);

   return <MovieList />;
}

export default Kids;
