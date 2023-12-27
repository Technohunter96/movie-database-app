import { useState, useEffect } from "react"
import { toast } from "react-toastify"

const withCommonFunctionality = (WrappedComponent, apiUrl, searchResults) => {
   return function WithCommonFunctionality(props) {
      const [page, setPage] = useState(1)
      const [movies, setMovies] = useState([])
      const [hasMore, setHasMore] = useState(true)
      const [showButton, setShowButton] = useState(false)
      const [loading, setLoading] = useState(true)
      const IMG_PATH = "https://image.tmdb.org/t/p/w1280"

      const loadMore = () => {
         setPage(page + 1)
         setShowButton(false)
      }

      const scrollToTop = () => {
         window.scrollTo({
            top: 0,
            behavior: "smooth",
         })
      }

      const getClassByRate = (vote) => {
         if (vote >= 8) {
            return "green"
         } else if (vote >= 5) {
            return "orange"
         } else {
            return "red"
         }
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

      useEffect(() => {
         if (searchResults) {
            setMovies(searchResults)
            setLoading(false)
            setHasMore(false)
         } else {
            fetch(`${apiUrl}&page=${page}`)
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
      }, [apiUrl, page, searchResults])

      return (
         <WrappedComponent
            {...props}
            page={page}
            movies={movies}
            hasMore={hasMore}
            showButton={showButton}
            loading={loading}
            IMG_PATH={IMG_PATH}
            loadMore={loadMore}
            scrollToTop={scrollToTop}
            getClassByRate={getClassByRate}
         />
      )
   }
}

export default withCommonFunctionality
