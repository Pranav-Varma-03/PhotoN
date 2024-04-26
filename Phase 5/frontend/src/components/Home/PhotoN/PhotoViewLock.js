// import React from 'react';

// const PhotoDetails = ({ photo }) => {
//     return (
//         <div>
//             <img src={photo.url} alt={photo.alt} />
//             <p>{photo.description}</p>
//             {/* Add other details as needed */}
//         </div>
//     );
// };

// export default PhotoDetails;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PhotoActionsLockContainer from '../../PhotoActionsLock';

const PhotoDetailsLock = () => {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    // console.log(id)

    useEffect(() => {
        axios
            .get(`http://localhost:5001/api/lock/photo-details/${id}`)
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

    // console.log(photo)

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
                <PhotoActionsLockContainer photo={photo}  />
            </div>
        );

    }

    // console.log(photo)
};

export default PhotoDetailsLock;
