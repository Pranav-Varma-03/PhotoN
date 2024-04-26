import { useEffect, useState } from "react";
import Grid from "../../Grid.js";
import axios from "axios";
import React from 'react';

const PublicFeed = () => {

    const [photos, setPhotos] = useState([]);
    const [tagFilter, setTagFilter] = useState('');
    const [filteredPhotos, setFilteredPhotos] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5001/api/getGlobal")
            .then((res) => {
                console.log(res.data);
                // Process the data if necessary, e.g., convert it to URLs or keep as base64
                const processedPhotos = res.data.map(photo => ({
                    ...photo,

                }));
                setPhotos(processedPhotos);
                setFilteredPhotos(processedPhotos);
                console.log(photos[0])
            })
            .catch((err) => console.log(err));
    }, []);

    const handleFilter = () => {
        const newFilteredPhotos = photos.filter(photo =>
            photo.tags.includes(tagFilter)
        );
        setFilteredPhotos(newFilteredPhotos); // Update filtered photos with the new filter
    };

    return (
        <div className="center">

            <div className="main-content">
                {/* <TextInputComponent/> */}
                <Grid photos={photos} flag={3} />
            </div>

        </div>
    )
}

export default PublicFeed;