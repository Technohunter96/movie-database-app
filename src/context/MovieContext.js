import { useState, useEffect, createContext } from "react"
import { toast } from "react-toastify"

const MovieContext = createContext()

export const MovieProvider = ({ children }) => {
   const [searchResults, setSearchResults] = useState(null)
   const [page, setPage] = useState(1)
   const [movies, setMovies] = useState([])
   const [loading, setLoading] = useState(true)
   const [hasMore, setHasMore] = useState(true)
   const [showButton, setShowButton] = useState(false)
   const IMG_PATH = "https://image.tmdb.org/t/p/w1280"

   // Scroll to top
   const scrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      })
   }

   // Rating
   const getClassByRate = (vote) => {
      if (vote >= 8) {
         return "green"
      } else if (vote >= 5) {
         return "orange"
      } else {
         return "red"
      }
   }

   // Load more button
   const loadMore = () => {
      setPage(page + 1)
      setShowButton(false)
   }

   useEffect(() => {
      const handleScroll = () => {
         const isAtBottom =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight

         if (isAtBottom) {
            setShowButton(true)
         } else {
            setShowButton(false)
         }
      }

      window.addEventListener("scroll", handleScroll)
      return () => {
         window.removeEventListener("scroll", handleScroll)
      }
   }, [])
   

   // Fetching movies / search results
   useEffect(() => {
      if (searchResults) {
         setMovies(searchResults)
         setLoading(false)
         setHasMore(false)
      } else {
         fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`)
            .then((response) => response.json())
            .then((data) => {
               if (data.results.length === 0) {
                  setHasMore(false)
               } else {
                  setMovies([...movies, ...data.results])
                  setLoading(false)
               }
            })
            .catch((error) => {
               toast.error("Loading error", error.message)
            })
      }
   }, [page, searchResults])

   const contextValue = {
      searchResults,
      setSearchResults,
      loading,
      setLoading,
      page,
      setPage,
      hasMore,
      setHasMore,
      movies,
      setMovies,
      showButton,
      setShowButton,
      IMG_PATH,
      loadMore,
      scrollToTop,
      getClassByRate,
   }

   return (
      <MovieContext.Provider value={contextValue}>
         {children}
      </MovieContext.Provider>
   )
}

export default MovieContext
