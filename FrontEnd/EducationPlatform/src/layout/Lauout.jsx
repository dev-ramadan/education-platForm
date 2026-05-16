import { Outlet } from "react-router-dom"
import Navbar from "../components/user/Nav"
const LayOut = () => {
    return (
        <>
        <Navbar/>
       <Outlet/>        
        </>
    )
}
export default LayOut