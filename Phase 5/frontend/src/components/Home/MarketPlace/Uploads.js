import { useEffect, useState } from "react";
import Grid from "../../Grid.js";
import axios from "axios";
import React from 'react';
import Cookies from 'js-cookie'

const Uploads = () => {
    const [photos, setPhotos] = useState([]);
    const [tagFilter, setTagFilter] = useState('');
    const [filteredPhotos, setFilteredPhotos] = useState([]);
    const ecookie = Cookies.get('id')

    useEffect(() => {
        axios
            .get(`http://localhost:5001/api/getGlobalUploads/${ecookie}`)
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
            <div className="sidebar">
            <ul>
                <li><a href="/home/marketplace">Global Fav</a></li>
                <li><a href="/home/marketplace/publicfeed">Public Feed</a></li>
                <li><a href="/home/marketplace/uploads">My Uploads</a></li>
            </ul>
            </div>
            
            <div>
                {
                    photos.length > 0 ? (
                        <Grid photos={photos} flag={5} />
                    ):(
                        <h3>No Photos</h3>
                    )
                }
                
            </div>

        </div>
    )
}

export default Uploads;