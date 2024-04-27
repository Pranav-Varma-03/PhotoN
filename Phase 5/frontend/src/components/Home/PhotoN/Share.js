import { useEffect, useState } from "react";
import Grid from "../../Grid.js";
import axios from "axios";
import React from 'react';
import Cookies from "js-cookie";
import PhotoDetailsShare from './PhotoViewShare.js' ;
import './css_to_photoN/share.css'

const Share = () => {
    const [photos,setPhotos] = useState([])
    const ecookie = Cookies.get('id'); //ownerId

    useEffect(() => {
        axios
          .get("http://localhost:5001/api/get/view-photo-shared", {
            params: {
              username: ecookie 
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

      const redirectToAlbum = () => {
        window.location.href = '/home/photon/share/album';
      };

      return (
        <div className="main-content center">
          <button onClick={redirectToAlbum}>
            View Shared Albums
          </button>
          <Grid photos={photos} flag={6} />
          {/* Render Grid component based on some state */}
          {/* {showGrid && <Grid photos={photos} flag={6} />} */}
        </div>
      );
}

export default Share;