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

const HomePhotoN = () => {
    const ecookie = Cookies.get('id');
    const [photos, setPhotos] = useState([]);
    const [tagFilter, setTagFilter] = useState('');
    const [filteredPhotos, setFilteredPhotos] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [mapPhotos, setMapPhotos] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:5001/api/get",{
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
                        iconUrl: photo.data ,
                        iconSize: [25, 25], // You can adjust the size as needed
                        iconAnchor: [12, 12], // Adjust based on your icon dimensions
                        popupAnchor: [1, -25] // Adjust based on your icon dimensions
                    })
                }));
                setPhotos(processedPhotos);
                setFilteredPhotos(processedPhotos);
                setMapPhotos(aggregatePhotosByLocation(processedPhotos));
                console.log(photos[0])
            })
            .catch((err) => console.log(err));
    }, [photos]);

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
                        {mapPhotos.map((location, idx) => (
                            <Marker key={idx} position={location.coordinates} icon={location.photos[0].icon}>
                                <Popup>
                                    {location.photos.map((photo, index) => (
                                        <img key={index} src={photo.data} alt={photo._id} style={{ width: '100px', height: 'auto' }} />
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