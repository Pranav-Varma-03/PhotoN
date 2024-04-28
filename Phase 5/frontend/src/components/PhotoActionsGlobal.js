import React, { useState, useEffect } from 'react';
import axios, { Axios } from "axios";
import { useNavigate } from "react-router";
// const userModel = require("../../../backend/models/UserUploadModel");
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";


const GlobalPhotoActionsContainer = ({photo}) => {


  const [isLiked, setIsLiked] = useState(false);
  const id = photo._id ;
  const ecookie = Cookies.get('id');
  // const ecookie = ecookie ;

  useEffect(() => {
    // This effect runs once on component mount
    // console.log(ecookie)
    axios.get(`http://localhost:5001/api/check-like/${id}/${ecookie}`)
      .then(res => {
        setIsLiked(res.data.isLiked); // Assuming the backend sends { isLiked: true/false }
      })
      .catch(err => {
        console.error('Error checking like status:', err);
      });
  }, [id, ecookie]);


  const handleDownload = () => {
    // console.log(id) ;
    const downloadLink = document.createElement('a');
    downloadLink.href = photo.photo; // Assuming `photo.photo` contains the base64 representation of the image
    downloadLink.download = 'downloaded_photo.png'; // You can set the desired file name here
    downloadLink.click();
  };

  const handleLikePhoto = () => {
    // Logic for downloading the photo
    console.log('Global Photo is saving to Global Favs Folder');

    axios.post(`http://localhost:5001/api/global/photo-details/${id}/${ecookie}/liking`,{
      photoId: id ,
      userid: ecookie ,
    }).then(res=>{
        // alert('Photo liked succesfully');
        setIsLiked(true);
    }).catch((error) =>{
      console.log(error)
      alert('Photo liking failed');
    })
  };

  const handleDislikePhoto = () => {
    axios.post(`http://localhost:5001/api/global/photo-details/${id}/${ecookie}/disliking`,{
      photoId: id ,
      userid: ecookie ,
    }).then(res=>{
      // alert('Photo liked succesfully');
      setIsLiked(false);
    }).catch((error) =>{
      console.log(error)
      alert('Photo disliking failed');
    })
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
            {isLiked ? (
              <button onClick={handleDislikePhoto}><i className="fas fa-thumbs-down"></i></button>
            ) : (
              <button onClick={handleLikePhoto}><i className="fas fa-thumbs-up"></i></button>
            )}
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
};

export default GlobalPhotoActionsContainer;
