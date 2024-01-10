import { useState, useEffect, useContext, useRef } from "react"
import { NavLink } from "react-router-dom"
import { ReactComponent as SearchIcon } from "../../assets/svg/searchIcon.svg"
import MovieContext from "../../context/MovieContext"
import { toast } from "react-toastify"

// Search bar component
function SearchBar() {
   const [isActive, setActive] = useState(false)
   const inputRef = useRef(null)

   const { searchValue, setSearchValue, SEARCH_API, setSearchResults } =
      useContext(MovieContext)

      // Toggle search bar
   const toggleSearch = () => {
      setActive(!isActive)
   }
   
   // Focus on input when search is active
   useEffect(() => {
      if (isActive && inputRef.current) {
         inputRef.current.focus()
      }
   }, [isActive])
   
   const handleInputChange = (e) => {
      setSearchValue(e.target.value)
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (searchValue && searchValue !== "") {
        try {
          const response = await fetch(SEARCH_API + searchValue);
    
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
    
          const data = await response.json();
    
          if (!data.results || data.results.length === 0) {
            toast.error("No results found for the search term");
            return;
          }
    
          setSearchResults(data.results);
        } catch (error) {
          toast.error("Search Error: " + error.message);
        }
    
        setSearchValue("");
      } else {
        toast.error("Please enter a search term");
        window.location.reload();
      }
    };
   
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

// Navbar component
function Navbar() {
   const [scrolling, setScrolling] = useState(false)
   const { setContentType, setSearchResults } = useContext(MovieContext);

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

   const handleNavLinkClick = (type) => {
      setSearchResults("");
      setContentType(type);
   }

   return (
      <header className={`navbar ${scrolling ? "scrolling" : ""}`}>
         <nav className="navbarNav">
            <div className="navbarListItems">
               <NavLink to="/dashboard" onClick={() => handleNavLinkClick("trending")}>DASHBOARD</NavLink>
               <NavLink to="/movies" onClick={() => handleNavLinkClick("movies")}>MOVIES</NavLink>
               <NavLink to="/series" onClick={() => handleNavLinkClick("series")}>SERIES</NavLink>
               <NavLink to="/kids" onClick={() => handleNavLinkClick("kids")}>KIDS</NavLink>
            </div>
            <SearchBar />
         </nav>
      </header>
   )
}

export default Navbar
