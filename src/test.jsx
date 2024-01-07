import React, { useEffect, useContext } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import MovieContext from "../context/MovieContext"
import axios from "axios"
// import './Dashboard.css'; // import your custom CSS

function Dashboard() {
   const { movies, setMovies, setLoading, apiUrl, page } =
      useContext(MovieContext)

   useEffect(() => {
      const getMovies = async () => {
         try {
            const response = await axios.get(`${apiUrl}&page=${page}`)
            const { data } = response
            setMovies(data.results)
            setLoading(false)
         } catch (error) {
            console.log(error)
            setLoading(false)
         }
      }
      getMovies()
   }, [setMovies, setLoading, apiUrl, page])

   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "50px",
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
      draggable: true,
      useCSS: true,
   }

   return (
      <>
         <h1>Trending</h1>
         <Slider {...settings} className="slider">
            {movies.map((movie) => (
                
               <div key={movie.id} className="movie-slide">
                  <img
                     src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                     alt={movie.title}
                  />
                  <div className="movie-overview">
                     <h2>{movie.title}</h2>
                     <p>{movie.overview}</p>
                  </div>
               </div>
            ))}
         </Slider>
      </>
   )

//    return (
//     <>
//        <Slider {...settings} className="slider">
//           {movies.map((oneMovie) => {
//              const { id, title, name, overview, poster_path, vote_average } =
//                 oneMovie

//              const movieTitle = titleKey === "name" ? name : title || name

//              return (
//                 <div className="movie slider" key={id}>
//                    <img src={`${IMG_PATH + poster_path}`} alt={movieTitle} />
//                    <div className="movie-info">
//                       <h3>{movieTitle}</h3>
//                       <span className={getClassByRate(vote_average)}>
//                          {vote_average.toFixed(1)}
//                       </span>
//                    </div>
//                    <div className="overview">
//                       <h3>Overview</h3>
//                       <p>{overview}</p>
//                    </div>
//                 </div>
//              )
//           })}
//        </Slider>
//     </>
//  )
}

export default Dashboard
