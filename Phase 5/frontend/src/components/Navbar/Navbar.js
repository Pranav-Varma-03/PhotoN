import React,{ useState,useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import Cookies from "js-cookie";
import UploadButton from "../UploadButton";
import './navbar.css'
const Navbar = () =>{

    const navigate = useNavigate();
    const location = useLocation(); // This provides the current router location

    // Logic to determine if the link should get the "active-link" class
    const getNavLinkClass = (path) => {
        return location.pathname === path ? 'active-link' : '';
    };
    // const ecookie = Cookies.get('User');
    
    // console.log((parseInt(parseInt(ecookie)/10000)));
    // 1: student.
    //2: instructor.
    //3: admin.
    
    // useEffect(() => {
    //     const parsedCookie = parseInt(parseInt(ecookie) / 10000);
    //     switch (parsedCookie) {
    //       case 1:
    //         setRole('student');
    //         break;
    //       case 2:
    //         setRole('instructor');
    //         break;
    //       case 3:
    //         setRole('admin');
    //         break;
    //       default:
    //         setRole(''); // Set a default value if the parsed cookie is not within expected values
    //     }
    //   }, [ecookie]);

    // const hrefLink = "/" + role + "/" + parseInt(ecookie);
    const hrefHomePhoton = "/home/photon" ;
    const hrefHomeMarketplace = "/home/marketplace" ;

    const handleclick = (e) =>{
        e.preventDefault();
        Cookies.remove('id')
        //protected route.
        navigate('/login');
    }

    const handleProfile = (e) =>{
        e.preventDefault();
        navigate('/profile')
    }


    return(
        <>
        <nav className="nav-wrapper red darken-3">
            <div className="container">
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li><a href={hrefHomePhoton} >PhotoN</a></li>
                    <li><a href={hrefHomeMarketplace} >MarketPlace</a></li>
                </ul>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                <UploadButton />
                </ul>
                <ul className="right">
                    <button onClick={handleProfile}>Profile</button>
                    <button onClick={handleclick} >Logout</button>
                </ul>
            </div>
        </nav>
        <div className="sidebar center">
                <ul>
                    <li ><a href="/home/photon" className={getNavLinkClass('/home/photon')}>All Photos</a></li>
                    <li ><a href="/home/photon/share" className={getNavLinkClass('/home/photon/share')}>Shared</a></li>
                    <li ><a href="/home/photon/fav" className={getNavLinkClass('/home/photon/fav')}>Favs</a></li>
                    <li ><a href="/home/photon/album" className={getNavLinkClass('/home/photon/album')}>Albums</a></li>
                    <li ><a href="/home/photon/lock" className={getNavLinkClass('/home/photon/lock')}>Locked</a></li>
                    <li ><a href="/home/photon/bin" className={getNavLinkClass('/home/photon/bin')}>Bin</a></li>
                </ul>
            </div>
        </>
    )
}

export default Navbar