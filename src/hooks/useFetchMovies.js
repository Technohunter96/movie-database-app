import { useContext, useEffect } from "react"
import MovieContext from "../context/MovieContext"
import { toast } from "react-toastify"
import axios from "axios"

export default function useFetchMovies() {
   const {
      searchResults,
      page,
      apiUrl,
      setMovies,
      setLoading,
      setHasMore,
      movies,
   } = useContext(MovieContext)

   useEffect(() => {
      const fetchData = async () => {
         setLoading(true)
         try {
            if (searchResults) {
               setMovies(searchResults)
               setLoading(false)
            } else {
               const response = await axios.get(`${apiUrl}&page=${page}`)
               const data = response.data

               if (data.results.length === 0) {
                  setHasMore(false)
               } else {
                  setMovies((prevMovies) => [...prevMovies, ...data.results])
                  setLoading(false)
               }
            }
         } catch (error) {
            toast.error("Loading error", error.message)
            setLoading(false)
         }
      }

      fetchData()
   }, [searchResults, page, apiUrl, setMovies, setLoading, setHasMore ])

   return {
      searchResults,
      page,
      apiUrl,
      setMovies,
      setLoading,
      setHasMore,
      movies,
   }
}
