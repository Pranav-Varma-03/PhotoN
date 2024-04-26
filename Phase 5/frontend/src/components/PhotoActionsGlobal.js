import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router";
// const userModel = require("../../../backend/models/UserUploadModel");

const GlobalPhotoActionsContainer = ({photo}) => {

  const handleDownload = () => {
    // Logic for downloading the photo
    console.log('Downloading photo');
  };

  const handleLikePhoto = () => {
    // Logic for downloading the photo
    console.log('Global Photo is saving to Global Favs Folder');
  };

  return (
    <div className="photo-actions-container">

    <div>
        <img src={photo.photo} alt="Uploaded" />
        <p>Owner: {photo.ownerUserId}</p>
        <p>Resolution: {photo.resolution}</p>
        <p>Size: {photo.size}</p>
        <p>Type: {photo.type}</p>
        <p>Displaying tags of the photo is remaining</p>
    </div>

      <div className="photo-actions">
        <button onClick={handleDownload}>Download</button>
        <button onClick={handleLikePhoto}>Like photo</button>
      </div>
    </div>
  );
};

export default GlobalPhotoActionsContainer;
