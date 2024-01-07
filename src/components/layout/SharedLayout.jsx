import { Outlet } from "react-router-dom"
import NavBar from "./Navbar"
import Footer from "./Footer"

const SharedLayout = () => {
   return (
      <div className="shared-layout">
         <NavBar />
         <div className="content">
            <Outlet />
         </div>
         {/* <Footer /> */}
      </div>
   )
}

export default SharedLayout
