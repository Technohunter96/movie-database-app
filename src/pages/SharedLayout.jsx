import NavBar from "../components/Navbar"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"
import "./SharedLayout.css"

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
