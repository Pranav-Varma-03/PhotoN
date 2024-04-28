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
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <div className="photo-view-card">
        <div className="photo-content">
          <img src={photo.photo} alt="Uploaded" />
        </div>
        <div className="photo-details">
        <div className="photo-actions">
            <button onClick={handleDownload}><i className="fas fa-download"></i></button>
            <button onClick={handleRemoveFromGlobal}><i className="fas fa-ban"></i></button>
          </div>
          <div className="photo-info-container">
            <p className="photo-info">Owner: {photo.ownerUserId}</p>
            <p className="photo-info">Resolution: {photo.resolution}</p>
            <p className="photo-info">Size: {photo.size}</p>
            <p className="photo-info">Type: {photo.type}</p>
            <p className="photo-info">Tags: {photo.tags.join(' ')}</p>
          </div>
        </div>
      </div>
    </div>
  );


}

export default GlobalUploadPhotoActionsContainer;