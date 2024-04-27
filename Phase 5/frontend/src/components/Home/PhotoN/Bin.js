import { useEffect, useState } from "react";
import Grid from "../../Grid.js";
import axios from "axios";
import React from 'react';
import PhotoDetailsBin from './PhotoViewBin.js' ;
import Cookies from "js-cookie";
import './css_to_photoN/bin.css'

const Bin = () => {
  
    const [photos,setPhotos] = useState([])
    const ecookie = Cookies.get('id');
    useEffect(() => {
        axios
          .get("http://localhost:5001/api/get/bin",{
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

        <Grid photos={photos} flag={1} />
            
        </div>
    )
}

export default Bin;