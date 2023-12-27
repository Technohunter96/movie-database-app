import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import SharedLayout from "./components/SharedLayout"
import Dashboard from "./pages/Dashboard"
import Movies from "./pages/Movies"
import Series from "./pages/Series"
import Kids from "./pages/Kids"
// import { MovieProvider } from "./MovieContext"

function App() {
   return (
      <>
         <Router>
            <Routes>
               <Route path="/" element={<SharedLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="movies" element={<Movies />} />
                  <Route path="series" element={<Series />} />
                  <Route path="kids" element={<Kids />} />
               </Route>
            </Routes>
         </Router>
         <ToastContainer />
      </>
   )
}

export default App
