import withCommonFunctionality from "../components/withCommonFunctionality";
import MovieList from "../components/MovieList";

function Kids(props) {
   return <MovieList {...props} />
}

export default withCommonFunctionality(Kids, `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&certification_country=US&certification=G`)