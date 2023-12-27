import withCommonFunctionality from "./withCommonFunctionality"
import MovieList from "./MovieList"

const ContentDisplay = ({ contentType, searchResults }) => {
   let apiUrl
   switch (contentType) {
      case "movies":
         apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
         break
      case "series":
         apiUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
         break
      case "kids":
         apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&certification_country=US&certification=G`
         break
      default:
         apiUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
   }

   const WrappedComponent = withCommonFunctionality(
      MovieList,
      apiUrl,
      searchResults
   )

   return <WrappedComponent />
}

export default ContentDisplay
