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
                    // If needed, you can convert the base64 to a URL like this:
                    // url: `data:image/jpeg;base64,${photo.data}`
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

            {/* <Menu
            onClick={(key)=>{
                navigate(key)
            }}
            items={[
                {label:"All Photos", key: "/home/photon/all"},
                {label:"Shared", key: "/home/photon/share"},
                {label:"Saved", key: "/home/photon/save"},
                {label:"Favs", key: "/home/photon/fav"},
                {label:"Albums", key: "/home/photon/album"},
                {label:"Locked", key: "/home/photon/lock"},
                {label:"Bin", key: "/home/photon/bin"},
            ]}
            >
            </Menu> */}

            {/* <div className="sidebar">
                <ul>
                    <li><a href="/home/photon">All Photos</a></li>
                    <li><a href="/home/photon/share">Shared</a></li>
                    <li><a href="/home/photon/save">Saved</a></li>
                    <li><a href="/home/photon/fav">Favs</a></li>
                    <li><a href="/home/photon/album">Albums</a></li>
                    <li><a href="/home/photon/lock">Locked</a></li>
                    <li><a href="/home/photon/bin">Bin</a></li>
                </ul>
            </div> */}
            <div className="main-content">
                {/* <TextInputComponent/> */}
                <Grid photos={photos} flag={3} />
            </div>

        </div>
    )
}

export default PublicFeed;