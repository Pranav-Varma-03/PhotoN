import { useEffect, useState } from "react";
import Grid from "../../Grid.js";
import axios from "axios";
import React from 'react';
import { TagsInput } from "react-tag-input-component";
import PhotoDetails from './PhotoView.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './css_to_photoN/homePhotoN.css'
import Cookies from "js-cookie";
import { useParams, Link } from 'react-router-dom';

const HomePhotoN = () => {
    const ecookie = Cookies.get('id');
    const [loading, setLoading] = useState(true); // Loading state
    const [photos, setPhotos] = useState([]);
    const [tagFilter, setTagFilter] = useState('');
    const [filteredPhotos, setFilteredPhotos] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchClick,setSearchClick] = useState(false)
    const [mapPhotos, setMapPhotos] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5001/api/get", {
                params: {
                    username: ecookie,
                }
            })
            .then((res) => {
                console.log(res.data);
                // Process the data if necessary, e.g., convert it to URLs or keep as base64
                const processedPhotos = res.data.map(photo => ({
                    ...photo,
                    coordinates: photo.gpsData.split(' ').map(coord => parseFloat(coord)),

                    icon: new L.Icon({
                        // iconUrl: `data:image/${photo.type};base64,${photo.data}`, // Use photo.type to get the MIME type
                        iconUrl: photo.data,
                        iconSize: [40, 40], // You can adjust the size as needed
                        iconAnchor: [12, 12], // Adjust based on your icon dimensions
                        popupAnchor: [1, -25] // Adjust based on your icon dimensions
                    })
                }));
                setPhotos(processedPhotos);
                // setFilteredPhotos(processedPhotos);
                setMapPhotos(aggregatePhotosByLocation(processedPhotos));
                console.log(photos[0])
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, []); // Include ecookie in dependency array

    const aggregatePhotosByLocation = (photos) => {
        const locations = {};
        photos.forEach(photo => {
            const coordKey = photo.coordinates.join(',');
            if (!locations[coordKey]) {
                locations[coordKey] = {
                    coordinates: photo.coordinates,
                    photos: []
                };
            }
            locations[coordKey].photos.push(photo);
        });
        return Object.values(locations);
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

            setSearchClick(true)
    };

    return (
    <div className="center">
        <div className="main-content">
            <input
                type="text"
                placeholder="Description of Photo for search"
                value={searchText}
                onChange={(e) => {setSearchText(e.target.value);setSearchClick(false)}}
            />
            <button onClick={handleSearch}>Search</button>
            {loading ? (
                <div>
                    <h3>Loading...</h3>
                </div>
            ) : (
                <div>
                    {searchText === '' ? (
                        photos.length > 0 ? (
                            <Grid photos={photos} flag={0} />
                        ) : (
                            <h3>No Photos</h3>
                        )
                    ) : searchClick ? (
                        filteredPhotos.length > 0 ? (
                            <Grid photos={filteredPhotos} flag={7} />
                        ) : (
                            <h3>No Photos</h3>
                        )
                    ): (
                        <h3>Searching..</h3>
                    )}
                </div>
            )}
            {mapPhotos.length > 0 && (
                <MapContainer center={[mapPhotos[0].coordinates[0], mapPhotos[0].coordinates[1]]} zoom={5} style={{ height: '400px', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {mapPhotos.map((location, idx) => (
                        <Marker key={idx} position={location.coordinates} icon={location.photos[0].icon}>
                            <Popup>
                                {location.photos.map((photo, index) => (
                                    <Link to={`/home/photon/photo-details/${photo._id}`}>
                                        <img src={photo.data} alt={`No photo to display`} style={{ width: '100px', height: 'auto' }} />
                                    </Link>
                                ))}
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
