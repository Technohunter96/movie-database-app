import "./Movies.css"
import { useState, useEffect } from "react"

function Movies() {
   const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=1`
   const IMG_PATH = "https://image.tmdb.org/t/p/w1280"

   const [movies, setMovies] = useState([])

   useEffect(() => {
      fetch(apiUrl)
         .then((response) => response.json())
         .then((data) => {
            setMovies(data.results)
         })
         .catch((error) => {
            console.error("Chyba:", error)
         })
   }, [apiUrl])

   const getClassByRate = (vote) => {
      if (vote >= 8) {
         return "green"
      } else if (vote >= 5) {
         return "orange"
      } else {
         return "red"
      }
   }

   return (
      <main>
         {movies.map((oneMovie) => {
            const { id, title, overview, poster_path, vote_average } =
               oneMovie

            return (
               <div className="movie" key={id}>
                  <img src={`${IMG_PATH + poster_path}`} alt={title} />
                  <div class="movie-info">
                     <h3>{title}</h3>
                     <span className={getClassByRate(vote_average)}>
                        {vote_average.toFixed(1)}
                     </span>
                  </div>
                  <div class="overview">
                     <h3>Overview</h3>
                     <p>{overview}</p>
                  </div>
               </div>
            )
         })}
      </main>
   )
}

export default Movies
