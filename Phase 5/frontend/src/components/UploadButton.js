import React, { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import axios from "axios";
import Cookies from "js-cookie";

import M from "materialize-css";

const Button = ({ setUpdateUI }) => {

  useEffect(() => {
    // Initialize Materialize components
    M.AutoInit();
}, []);

  const [type,setType] = useState("");
  const [resolution,setResolution] = useState("");
  const [size,setSize] = useState("");
  const [base64,setBase64] = useState("");
  const [gpsData, setGpsData] = useState("");

  const getGPSData = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          
          const { latitude, longitude } = position.coords;
          console.log("Location is: ",latitude, longitude)
          setGpsData(`${latitude} ${longitude}`);
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const convertIntoBase64 = (e) => {
    const file = e.target.files[0];
    console.log("File Binarystring:",file) ;
    if (file.size > 10000000) { // 10MB limit, for example
      alert('File size exceeds maximum limit of 10MB.');
      return;
    }
    var reader = new FileReader();

    reader.onload = () => {
      var image = new Image();
      image.src = reader.result;

      image.onload = async () => {
        var type = e.target.files[0].type; // Get the MIME type of the file
        var resolution = image.width + 'x' + image.height; // Get the resolution of the image
        var size = e.target.files[0].size;

        console.log('Type:', type);
        setType(type);
        
        setResolution(resolution);
        
        setBase64(reader.result);
        
        setSize(size);
        const a = await getGPSData();
        console.log("Location data is: ", gpsData)
      };
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleChange = () => {

    const ecookie = Cookies.get('id'); 
    axios
      .post("http://localhost:5001/api/save", {
          photo: base64,
          ownerUserId: ecookie,
          resolution: resolution,
          size: size,
          type: type,
          gpsData: gpsData
      })
      .then((res) => {
        // console.log(res.data);
        setUpdateUI(res.data._id);
        
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
    <a className="waves-effect waves-light btn modal-trigger" href="#modal1">UPLOAD IMAGE</a>

    <div id="modal1" className="modal">
      <div className="modal-content">
      <span className="black-text">Select Image to Upload</span>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <label className="button" htmlFor="file_picker">
          Browse
          <input
            hidden
            type="file"
            name="file_picker"
            id="file_picker"
            onChange={(e) => {
              convertIntoBase64(e);
            }}
          />
        </label>
      </div>
      </div>
      <div className="modal-footer">
        <button onClick={handleChange}>Upload Image</button>
      </div>
    </div>
  </div>
  );
};

export default Button;