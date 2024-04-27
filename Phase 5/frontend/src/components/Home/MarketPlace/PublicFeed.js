import { useEffect, useState } from "react";
import Grid from "../../Grid.js";
import axios from "axios";
import React from 'react';

const PublicFeed = () => {

    const [photos, setPhotos] = useState([]);
    const [tagFilter, setTagFilter] = useState('');
    const [filteredPhotos, setFilteredPhotos] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true); // Loading state

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
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSearch = () => {
        setLoading(true)
        axios.get("http://localhost:5001/api/getTagsPhotoSearch", {
            params: { search: searchText }
        })
            .then((res) => {
                
                setTagFilter(res.data);
                const newFilteredPhotos = photos.filter(photo =>
                    photo.tags.some(tag => res.data.includes(tag))
                );
                console.log("The filtered photo list is: ")
                console.log(newFilteredPhotos);
                setFilteredPhotos(newFilteredPhotos);
                setLoading(false)
            })
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
            <div className="main-content">
            <input
                    type="text"
                    placeholder="Description of Photo for search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                {loading ? (
                    <div>
                        <h3>
                        Loading...
                        </h3>
                    </div>
                ) : (
                    searchText === '' ? (
                        <Grid photos={photos} flag={3} />
                    ) : (
                        filteredPhotos.length > 0 ? (
                            <Grid photos={filteredPhotos} flag={3} />
                        ) : (
                            <div><h3>No Photos for the search</h3></div>
                        )
                    )
                )}
            </div>
        </div>
    )
}

export default PublicFeed;