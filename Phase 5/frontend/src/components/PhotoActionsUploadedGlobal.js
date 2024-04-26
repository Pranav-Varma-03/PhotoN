import React, { useState, useEffect } from 'react';
import axios, { Axios } from "axios";
import { useNavigate } from "react-router";
// const userModel = require("../../../backend/models/UserUploadModel");
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";


const GlobalUploadPhotoActionsContainer = ({photo}) => {
  const navigate = useNavigate();

  const id = photo._id ;
  const ecookie = Cookies.get('id');

  const handleDownload = () => {
    // console.log(id) ;
    const downloadLink = document.createElement('a');
    downloadLink.href = photo.photo; // Assuming `photo.photo` contains the base64 representation of the image
    downloadLink.download = 'downloaded_photo.png'; // You can set the desired file name here
    downloadLink.click();
  };

  const handleRemoveFromGlobal = () => {
    axios.delete(`http://localhost:5001/api/removeFromGlobal/${photo._id}`)
    .then((res)=>{
      alert('Photo Removed from Global')
      navigate(-1)
    }).catch((error) => {
      alert('Photo Removal from Global failed');
    });
  };


  return (
    <div className="photo-actions-container">

    <div>
        <img src={photo.photo} alt="Uploaded" />
        <p>Owner: {photo.ownerUserId}</p>
        <p>Resolution: {photo.resolution}</p>
        <p>Size: {photo.size}</p>
        <p>Type: {photo.type}</p>
        {/* <p>Displaying tags of the photo is remaining</p> */}
        <p>Tags: {photo.tags.join(' ')}</p>
    </div>

      <div className="photo-actions">
        <button onClick={handleDownload}>Download</button>
          <button onClick={handleRemoveFromGlobal}>Remove From Global</button>
      </div>
    </div>
  );


}

export default GlobalUploadPhotoActionsContainer;