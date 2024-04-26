import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Grid from '../../../Grid';

const AlbumsView = () => {
    const { id } = useParams();
    // console.log(id)
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
        console.log('Removing album');
        axios
          .delete(`http://localhost:5001/api/album/remove`, {
            data: { albumId: id },
          })
          .then((res) => {
            alert('Removed Image Successsfully');
            window.history.back(); // Redirect to previous page
            // You can perform additional actions here if needed
          })
          .catch((err) => {
            console.error('Error removing album:', err);
            alert('Error removing album');
          });
      };

    const handleDeleteAlbum = () => {
        axios
          .put(`http://localhost:5001/api/album/setbinflag`, {
            albumId: id,
          })
          .then((res) => {
            alert('binFlag set successfully');
            handleRemoveAlbum();
          })
          .catch((err) => {
            console.error('Error setting binFlag:', err);
            alert('Error setting binFlag');
          });
    };

    const handleShareAlbum = () => {
        console.log('Sharing photo');
    };

    return(
        <div className='container'>
         <div className='container'>
                <button onClick={handleRemoveAlbum}>Remove Album</button>
                <button onClick={handleDeleteAlbum}>Delete Album</button>
                <button onClick={handleShareAlbum}>Share Album</button>
            </div>
            <div className='center'>
                <Grid photos={photos} flag={4} albumId= {id}/>
            </div>
        </div>
    )
};

export default AlbumsView;
