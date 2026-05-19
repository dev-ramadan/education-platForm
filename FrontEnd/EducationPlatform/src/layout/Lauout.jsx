import { Outlet } from "react-router-dom"
import Navbar from "../components/user/Nav"
import Footer from "../components/user/Footer"

const LayOut = () => {
    return (
        <div className="flex flex-col min-h-screen">
          <Navbar/>
          <div className="flex-grow">
            <Outlet/>        
          </div>
          <Footer />
        </div>
    )
}
export default LayOut