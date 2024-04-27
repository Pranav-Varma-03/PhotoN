import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Grid from '../../../Grid';
import ShareAlbumButton from '../../../ShareAlbumButton';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const AlbumsView = () => {
    const { id } = useParams();
    // console.log(id)
    const [photos, setPhotos] = useState([]);
    const [mapPhotos, setMapPhotos] = useState([]);

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
                    coordinates: photo.gpsData.split(' ').map(coord => parseFloat(coord)),

                    icon: new L.Icon({
                        // iconUrl: `data:image/${photo.type};base64,${photo.data}`, // Use photo.type to get the MIME type
                        iconUrl: photo.data ,
                        iconSize: [25, 25], // You can adjust the size as needed
                        iconAnchor: [12, 12], // Adjust based on your icon dimensions
                        popupAnchor: [1, -25] // Adjust based on your icon dimensions
                    })
                }));
                setPhotos(processedPhotos);
                console.log(photos[0])
                setMapPhotos(processedPhotos.filter(photo => photo.coordinates.length === 2));
                
            })
            .catch((err) => console.log(err));
    }, [id, photos]);

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
                <ShareAlbumButton albumid={id}/>
            </div>
            <div className='center'>
                <Grid photos={photos} flag={4} albumId= {id}/>
            </div>

            {mapPhotos.length > 0 && (
                <MapContainer center={[mapPhotos[0].coordinates[0], mapPhotos[0].coordinates[1]]} zoom={13} style={{ height: '400px', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {mapPhotos.map((photo, idx) => (
                        <Marker key={idx} position={photo.coordinates} icon={photo.icon}>
                            <Popup>
                            <img src= {photo.data} alt={photo._id} style={{ width: '100px', height: 'auto' }}/>
                                {/* A photo from {photo.name || 'Unknown Location'} */}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            )}

        </div>
    )
};

export default AlbumsView;
