import { useEffect, useState } from "react";
import Grid from "../../Grid.js";
import axios from "axios";
import React from "react";

const Lock = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (authenticated) {
      axios
        .get("http://localhost:5001/api/get/lock")
        .then((res) => {
          console.log(res.data);

          const processedPhotos = res.data.map((photo) => ({
            ...photo,
          }));

          setPhotos(processedPhotos);
          console.log(photos[0]);
        })
        .catch((err) => console.log(err));
    }
  }, [authenticated]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here you can add your password validation logic
    if (password === "LOCK") {
      setAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  return (
    <div className="center">
      {!authenticated ? (
        <div className="container">
        <form className="col s12" onSubmit={handleFormSubmit}>
            <div className="row">
                <div className="input-field col s12">
                    {/* <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setPassword(e.target.value) }}></textarea> */}
                    <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    />
                    <label htmlFor="textarea1">Password</label>
                </div>
            </div>

            <button className="waves-effect waves-light btn"> Submit </button>
        </form>
        </div>
      ) : (
        <Grid photos={photos} flag={2} />
      )}
    </div>
  );
};

export default Lock;
