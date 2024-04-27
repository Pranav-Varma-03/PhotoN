import React, { useEffect, useState } from "react";
import Grid from "../../Grid.js";
import axios from "axios";
import Cookies from "js-cookie";
import PhotoDetailsShare from './PhotoViewShare.js';
import './css_to_photoN/share.css';

const Share = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const ecookie = Cookies.get('id'); // ownerId

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
        setLoading(false); // Set loading state to false after data is fetched
        console.log(photos[0]);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading state to false if there's an error
      });
  }, [ecookie]); // Include ecookie in dependency array

  const redirectToAlbum = () => {
    window.location.href = '/home/photon/share/album';
  };

  return (
    <div className="main-content center">
      <button onClick={redirectToAlbum}>
        View Shared Albums
      </button>
      {loading ? (
        <div><h3>Loading...</h3></div> // Display loading indicator
      ) : (
        <Grid photos={photos} flag={6} /> // Render Grid component when data is ready
      )}
    </div>
  );
}

export default Share;
