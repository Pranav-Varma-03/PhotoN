import React, { useEffect, useState } from "react";
import axios from "axios";
import M from "materialize-css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const ShareAlbum = () => {
    const [loading, setLoading] = useState(true); // Loading state
    const [newAlbumName, setNewAlbumName] = useState('');
    const [albums, setAlbums] = useState([]);
    const navigate = useNavigate();
    const ecookie = Cookies.get('id'); // ownerId

    useEffect(() => {
        fetchAlbums();
        M.AutoInit(); // Initialize Materialize components
    }, []);

    // Function to fetch albums
    const fetchAlbums = () => {
        setLoading(true); // Set loading state to true before fetching albums
        axios.get("http://localhost:5001/api/get/view-album-shared", {
            params: {
                username: ecookie
            }
        })
            .then((response) => {
                console.log(response);
                setAlbums(response.data);
                setLoading(false); // Set loading state to false after fetching albums
            })
            .catch((error) => {
                console.error("Error fetching albums:", error);
                setLoading(false); // Set loading state to false if there's an error
            });
    };

    const handleAlbum = (e) => {
        navigate(`/home/photon/share/album/${e}`);
        console.log(e);
    };

    return (
        <div className="container">
            <div className="center">ALBUMS PAGE</div>
            {loading ? ( // Conditionally render loading message
                <h3>Loading...</h3>
            ) : (
                <div>
                    <h5>Existing Albums:</h5>
                    {albums.length > 0 ? (
                        albums.map((album, index) => (
                            <button key={index} className="waves-effect waves-light btn" onClick={() => handleAlbum(album._id)}>
                                {album.vaultName}
                            </button>
                        ))
                    ) : (
                        <p>No albums found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ShareAlbum;
