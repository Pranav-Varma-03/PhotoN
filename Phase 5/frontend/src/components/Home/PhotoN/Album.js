import React, { useEffect, useState } from "react";
import axios from "axios";
import M from "materialize-css";
import { useNavigate } from "react-router";
import Cookies from 'js-cookie';
import './css_to_photoN/album.css'

const AlbumManager = () => {
  const ecookie = Cookies.get('id');
  const [newAlbumName, setNewAlbumName] = useState('');
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch existing albums from the backend on component mount
  useEffect(() => {
    fetchAlbums();
    M.AutoInit(); // Initialize Materialize components
  }, []);

  // Function to fetch albums
  const fetchAlbums = () => {
    setLoading(true); // Set loading state to true before fetching albums
    axios.get("http://localhost:5001/api/getAlbums",{
      params:{
        ownerUserId:ecookie,
      }
    })
      .then((response) => {
        setAlbums(response.data);
        setLoading(false); // Set loading state to false after fetching albums
      })
      .catch((error) => {
        console.error("Error fetching albums:", error);
        setLoading(false); // Set loading state to false if there's an error
      });
  };

  // Function to handle the creation of a new album
  const handleCreateAlbum = () => {
    if (!newAlbumName.trim()) {
      alert("Please enter an album name.");
      return;
    }
    axios.post("http://localhost:5001/api/album", {
        ownerUserId: ecookie,
        vaultName: newAlbumName,
    })
    .then((response) => {
      fetchAlbums(); // Refresh the album list
      setNewAlbumName(''); // Clear input field
      alert("Album created successfully!");
    })
    .catch((error) => console.error("Error creating album:", error));
  };

  const handleAlbum = (e) => {
    navigate(`/home/photon/album/${e}`);
    console.log(e);
  };

  return (
    <div className="container">
      <div className="center">ALBUMS PAGE</div>
      <div className="input-field">
        <input
          type="text"
          id="album_name"
          value={newAlbumName}
          onChange={(e) => setNewAlbumName(e.target.value)}
          placeholder="Enter new album name"
        />
        <button className="waves-effect waves-light btn" onClick={handleCreateAlbum}>
          Create Album
        </button>
      </div>
      <div className="input-field">
        {loading ? (
          <h3>Loading...</h3> // Display loading message while fetching albums
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default AlbumManager;
