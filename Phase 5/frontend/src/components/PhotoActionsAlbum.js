import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router";
import EditTags from './EditTagsButton';
import { TagsInput } from "react-tag-input-component";
import AddtoAlbumButton from './Home/PhotoN/Album/AddtoAlbumButton';
import MovetoAlbumButton from './Home/PhotoN/Album/MovetoAlbumButton';
import './photoActions.css'

const PhotoActionsAlbumContainer = ({albumId,photo}) => {
  // console.log("AL");
  // console.log(albumId);
  const [isFavorite, setIsFavorite] = useState(photo[0].favoritesFlag);
  const [isBin, setIsBin] = useState(photo[0].binFlag);
  const [isHidden, setIsHidden] = useState(photo[0].hiddenFolderFlag);
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

  const handleDelete = () => {
    // Logic for deleting the photo
    console.log('Deleting photo');

      const photoId = photo[0]._id; // Assuming you have a unique identifier for the photo
      const isCurrentlyBin = !photo[0].binFlag ; // Get the current favorite status
    
      // Make an API call to update the favorite status
      axios
        .put(`http://localhost:5001/api/photo/${photoId}/bin/`, { isBin : isCurrentlyBin })
        .then((res) => {
          console.log(' status updated successfully');
          setIsBin(!isCurrentlyBin); // Update the local state with the new favorite status
          navigate(-1); // Equivalent to goBack()
        })
        .catch((err) => {
          console.error('Error updating Bin status:', err);
        });
  
  };

  const handleChangeFavorite = () => {
    // Logic for changing favorite status
    console.log('Changing favorite status');

    const photoId = photo[0]._id; // Assuming you have a unique identifier for the photo
    const isCurrentlyFavorite =  !photo[0].favoritesFlag;
    // setIsFavorite(); // Get the current favorite status

  // Make an API call to update the favorite status
  axios
    .put(`http://localhost:5001/api/photo/${photoId}/favorite/`, { isFavorite: isCurrentlyFavorite })
    .then((res) => {
      console.log('Favorite status updated successfully');
      setIsFavorite(!isCurrentlyFavorite); // Update the local state with the new favorite status
      // navigate(-1); // Equivalent to goBack()
    })
    .catch((err) => {
      console.error('Error updating favorite status:', err);
    });
    
  };

  const handleMakeHidden = () => {
    // Logic for making the photo hidden 
    console.log('Making photo hidden');

      const photoId = photo[0]._id; // Assuming you have a unique identifier for the photo
      const isCurrentlyHidden = !photo[0].hiddenFolderFlag ; // Get the current favorite status
      // setIsHidden(!photo[0].hiddenFolderFlag); 
      console.log(`current Hidden Status ${isCurrentlyHidden}`)
    // Make an API call to update the favorite status
    axios
      .put(`http://localhost:5001/api/photo/${photoId}/hidden`, { isHidden: isCurrentlyHidden })
      .then((res) => {
        console.log(`Hidden status updated successfully ${isCurrentlyHidden}`);
        // setIsHidden(!photo[0].hiddenFolderFlag); // Update the local state with the new favorite status
        navigate(-1); // Equivalent to goBack()
      })
      .catch((err) => {
        console.error('Error updating favorite status:', err);
      });

  };

  const handleMakeGlobal = () => {
    // Logic for making the photo global
    console.log('Making photo global');
  };

  // const handleEditTags = () => {
  //   // Logic for editing photo tags
  //   console.log('Editing photo tags');
  // };

  const [selected, setSelected] = useState([]);

  const handleRemove = () => {

    const photoId = photo[0]._id;
    console.log(photoId)
    axios
      .put(`http://localhost:5001/api/album/removeimage`, {
        albumId: albumId,
        photoId: photoId,
      })
      .then((res) => {
        console.log('Photo removed successfully');
        window.history.back();
        // You can perform additional actions here if needed
      })
      .catch((err) => {
        console.error('Error removing photo:', err);
        alert('Error removing photo');
      });
  };

  const handleDownload = () => {
    // Logic for downloading the photo
    console.log('Downloading photo');
  };

  const handleShare = () => {
    // Logic for downloading the photo
    console.log('Downloading photo');
  };

  return (
    <div className="photo-actions-container">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></link>
      <div className="photo-view-card">
        <div className="photo-content">
          <img src={photo[0].data} alt="Uploaded" />
        </div>
        <div className="photo-details">
          <div className="photo-actions">
            {/* Action buttons with FontAwesome icons */}
            <button onClick={handleChangeFavorite} className={`favorite-button ${photo[0].favoritesFlag ? 'active' : ''}`}>
              {photo[0].favoritesFlag ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
            </button>
            <button onClick={handleMakeHidden}><i className="fas fa-eye-slash"></i></button>
            <button onClick={handleMakeGlobal}><i className="fas fa-globe"></i></button>
            <button onClick={handleDelete}><i className="fas fa-trash-alt"></i></button>
            <button onClick={handleDownload}><i className="fas fa-download"></i></button>
            <button onClick={handleRemove}><i className="fas fa-minus-circle"></i></button>
            <button onClick={handleShare}><i className="fas fa-share"></i></button>
          </div>
          <div className='photo-actions2'>
          <EditTags tags={photo[0].tags} photoid={photo[0]._id} />
            <AddtoAlbumButton photoid={photo[0]._id} />
            <MovetoAlbumButton photoid={photo[0]._id} currAlbId={albumId} />
          </div>
          <div className="photo-info-container">
            {/* Photo information */}
            <p className="photo-info">Resolution: {photo[0].resolution}</p>
            <p className="photo-info">Size: {photo[0].size}</p>
            <p className="photo-info">Type: {photo[0].type}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoActionsAlbumContainer;