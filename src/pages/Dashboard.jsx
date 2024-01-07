import React, { useEffect, useContext } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import MovieContext from "../context/MovieContext"
import axios from "axios"
import MovieList from "../components/MovieList"

function Dashboard() {
   const {
      movies,
      setMovies,
      setLoading,
      apiUrl,
      page,
      IMG_PATH,
      searchResults,
   } = useContext(MovieContext)

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
      slidesToShow: 5,
      initialSlide: 0,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
      draggable: true,
      adaptiveHeight: true,
      responsive: [
         {
            breakpoint: 1280,
            settings: {
               slidesToShow: 4,
            },
         },
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 3,
               dots: false,
            },
         },
         {
            breakpoint: 800,
            settings: {
               slidesToShow: 2,
               dots: false,
            },
         },
         // {
         //    breakpoint: 600,
         //    settings: {
         //       slidesToShow: 1,
         //       dots: false,
         //    },
         // },
      ],
   }

   return (
      <>
         {searchResults ? (
            <MovieList />
         ) : (
            <div className="slider">
               <h1>Trending</h1>
               <Slider {...settings}>
                  {movies.map((movie) => (
                     <div key={movie.id} className="movie slider">
                        <img
                           src={`${IMG_PATH}${movie.poster_path}`}
                           alt={movie.title}
                        />
                        <div className="overview">
                           <h2>{movie.title}</h2>
                           <p>{movie.overview}</p>
                        </div>
                     </div>
                  ))}
               </Slider>
            </div>
         )}
      </>
   )
}

export default Dashboard
