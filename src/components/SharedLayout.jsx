import NavBar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"

const SharedLayout = () => {
   return (
      <div className="shared-layout">
         <NavBar />
         <div className="content">
            <Outlet />
         </div>
         <Footer />
      </div>
   )
}

export default SharedLayout
