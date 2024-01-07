import { useState, useEffect, createContext } from "react"

const MovieContext = createContext()

export const MovieProvider = ({ children }) => {
   const [movies, setMovies] = useState([])
   const [loading, setLoading] = useState(true)
   const [page, setPage] = useState(1)
   const [hasMore, setHasMore] = useState(true)
   const [showButton, setShowButton] = useState(false)
   // SearchBar
   const [searchResults, setSearchResults] = useState(null)
   const [searchValue, setSearchValue] = useState("")
   // Content Type
   const savedContentType = sessionStorage.getItem("contentType")
   const [contentType, setContentType] = useState(savedContentType)

   const IMG_PATH = "https://image.tmdb.org/t/p/w1280"
   const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query="`

   // Catching contentType in sessionStorage when changed
   useEffect(() => {
      sessionStorage.setItem("contentType", contentType)
   }, [contentType])

   // Content Type API URL
   const getApiUrl = (contentType) => {
      switch (contentType) {
         case "trending":
            return `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
         case "movies":
            return `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
         case "series":
            return `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
         case "kids":
            return `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&certification_country=US&certification=G`
         default:
            return `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      }
   }

   const apiUrl = getApiUrl(contentType)

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

   const contextValue = {
      movies,
      setMovies,
      loading,
      setLoading,
      page,
      setPage,
      hasMore,
      setHasMore,
      showButton,
      setShowButton,
      IMG_PATH,
      loadMore,
      scrollToTop,
      getClassByRate,
      // SearchBar
      searchResults,
      setSearchResults,
      searchValue,
      setSearchValue,
      getApiUrl,
      setContentType,
      apiUrl,
      SEARCH_API,
   }

   return (
      <MovieContext.Provider value={contextValue}>
         {children}
      </MovieContext.Provider>
   )
}

export default MovieContext
