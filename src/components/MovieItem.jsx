import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import MovieContext from "../context/MovieContext"

function MovieItem() {
   const { id } = useParams()
   const [movie, setMovie] = useState(null)
   const [trailerUrl, setTrailerUrl] = useState(null)
   const { contentType } = useContext(MovieContext)

   let content = "movie"
   if (contentType === "series") {
        content = "tv"
   }

   // Get movie
   useEffect(() => {
      fetch(
         `https://api.themoviedb.org/3/${content}/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      )
         .then((response) => response.json())
         .then((data) => setMovie(data))
   }, [id])

   // Get trailer
   useEffect(() => {
      fetch(
         `https://api.themoviedb.org/3/${content}/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      )
         .then((response) => response.json())
         .then((data) => {
            if (data.results && data.results.length > 0) {
               setTrailerUrl(
                  `https://www.youtube.com/embed/${data.results[0].key}`
               )
            }
         })
   }, [id])

   

   if (!movie) return null

   return (
      <div className="movie-item-container">
         <div className="movie item">
            <img
               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
               alt={movie.title}
            />
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
         </div>
         {trailerUrl && (
            
            <iframe
               width="860"
               height="484.5"
               src={trailerUrl}
               title="YouTube video player"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowFullScreen
               style={{ border: 0,
            borderRadius: "10px" }}
            ></iframe>
         )}
      </div>
   )
}

export default MovieItem
