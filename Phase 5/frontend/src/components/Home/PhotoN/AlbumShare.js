import React, { useEffect, useState } from "react";
import axios from "axios";
import M from "materialize-css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const ShareAlbum = () => {

    const [newAlbumName, setNewAlbumName] = useState('');
    const [albums, setAlbums] = useState([]);
    const navigate = useNavigate();
    const ecookie = Cookies.get('id'); //ownerId
    // Fetch existing albums from the backend on component mount

    useEffect(() => {
        fetchAlbums();
        M.AutoInit(); // Initialize Materialize components
    }, []);

    // Function to fetch albums

    const fetchAlbums = () => {

        axios.get("http://localhost:5001/api/get/view-album-shared", {
            params: {
                username: ecookie
            }
        })
            .then((response) => {
                console.log(response);
                setAlbums(response.data);
            })
            .catch((error) => console.error("Error fetching albums:", error));
    };

    const handleAlbum = (e) => {
        navigate(`/home/photon/share/album/${e}`);
        console.log(e);
    };

    return (
        <div className="container1">
            <div className="center">ALBUMS PAGE</div>
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
        </div>
    );
};

export default ShareAlbum;
