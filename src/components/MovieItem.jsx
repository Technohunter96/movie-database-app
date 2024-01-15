import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import MovieContext from "../context/MovieContext"
import MovieList from "../components/MovieList"

function MovieItem() {
   const { id } = useParams()
   const [movie, setMovie] = useState(null)
   const [trailerUrl, setTrailerUrl] = useState(null)
   const { contentType, searchResults } = useContext(MovieContext)

   let content = contentType === "series" ? "tv" : "movie"

   // Get movie
   useEffect(() => {
      axios
         .get(
            `https://api.themoviedb.org/3/${content}/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
         )
         .then((response) => setMovie(response.data))
   }, [id, content])

   // Get trailer
   useEffect(() => {
      axios
         .get(
            `https://api.themoviedb.org/3/${content}/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
         )
         .then((response) => {
            if (response.data.results && response.data.results.length > 0) {
               setTrailerUrl(
                  `https://www.youtube.com/embed/${response.data.results[0].key}`
               )
            }
         })
   }, [id, content])

   if (!movie) return null
   
   if (movie.title === undefined || movie.title === null) {
      movie.title = movie.name
   }
   
   return (
      <>
         {searchResults ? (
            <MovieList />
         ) : (
            <div className="movie-item-container">
               <div className="movie item">
                  <img
                     src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                     alt={movie.title}
                  />
                  <h1>{movie.title}</h1>
                  <p>{movie.overview}</p>
               </div>
               <div>
                  {trailerUrl && (
                     <iframe
                        className="trailer"
                        width="860"
                        height="484.5"
                        src={trailerUrl}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ border: 0, borderRadius: "10px" }}
                     ></iframe>
                  )}
                  <button
                     className="back-button block"
                     onClick={() => {
                        window.history.back()
                     }}
                  >
                     <b>Back to page</b>
                  </button>
               </div>
            </div>
         )}
      </>
   )
}

export default MovieItem
