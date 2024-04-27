import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router";
import EditTags from './EditTagsButton';
import SharePhotoButton from './SharePhotoButton';
import AddtoAlbumButton from './Home/PhotoN/Album/AddtoAlbumButton';


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

    <div>
        <img src={photo[0].data} alt="Uploaded" />
        <p>Resolution: {photo[0].resolution}</p>
        <p>Size: {photo[0].size}</p>
        <p>Type: {photo[0].type}</p>
    </div>

      <div className="photo-actions">
        <button onClick={handleChangeFavorite} style={{ backgroundColor: photo[0].favoritesFlag ? 'red' : 'transparent' }}>
          {photo[0].favoritesFlag ? 'Unfavorite' : 'Favorite'}
        </button>
        <button onClick={handleMakeHidden}>Make Hidden</button>
        <button onClick={handleMakeGlobal}>Make Global</button>
        <button onClick={handleDelete}>Delete</button>
        <EditTags tags = {photo[0].tags} photoid={photo[0]._id}/>
        {/* <button onClick={handleEditTags}>Edit Tags</button> */}
        <button onClick={handleDownload}>Download</button>
        <AddtoAlbumButton photoid={photo[0]._id}/>
        <SharePhotoButton photoid={photo[0]._id}/>
        {/* missing adding to a album , move albumn , and info of a image , sharing a image */}
      </div>
    </div>
  );
};

export default PhotoActionsContainer;