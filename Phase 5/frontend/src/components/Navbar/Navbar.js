import React,{ useState,useEffect } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import UploadButton from "../UploadButton";
const Navbar = () =>{

    const navigate = useNavigate();
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


    return(
        <nav className="nav-wrapper red darken-3">
            <div className="container">
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li><a href={hrefHomePhoton} >PHOTO N</a></li>
                    <li><a href={hrefHomeMarketplace} >Market Place</a></li>
                </ul>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                <UploadButton />
                </ul>
                <ul className="right">
                    <button onClick={handleclick} >Logout</button>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar