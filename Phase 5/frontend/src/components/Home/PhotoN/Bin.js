import { useEffect, useState } from "react";
import Grid from "../../Grid.js";
import axios from "axios";
import React from 'react';
import PhotoDetailsBin from './PhotoViewBin.js' ;

const Bin = () => {

    const [photos,setPhotos] = useState([])

    useEffect(() => {
        axios
          .get("http://localhost:5001/api/get/bin")
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

export default Bin;