import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PhotoActionsContainer from '../../PhotoActions';

const PhotoDetails = () => {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    // console.log(id)

    useEffect(() => {
        axios
            .get(`http://localhost:5001/api/photo-details/${id}`)
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
        return <div>Loading...</div>;
    } else if (!photo[0]) {
        return <div>Photo not found</div>;
    } else {
        return (
            <div>
                {/* <img src={photo[0].data} alt="Uploaded" />
                <p>Resolution: {photo[0].resolution}</p>
                <p>Size: {photo[0].size}</p>
                <p>Type: {photo[0].type}</p>
                Add other photo details as needed */}
                <PhotoActionsContainer photo={photo}  />
            </div>
        );

    }

    // console.log(photo)
};

export default PhotoDetails;
