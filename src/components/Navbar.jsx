import { useState, useRef, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { ReactComponent as SearchIcon } from "../assets/svg/searchIcon.svg"
import { toast } from "react-toastify"

function SearchBar(props) {
   const [isActive, setActive] = useState(false)
   const [searchValue, setSearchValue] = useState("")
   const inputRef = useRef(null)

   const toggleSearch = () => {
      setActive(!isActive)
   }

   useEffect(() => {
      if (isActive && inputRef.current) {
         inputRef.current.focus()
      }
   }, [isActive])

   const handleSubmit = (e) => {
      e.preventDefault()

      const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchValue}&include_adult=true&language=en-US&page=1`

      fetch(searchUrl)
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
            props.onSearchResults(data.results)
         })
         .catch((error) => {
            toast.error("Search Error: " + error.message)
         })

      setSearchValue("")
   }

   const handleInputChange = (e) => {
      setSearchValue(e.target.value)
   }

   return (
      <div className={`search ${isActive ? "active" : ""}`}>
         <button type="button" className="searchButton" onClick={toggleSearch}>
            <SearchIcon width="36px" height="36px" className="searchIcon" />
         </button>
         <form onSubmit={handleSubmit}>
            <input
               type="text"
               ref={inputRef}
               placeholder="Search..."
               className={`searchInput ${isActive ? "active" : ""}`}
               value={searchValue}
               onChange={handleInputChange}
            />
         </form>
      </div>
   )
}

function Navbar() {
   const [scrolling, setScrolling] = useState(false)

   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY > 0) {
            setScrolling(true)
         } else {
            setScrolling(false)
         }
      }

      window.addEventListener("scroll", handleScroll)

      return () => {
         window.removeEventListener("scroll", handleScroll)
      }
   }, [])

   return (
      <header className={`navbar ${scrolling ? "scrolling" : ""}`}>
         <nav className="navbarNav">
            <div className="navbarListItems">
               <NavLink to="/">DASHBOARD</NavLink>
               <NavLink to="/movies">MOVIES</NavLink>
               <NavLink to="/series">SERIES</NavLink>
               <NavLink to="/kids">KIDS</NavLink>
            </div>
            <SearchBar />
         </nav>
      </header>
   )
}

export default Navbar
