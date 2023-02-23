import React from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider
} from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar"
import {Home,Login,Register,Single,Write} from "./pages/index.js"
import "./style.scss"

const Layout = ()=>{
    return(
    <>    
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children : [
            {
                path :"/",
                element: <Home/>
            },
            {
                path :"/post/:id",
                element: <Single/>
            },
            {
                path :"/write",
                element: <Write/>
            },
        ]
    },
    {
        path: "/register",
        element: <Register/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    ]);
function App() {
    return (
        <div className="app">
            <div className="container" >
                <RouterProvider router = {router}/>
            </div> 
        </div>
)}



export default App;
