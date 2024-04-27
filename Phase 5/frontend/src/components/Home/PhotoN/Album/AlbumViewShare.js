import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Grid from '../../../Grid';
import { useNavigate } from "react-router";
import Cookies from "js-cookie";


const AlbumsViewShare = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:5001/api/get/albumpics",{
                params: {
                  albumId: id
                }
              })
            .then((res) => {
                console.log(res.data);
                // Process the data if necessary, e.g., convert it to URLs or keep as base64
                const processedPhotos = res.data.map(photo => ({
                    ...photo,
                    // If needed, you can convert the base64 to a URL like this:
                    // url: `data:image/jpeg;base64,${photo.data}`
                }));
                setPhotos(processedPhotos);
                console.log(photos[0])
            })
            .catch((err) => console.log(err));
    }, []);


    const handleRemoveAlbum = () => {
        // Logic for deleting the photo
        // console.log('Undoing the delete photo');

        const isCurrentUsername = Cookies.get('id'); //ownerId ; // Get the current favorite status
    
        // Make an API call to update the favorite status
        axios
          .put(`http://localhost:5001/api/album/${id}/remove-shared-album/`, { isUsername: isCurrentUsername })
          .then((res) => {
            console.log(' status updated successfully');
            navigate('/home/photon/share/album'); // Equivalent to goBack()
          })
          .catch((err) => {
            console.error('Error updating Bin status:', err);
          });
      };
    

    return(
        <div className='container'>
         <div className='container'>
                <button onClick={handleRemoveAlbum}>Remove Album</button>
            </div>
            <div className='center'>
                <Grid photos={photos} flag={8} albumId= {id}/>
            </div>
        </div>
    )
};

export default AlbumsViewShare;
