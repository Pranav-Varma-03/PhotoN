import React from "react";
import Cookies from "js-cookie";
import Navbar from "../Navbar/Navbar"
import {Navigate,Outlet} from "react-router";

const ProtectedRoute = () =>{

    const ecookie = Cookies.get('id');

    if(ecookie){
        return(
            <>
                <Navbar />
                <Outlet />
            </>
        )
    }

    return(
            <Navigate to='/login'/>
    )
}

export default ProtectedRoute;