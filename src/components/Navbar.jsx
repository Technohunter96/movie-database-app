import { useState, useRef, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { ReactComponent as SearchIcon } from "../assets/svg/searchIcon.svg"

function SearchBar() {
   const [isActive, setActive] = useState(false)
   const inputRef = useRef(null)

   const toggleSearch = () => {
      setActive(!isActive)
   }

   useEffect(() => {
      if (isActive && inputRef.current) {
         inputRef.current.focus()
      }
   }, [isActive])

   return (
      <div className={`search ${isActive ? "active" : ""}`}>
         <button type="button" className="searchButton" onClick={toggleSearch}>
            <SearchIcon width="36px" height="36px" className="searchIcon" />
         </button>
         <input
            type="text"
            ref={inputRef}
            placeholder="Search..."
            className={`searchInput ${isActive ? "active" : ""}`}
         />
      </div>
   )
}

function Navbar() {
   const [scrolling, setScrolling] = useState(false)

   useEffect(() => {
      window.addEventListener("scroll", handleScroll)
   })

   const handleScroll = () => {
      if (window.scrollY > 0) {
         setScrolling(true)
      } else {
         setScrolling(false)
      }
   }

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
