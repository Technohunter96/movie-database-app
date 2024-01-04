import { useState, useEffect, createContext } from "react"
import axios from 'axios';
import { toast } from "react-toastify"

const MovieContext = createContext()

export const MovieProvider = ({ children }) => {
   const [searchResults, setSearchResults] = useState(null)
   const [page, setPage] = useState(1)
   const [movies, setMovies] = useState([])
   const [loading, setLoading] = useState(true)
   const [hasMore, setHasMore] = useState(true)
   const [showButton, setShowButton] = useState(false)
   // SearchBar
   const [searchValue, setSearchValue] = useState("")
   // Content Type
   const [contentType, setContentType] = useState("")

   const IMG_PATH = "https://image.tmdb.org/t/p/w1280"
   const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query="`

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
            return ""
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
      const fetchData = async () => {
        try {
          if (searchResults) {
            setMovies(searchResults);
            setLoading(false);
            setHasMore(false);
          } else {
            const response = await axios.get(`${apiUrl}&page=${page}`);
            const data = response.data;
    
            if (data.results.length === 0) {
              setHasMore(false);
            } else {
              setMovies([...movies, ...data.results]);
              setLoading(false);
            }
          }
        } catch (error) {
          toast.error("Loading error", error.message);
          setLoading(false);
        }
      };
    
      fetchData();
    }, []);

   // SearchBar
   const handleSubmit = (e) => {
      e.preventDefault()

      
      fetch(SEARCH_API + searchValue)
         .then((response) => {
            if (!response.ok) {
               throw new Error("Network response was not ok")
            }
            return response.json()
         })
         .then((data) => {
            if (!data.results || data.results.length === 0) {
               toast.error("No results found for the search term")
               return
            }
            setSearchResults(data.results)
         })
         .catch((error) => {
            toast.error("Search Error: " + error.message)
         })

      setSearchValue("")
   }

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
      // SearchBar
      searchValue,
      setSearchValue,
      handleSubmit,
      getApiUrl,
      setContentType,
      apiUrl,
   }

   return (
      <MovieContext.Provider value={contextValue}>
         {children}
      </MovieContext.Provider>
   )
}

export default MovieContext
