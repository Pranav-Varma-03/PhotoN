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

      image.onload = () => {
        var type = e.target.files[0].type; // Get the MIME type of the file
        var resolution = image.width + 'x' + image.height; // Get the resolution of the image
        var size = e.target.files[0].size;

        console.log('Type:', type);
        setType(type);
        // console.log('Resolution:', resolution);
        setResolution(resolution);
        // console.log('Base64 Data:', reader.result);
        setBase64(reader.result);
        // console.log(`inside fn64: ${base64}`)
        setSize(size);
        
      };
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleChange = () => {
    // e.preventDefault();

    const ecookie = Cookies.get('id'); //ownerId
    // const formData = new FormData();    

    
    // console.log(`image value: ${base64}`)

    // formData.append("photo", base64);
    // formData.append('ownerUserId', ecookie);
    // formData.append('resolution', resolution);
    // formData.append('size', size);
    // formData.append('type', type);
    
    // console.log(e.target.files[0])
    // console.log(formData)

    axios
      .post("http://localhost:5001/api/save", {
          photo: base64,
          ownerUserId: ecookie,
          resolution: resolution,
          size: size,
          type: type,
      })
      .then((res) => {
        // console.log(res.data);
        setUpdateUI(res.data._id);
        
      })
      .catch((err) => console.log(err));
  };

  // return (
  //   <label className="button" htmlFor="file_picker">
  //   UPLOAD IMAGE
  //     <input
  //       hidden
  //       type="file"
  //       name="file_picker"
  //       id="file_picker"
  //       onChange={(e) => {
  //         convertIntoBase64(e);
  //         handleChange();
  //       }}
  //       // onChange={convertIntoBase64}
  //     />
  //     {/* <button onClick={handleChange}>Upload Image</button> */}
  //   </label>
  // );

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