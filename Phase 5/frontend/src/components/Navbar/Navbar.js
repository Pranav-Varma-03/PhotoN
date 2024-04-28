import React,{ useState,useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import Cookies from "js-cookie";
import UploadButton from "../UploadButton";
import './navbar.css'
const Navbar = () =>{

    const navigate = useNavigate();
    const location = useLocation(); // This provides the current router location
    const isPhotoNPath = location.pathname.startsWith('/home/photon');
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
        <nav className="nav-wrapper darken-3">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></link>
            <div className="container">
                <div className="cont">
                <ul >
                    <li><a href={hrefHomePhoton} >PHOTO N</a></li>
                    <li><a href={hrefHomeMarketplace} >Market Place</a></li>
                </ul>
                </div>
                
                <div className="up_button">
                <ul >
                <UploadButton />
                </ul>
                </div>
                
                <div class="button-container2">
    <button class="profile-button" onClick={handleProfile}>
        <i class="fas fa-user-circle"></i> Profile
    </button>
    <button class="logout-button" onClick={handleclick}>
        <i class="fas fa-sign-out-alt"></i> Logout
    </button>
</div>


            </div>
        </nav>
        {isPhotoNPath ?
        (<div className="sidebar center">
                <ul>
                    <li ><a href="/home/photon" className={getNavLinkClass('/home/photon')}>All Photos</a></li>
                    <li ><a href="/home/photon/share" className={getNavLinkClass('/home/photon/share')}>Shared</a></li>
                    <li ><a href="/home/photon/fav" className={getNavLinkClass('/home/photon/fav')}>Favs</a></li>
                    <li ><a href="/home/photon/album" className={getNavLinkClass('/home/photon/album')}>Albums</a></li>
                    <li ><a href="/home/photon/lock" className={getNavLinkClass('/home/photon/lock')}>Locked</a></li>
                    <li ><a href="/home/photon/bin" className={getNavLinkClass('/home/photon/bin')}>Bin</a></li>
                </ul>
            </div>) :
       ( 
       <div className="sidebar2 center">
        <ul>
                        <li><a href="/home/marketplace" className={getNavLinkClass('/home/marketplace')}>Global Fav</a></li>
                        <li><a href="/home/marketplace/publicfeed" className={getNavLinkClass('/home/marketplace/publicfeed')}>Public Feed</a></li>
                        <li><a href="/home/marketplace/uploads" className={getNavLinkClass('/home/marketplace/uploads')}>My Uploads</a></li>
        </ul>
        </div>)}
        </>
    );
}

export default Navbar