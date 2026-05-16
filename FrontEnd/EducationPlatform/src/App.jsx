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
