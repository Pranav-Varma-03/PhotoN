import { useEffect, useState } from "react";
import Grid from "../../Grid.js";
import axios from "axios";
import React from 'react';
import Cookies from "js-cookie";

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

    return(
        <div className="center">

        <Grid photos={photos} flag={1} />
            
        </div>
    )
}

export default Share;