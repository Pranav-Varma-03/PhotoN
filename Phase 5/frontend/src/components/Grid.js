import React from "react";
import { Link } from "react-router-dom";

const Grid = ({ photos, flag, albumId}) => {
  let gridContent;

  if (flag === 0) {
    gridContent = (
      <div className="grid-container">
        {photos.map(photo => (
          <Link to={`/home/photon/photo-details/${photo._id}`} key={photo._id}>
            <img src={`${photo.data}`} alt="Uploaded" />
          </Link>
        ))}
      </div>
    );
  }
  
  if (flag === 3) {
    gridContent = (
      <div className="grid-container">
        {photos.map(photo => {
          console.log("Rendering photo with ID:", photo._id);  // Log each photo ID
          return (
            <Link to={`/home/marketplace/publicfeed/photo-details/${photo._id}`} key={photo._id}>
              <img src={`${photo.photo}`} alt="Uploaded" />
            </Link>
          );
        })}
      </div>
    );
  }
  

  if (flag === 1) {
    gridContent = (
      <div className="grid-container">
        {photos.map(photo => (
          <Link to={`/home/photon/bin/photo-details/${photo._id}`} key={photo._id}>
            <img src={`${photo.data}`} alt="Uploaded" />
          </Link>
        ))}
      </div>
    );
  }
  if (flag === 2) {
    gridContent = (
      <div className="grid-container">
        {photos.map(photo => (
          <Link to={`/home/photon/lock/photo-details/${photo._id}`} key={photo._id}>
            <img src={`${photo.data}`} alt="Uploaded" />
          </Link>
        ))}
      </div>
    );
  }

  if (flag === 4) {
    gridContent = (
      <div className="grid-container">
        {photos.map(photo => (
          <Link to={`/home/photon/album/photo-details/${albumId}/${photo._id}`} key={photo._id}>
            <img src={`${photo.data}`} alt="Uploaded" />
          </Link>
        ))}
      </div>
    );
  }



  return gridContent;
};

export default Grid;

