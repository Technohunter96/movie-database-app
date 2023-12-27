import { useState } from "react"
import { Outlet } from "react-router-dom"
import NavBar from "./Navbar"
import Footer from "./Footer"

const SharedLayout = () => {
   const [searchResults, setSearchResults] = useState(null)

   // Props ze SearchBaru
   const handleSearchResults = (results) => {
      setSearchResults(results)
   }

   return (
      <div className="shared-layout">
         <NavBar onSearchResults={handleSearchResults} />
         <div className="content">
            <Outlet context={{ searchResults }} />
         </div>
         <Footer />
      </div>
   )
}

export default SharedLayout
