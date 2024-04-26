import { useEffect, useState } from "react";
import Grid from "../../Grid.js";
import axios from "axios";
import React from 'react';

const Fav= () => {

    const [photos,setPhotos] = useState([])
    

    useEffect(() => {
        axios
          .get("http://localhost:5001/api/get/fav")
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

        <Grid photos={photos} flag={0} />
            
        </div>
    )
}

export default Fav;
