import { useEffect, useState } from "react";
import Grid from "../../Grid.js";
import axios from "axios";
import React from 'react';
import Cookies from "js-cookie";
import './css_to_photoN/fav.css'

const Fav= () => {

    const [photos,setPhotos] = useState([])
    const ecookie = Cookies.get('id');

    useEffect(() => {
        axios
          .get("http://localhost:5001/api/get/fav",{
            params:{
              username: ecookie,
            }
          })
          .then((res) => {
            console.log(res.data);

            const processedPhotos = res.data.map(photo => ({
              ...photo,
            }));

            setPhotos(processedPhotos);
            console.log(photos[0])
          })
          .catch((err) => console.log(err));
      }, []);

    return(
        <div className="main-content center">

        <Grid photos={photos} flag={0} />
            
        </div>
    )
}

export default Fav;
