import withCommonFunctionality from "../components/withCommonFunctionality"
import MovieList from "../components/MovieList"

function Series(props) {
   return <MovieList {...props} />
}
export default withCommonFunctionality(
   Series,
   `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
)
