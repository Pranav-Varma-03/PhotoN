import React, { useEffect, useState } from "react";
import Grid from "../../Grid.js";
import axios from "axios";
import Cookies from "js-cookie";
import './css_to_photoN/bin.css'

const Bin = () => {
    const [loading, setLoading] = useState(true); // Loading state
    const [photos, setPhotos] = useState([]);
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
            setLoading(false); // Set loading state to false after data is fetched
            console.log(photos[0]);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false); // Set loading state to false if there's an error
          });
      }, [ecookie]);

    return (
        <div className="main-content center">
            {loading ? (
                <h3>Loading...</h3> // Display loading message
            ) : (
                <Grid photos={photos} flag={1} /> // Render Grid component when data is ready
            )}
        </div>
    );
}

export default Bin;
