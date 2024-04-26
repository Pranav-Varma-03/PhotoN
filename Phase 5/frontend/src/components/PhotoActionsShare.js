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
    <div className="photo-actions-bin-container">

      <div>
        <img src={photo[0].data} alt="Uploaded" />
        <p>Resolution: {photo[0].resolution}</p>
        <p>Size: {photo[0].size}</p>
        <p>Type: {photo[0].type}</p>
      </div>

      <div className="photo-actions-bin">
        <button onClick={handleUndo}>Remove</button>
      </div>
    </div>
  );
};

export default PhotoActionsShareContainer;