import axios from "axios"
import { useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import MovieContext from "../context/MovieContext"
import MovieList from "../components/MovieList"
import Spinner from "../components/layout/Spinner"

function Dashboard() {
   const {
      movies,
      setMovies,
      loading,
      setLoading,
      titleKey,
      getClassByRate,
      apiUrl,
      page,
      IMG_PATH,
      searchResults,
      contentType,
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
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      initialSlide: 3,
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
            },
         },
         {
            breakpoint: 800,
            settings: {
               slidesToShow: 2,
            },
         },
      ],
   }

   return (
      <>
         {loading ? (
            <Spinner />
         ) : searchResults ? (
            <MovieList />
         ) : (
            <div className="slider">
               <h1>Trending</h1>
               <Slider {...settings}>
                  {movies.map((movie) => {
                     const {
                        id,
                        title,
                        name,
                        poster_path: posterPath,
                        vote_average: voteAverage,
                     } = movie

                     const movieTitle =
                        titleKey === "name" ? name : title || name

                     return (
                        <Link key={id} to={`/${contentType}/${id}`}>
                           <div className="slider movie">
                              <img
                                 src={`${IMG_PATH}${posterPath}`}
                                 alt={movieTitle}
                              />
                              <div className="movie-info">
                                 <h3>{movieTitle}</h3>
                                 <span className={getClassByRate(voteAverage)}>
                                    {voteAverage.toFixed(1)}
                                 </span>
                              </div>
                           </div>
                        </Link>
                     )
                  })}
               </Slider>
            </div>
         )}
      </>
   )
}

export default Dashboard
