import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router";
import EditTags from './EditTagsButton';
import SharePhotoButton from './SharePhotoButton';
import AddtoAlbumButton from './Home/PhotoN/Album/AddtoAlbumButton';
import './photoActions.css'


const PhotoActionsContainer = ({photo}) => {

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
    // console.log('Deleting photo');

        // Logic for changing favorite status
        // console.log('Changing favorite status');

        const photoId = photo[0]._id; // Assuming you have a unique identifier for the photo
        const isCurrentlyBin = !photo[0].binFlag ; // Get the current favorite status
    
      // Make an API call to update the favorite status
      axios
        .put(`http://localhost:5001/api/photo/${photoId}/bin/`, { isBin : isCurrentlyBin })
        .then((res) => {
          console.log(' status updated successfully');
          setIsBin(!isCurrentlyBin); // Update the local state with the new favorite status
          navigate(-1); // Equivalent to goBack()
          // navigate(-1); 
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
    
    const photoId = photo[0]._id ;
    
    console.log(`Photo ID to making global ${photoId}`)

    axios.post(`http://localhost:5001/api/photo/${photoId}/makeGlobal` , {

    }).then((res) => {
      console.log(`Photo ${photoId} added to global`) ;
      alert("Photo added to global")
      navigate(-1) ;
    }).catch((err) => {
      alert("Photo failed to make global")
      console.error('Error making the photo global: ',err);
    })
  };

  // const handleEditTags = () => {
  //   // Logic for editing photo tags
  //   console.log('Editing photo tags');
  // };

  const [selected, setSelected] = useState([]);

  const handleDownload = () => {
    // Logic for downloading the photo
    console.log('Downloading photo');
  };

  return (
    
    <div className="photo-actions-container">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></link>
  <div class="photo-view-card">
    <div class="photo-content">
      <img src={photo[0].data} alt="Uploaded" />
    </div>
    <div class="photo-details">
      <div className="photo-actions">
        {/* All your buttons here */}
        <button onClick={handleChangeFavorite} className={`favorite-button ${photo[0].favoritesFlag ? 'active' : ''}`}>
          {photo[0].favoritesFlag ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
        </button>
        <button onClick={handleMakeHidden}><i className="fas fa-eye-slash"></i></button>
        <button onClick={handleMakeGlobal}><i className="fas fa-globe"></i></button>
        <button onClick={handleDelete}><i className="fas fa-trash-alt"></i> </button>
        <button onClick={handleDownload}><i className="fas fa-download"></i></button>
        <EditTags tags={photo[0].tags} photoid={photo[0]._id} />
        <AddtoAlbumButton photoid={photo[0]._id} />
        <SharePhotoButton photoid={photo[0]._id} />
        {/* Additional buttons as required */}
      </div>
      <div className="photo-info-container">
        {/* All your photo information here */}
        <p class="photo-info">Resolution: {photo[0].resolution}</p>
        <p class="photo-info">Size: {photo[0].size}</p>
        <p class="photo-info">Type: {photo[0].type}</p>
        {/* Additional info as required */}
      </div>
    </div>
  </div>
</div>
  );
};

export default PhotoActionsContainer;