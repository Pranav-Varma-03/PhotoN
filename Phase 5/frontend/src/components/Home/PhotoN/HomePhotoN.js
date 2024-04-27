import { useEffect, useState } from "react";
import Grid from "../../Grid.js";
import axios from "axios";
import React from 'react';
import { TagsInput } from "react-tag-input-component";
import PhotoDetails from './PhotoView.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const HomePhotoN = () => {

    const [photos, setPhotos] = useState([]);
    const [tagFilter, setTagFilter] = useState('');
    const [filteredPhotos, setFilteredPhotos] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [mapPhotos, setMapPhotos] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5001/api/get")
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
                setFilteredPhotos(processedPhotos);
                setMapPhotos(processedPhotos.filter(photo => photo.coordinates.length === 2));
                console.log(photos[0])
            })
            .catch((err) => console.log(err));
    }, [photos]);

    const handleFilter = () => {
        const newFilteredPhotos = photos.filter(photo =>
            photo.tags.some(tag => tagFilter.includes(tag))
        );
        setFilteredPhotos(newFilteredPhotos); // Update filtered photos with the new filter
    };

    const handleSearch = () => {
        axios.get("http://localhost:5001/api/getTagsPhotoSearch", {
            params: { search: searchText }
        })
            .then((res) => {
                // console.log("Tag Generation Done");
                // console.log(res.data);
                // console.log(res.data);
                setTagFilter(res.data);
                // console.log(tagFilter);


                const newFilteredPhotos = photos.filter(photo =>
                    photo.tags.some(tag => res.data.includes(tag))
                );

                console.log(newFilteredPhotos);
                setFilteredPhotos(newFilteredPhotos); // Update filtered photos with the new filter
                // Here you need to set the filteredPhotos variable with the response from http://localhost:5001/api/get
                // Do modfications in the UploadRoute.js 
            })
    };

    return (
        <div className="center">
            <div className="sidebar">
                <ul>
                    <li><a href="/home/photon">All Photos</a></li>
                    <li><a href="/home/photon/share">Shared</a></li>
                    <li><a href="/home/photon/save">Saved</a></li>
                    <li><a href="/home/photon/fav">Favs</a></li>
                    <li><a href="/home/photon/album">Albums</a></li>
                    <li><a href="/home/photon/lock">Locked</a></li>
                    <li><a href="/home/photon/bin">Bin</a></li>
                </ul>
            </div>
            <div className="main-content">
                {/* <TextInputComponent/> */}
                <input
                    type="text"
                    placeholder="Description of Photo for search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                <div>
                    {searchText === '' ? (
                        <Grid photos={photos} flag={0} />
                    ) : (
                        <Grid photos={filteredPhotos} flag={5} />
                    )}
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

        </div>
    )
}

export default HomePhotoN;