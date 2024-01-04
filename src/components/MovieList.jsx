import { useContext } from "react"
import { ReactComponent as ArrowDown } from "../assets/svg/arrowDown.svg"
import Spinner from "./layout/Spinner"
import MovieContext from "../context/MovieContext"

function MovieList() {

const { movies,
   IMG_PATH,
   getClassByRate,
   titleKey,
   loadMore,
   scrollToTop,
   showButton,
   hasMore,
   loading } = useContext(MovieContext)


   return (
      <>
         {loading ? (
            <Spinner />
         ) : (
            <main>
               {movies.map((oneMovie) => {
                  const {
                     id,
                     title,
                     name,
                     overview,
                     poster_path,
                     vote_average,
                  } = oneMovie
                  
                  // in API, movies are called "title" and series are called "name"
                  const movieTitle = titleKey === "name" ? name : title || name;

                  return (
                     <div className="movie" key={id}>
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
                        <div className="overview">
                           <h3>Overview</h3>
                           <p>{overview}</p>
                        </div>
                     </div>
                  )
               })}
               {hasMore && (
                  <button
                     type="button"
                     className={showButton ? "load-more show" : "load-more"}
                     onClick={loadMore}
                  >
                     <ArrowDown fill="#00a800" width="38px" height="38px" />
                  </button>
               )}
               {showButton && (
                  <button
                     type="button"
                     className="scroll-to-top"
                     onClick={scrollToTop}
                  >
                     <ArrowDown fill="#ef7715" width="38px" height="38px" />
                  </button>
               )}
            </main>
         )}
      </>
   )
}


export default MovieList
