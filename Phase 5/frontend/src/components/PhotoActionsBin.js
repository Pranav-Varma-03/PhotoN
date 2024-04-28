import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router";

const PhotoActionsBinContainer = ({photo}) => {

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
        console.log('Undoing the delete photo');

        const photoId = photo[0]._id; // Assuming you have a unique identifier for the photo
        const isCurrentlyBin = !photo[0].binFlag ; // Get the current favorite status
    
      // Make an API call to update the favorite status
      axios
        .put(`http://localhost:5001/api/photo/${photoId}/bin/`, { isBin : isCurrentlyBin })
        .then((res) => {
          console.log(' status updated successfully');
          setIsBin(!isCurrentlyBin); // Update the local state with the new favorite status
          navigate('/home/photon/bin'); // Equivalent to goBack()
        })
        .catch((err) => {
          console.error('Error updating Bin status:', err);
        });
  
  };

  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = () => {
    // Logic for deleting the photo
    console.log('Deleting photo');
    const photoId = photo[0]._id;

    // Make an API call to delete the photo from the database
    axios
      .delete(`http://localhost:5001/api/photo/${photoId}/remove`)
      .then((res) => {
        console.log('Photo deleted successfully');
        setIsDeleted(true); // Update state to indicate photo deletion
        navigate(-1);
      })
      .catch((err) => {
        console.error('Error deleting photo:', err);
      });

  };

  return (
    <div className="photo-actions-container">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></link>
      <div className="photo-view-card">
        <div className="photo-content">
          <img src={photo[0].data} alt="Uploaded" />
        </div>
        <div className="photo-details">
          <div className="photo-actions-bin">
            <button onClick={handleUndo}><i className="fas fa-undo"></i></button>
            <button onClick={handleDelete}><i className="fas fa-trash-alt"></i></button>
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

export default PhotoActionsBinContainer;