import { useContext } from "react"
import { ReactComponent as ArrowDown } from "../assets/svg/arrowDown.svg"
import Spinner from "./layout/Spinner"
import MovieContext from "../context/MovieContext"
import { Link } from "react-router-dom"

function MovieList() {
   const {
      movies,
      searchResults,
      IMG_PATH,
      getClassByRate,
      titleKey,
      loadMore,
      scrollToTop,
      showButton,
      loading,
      contentType,
   } = useContext(MovieContext)

   const moviesToDisplay = searchResults ? searchResults : movies

   return (
      <>
         {loading ? (
            <Spinner />
         ) : (
            <main>
               {moviesToDisplay.map((oneMovie) => {
                  const { id, title, name, poster_path, vote_average } =
                     oneMovie

                  const movieTitle = titleKey === "name" ? name : title || name

                  return (
                     <div className="movie" key={id}>
                        <Link to={`/${contentType}/${id}`}>
                           <img
                              src={`${IMG_PATH + poster_path}`}
                              alt={movieTitle}
                           />
                           <div className="movie-info">
                              <h3>{movieTitle}</h3>
                              <span className={getClassByRate(vote_average)}>
                                 {vote_average.toFixed(1)}
                              </span>
                           </div>
                        </Link>
                     </div>
                  )
               })}
               {showButton && (
                  <div>
                     <button
                        type="button"
                        className={showButton ? "load-more show" : "load-more"}
                        onClick={loadMore}
                     >
                        <ArrowDown fill="#00a800" width="38px" height="38px" />
                     </button>

                     <button
                        type="button"
                        className="scroll-to-top"
                        onClick={scrollToTop}
                     >
                        <ArrowDown fill="#ef7715" width="38px" height="38px" />
                     </button>
                  </div>
               )}
            </main>
         )}
      </>
   )
}

export default MovieList
