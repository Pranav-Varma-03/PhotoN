import React, { useEffect, useState } from "react";
import axios from "axios";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import M from "materialize-css";
import Cookies from "js-cookie";
import Select from 'react-select'

const AddtoAlbumButton = (photoId)=> {
  const ecookie = Cookies.get('id');
  const [albumId,setAlbumId] = useState("")
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    M.AutoInit();
  }, []);

  useEffect(()=>{
    const fetchAlbums = () => {
      axios.get("http://localhost:5001/api/getAlbums/withoutimage",{
        params: {
          ownerUserId:ecookie,
          photoId: photoId.photoid
        }
      }).then((response) => {
          setAlbums(response.data);
        })
        .catch((error) => console.error("Error fetching albums:", error));
    };

    fetchAlbums();
  },[])


  const options = albums.map((album) => ({
    value: album._id,
    label: album.vaultName
  }));

  const handleAddToAlbum = () => {
    console.log(`Clicked Add Button ${albumId}`);

    axios
    .put(`http://localhost:5001/api/album/addimage`, { 
      albumId: albumId,
      photoId: photoId.photoid
    
  }).then((res) => {
    console.log('Response:', res.data);
    alert('Photo added to album successfully');
    // You can perform additional actions here if needed
  })
  .catch((err) => {
    console.error('Error while adding photo to album:', err);
    alert('Error adding photo to album');
  });

  };

  const handleClickAlbum = (e) =>{
    setAlbumId(e.value)
    console.log(albumId)
  }

  return (

  <div>
   <button className="btn modal-trigger" data-target="modal2">Copy to Album</button>

    <div id="modal2" className="modal">
      <div className="modal-content">
        {/* <div className="App">
          <header className="App-header">
            <div style={{ width: 400 }}>
              <ReactSearchAutocomplete
                items={items}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                formatResult={formatResult}
              />
            </div>
          </header>
        </div> */}
        <Select 
        options={options} 
        onChange={handleClickAlbum}  
        />
      </div>
      <div className="modal-footer">
        <button onClick={handleAddToAlbum}>Add</button>
      </div>
    </div>
  </div>
  )
}

export default AddtoAlbumButton