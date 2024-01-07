import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import SharedLayout from "./components/layout/SharedLayout"
import Dashboard from "./pages/Dashboard"
import Movies from "./pages/Movies"
import Series from "./pages/Series"
import Kids from "./pages/Kids"
import MovieItem from "./components/MovieItem"
import { MovieProvider } from "./context/MovieContext"

function App() {
   return (
      <MovieProvider>
         <Router>
            <Routes>
               <Route path="/" element={<SharedLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="/:content/:id" element={<MovieItem />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/movies" element={<Movies />} />
                  <Route path="/series" element={<Series />} />
                  <Route path="/kids" element={<Kids />} />
               </Route>
            </Routes>
         </Router>
         <ToastContainer />
      </MovieProvider>
   )
}

export default App
