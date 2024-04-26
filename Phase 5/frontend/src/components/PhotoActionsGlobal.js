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
    // Logic for downloading the photo
    console.log('Downloading photo');
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
        {isLiked ? (
          <button onClick={handleDislikePhoto}>Dislike Photo</button>
        ) : (
          <button onClick={handleLikePhoto}>Like Photo</button>
        )}
      </div>
    </div>
  );
};

export default GlobalPhotoActionsContainer;
