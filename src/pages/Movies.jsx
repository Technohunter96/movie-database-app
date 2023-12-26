import withCommonFunctionality from "../components/withCommonFunctionality"
import MovieList from "../components/MovieList"

function Movies(props) {
   return <MovieList {...props} />
}

export default withCommonFunctionality(Movies,`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
