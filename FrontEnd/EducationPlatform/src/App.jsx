import { RouterProvider } from "react-router-dom"
import Navbar from "./components/user/Nav"
import { router } from "../route"

function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
//http://ec2-51-21-180-254.eu-north-1.compute.amazonaws.com:3000
