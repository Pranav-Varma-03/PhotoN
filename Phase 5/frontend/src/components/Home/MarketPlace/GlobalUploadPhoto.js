import { useEffect, useState } from "react";
import Grid from "../../Grid.js";
import axios from "axios";
import React from 'react';
import { useParams } from 'react-router-dom';
import GlobalUploadPhotoActionsContainer from '../../PhotoActionsUploadedGlobal.js'
const GlobalUploadPhotoDetails = () => {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:5001/api/global/photo-details/${id}`)
            .then((res) => {
                setPhoto(res.data);
            })
            .catch(err => console.error(err));
    }, [id,photo]);
    if (!photo) {
        return <div>Loading</div>;
    } else if (!photo) {
        return <div>Photo not found</div>;
    } else {
        return (
            <div>
                <GlobalUploadPhotoActionsContainer photo={photo}  />
            </div>
        );

    }
}

export default GlobalUploadPhotoDetails;