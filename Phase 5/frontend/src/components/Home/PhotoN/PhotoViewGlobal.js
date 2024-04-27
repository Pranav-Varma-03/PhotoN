import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import GlobalPhotoActionsContainer from '../../PhotoActionsGlobal';
import './css_to_photoN/photoView.css'

const GlobalPhotoDetails = () => {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    // console.log(id) 

    useEffect(() => {
        axios
            .get(`http://localhost:5001/api/global/photo-details/${id}`)
            .then((res) => {
                // console.log(res.data);

                // const processedPhotos = res.data.map(photo => ({
                //     ...photo,
                //   }));

                setPhoto(res.data);
                // console.log(photo)
            })
            .catch(err => console.error(err));
    }, [id,photo]);

    if (!photo) {
        return <div>Loading</div>;
    } else if (!photo) {
        return <div>Photo not found</div>;
    } else {
        return (
            <div className='container3'>
                <GlobalPhotoActionsContainer photo={photo}  />
            </div>
        );

    }
};

export default GlobalPhotoDetails;
