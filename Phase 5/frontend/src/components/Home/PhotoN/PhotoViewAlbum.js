import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PhotoActionsAlbumContainer from '../../PhotoActionsAlbum';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const PhotoDetailsAlbum = () => {
    const { albumId,photoId } = useParams();
    const [photo, setPhoto] = useState(null);

    // console.log(albumId)
    // console.log(photoId)


    useEffect(() => {
        axios
            .get(`http://localhost:5001/api/photo-details/${photoId}`)
            .then((res) => {
                setPhoto(res.data); 
                console.log()
            })
            .catch(err => console.error(err));
    }, [photoId,photo]);

    if (!photo) {
        return <div>Loading...</div>;
    } else if (!photo[0]) {
        return <div>Photo not found</div>;
    } else {
        
        return (

            <div>
                <PhotoActionsAlbumContainer albumId={albumId} photo={photo} />
            </div>
        );

    }

    console.log(photo)
};

export default PhotoDetailsAlbum;
