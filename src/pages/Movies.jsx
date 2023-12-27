import { useOutletContext } from 'react-router-dom';
import withCommonFunctionality from "../components/withCommonFunctionality"
import MovieList from "../components/MovieList"

const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`

function Movies(props) {
   const { searchResults } = useOutletContext(); 

   return <MovieList {...props} />
}

export default withCommonFunctionality(Movies, apiUrl)
