import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const PhotoActionsShareContainer = ({ photo }) => {

  const [isBin, setIsBin] = useState(photo[0].binFlag);
  const navigate = useNavigate();

  //   const [imageData, setImageData] = useState(null);

  //   const handleImageUpload = (event) => {
  //     const file = event.target.files[0];
  //     const reader = new FileReader();

  //     reader.onload = (e) => {
  //       setImageData(e.target.result);
  //     };

  //     reader.readAsDataURL(file);
  //   };

  const handleUndo = () => {
    // Logic for deleting the photo
    // console.log('Undoing the delete photo');

    const photoId = photo[0]._id; // Assuming you have a unique identifier for the photo
    const isCurrentUsername = Cookies.get('id'); //ownerId ; // Get the current favorite status

    // Make an API call to update the favorite status
    axios
      .put(`http://localhost:5001/api/photo/${photoId}/remove-shared-photo/`, { isUsername: isCurrentUsername })
      .then((res) => {
        console.log(' status updated successfully');
        navigate('/home/photon/share'); // Equivalent to goBack()
      })
      .catch((err) => {
        console.error('Error updating Bin status:', err);
      });
  };

  return (
    <div className="photo-actions-container">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <div className="photo-view-card">
        <div className="photo-content">
          <img src={photo[0].data} alt="Uploaded" />
        </div>
        <div className="photo-details">
        <div className="photo-actions">
            <button onClick={handleUndo}><i className="fas fa-undo"></i> Remove</button>
          </div>
          <div className="photo-info-container">
            <p className="photo-info">Resolution: {photo[0].resolution}</p>
            <p className="photo-info">Size: {photo[0].size}</p>
            <p className="photo-info">Type: {photo[0].type}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoActionsShareContainer;