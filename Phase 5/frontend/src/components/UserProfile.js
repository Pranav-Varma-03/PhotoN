import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import M from "materialize-css";
import axios from 'axios';
import Cookies from 'js-cookie';
import UserTags from "./UserTagsButton";
import './uP.css'

const UserProfile = () => {

    const navigate = useNavigate();
    const ecookie = Cookies.get('id');
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [newLockPwd,setNewLockPwd] = useState('');
    const [newPwd,setNewPwd] = useState('');
    const [loading, setLoading] = useState(false); 
    const [tags, setTags] = useState([]);

    useEffect(() => {
        M.AutoInit();
    }, [])


    const handleUpdateLockSubmit = (e) =>{
        setNewLockPwd(e.target.value);
    }

    const handleUpdatePwdSubmit = (e) =>{
        setNewPwd(e.target.value);
    }

    const handleValidate = (e) => {
      setPassword(e.target.value);
    };

    const handleUpdatePwdFormSubmit = (e) =>{
        e.preventDefault();

        const updatePasswordfn = () =>{
        axios
        .put(`http://localhost:5001/api/user/updatePwd/${ecookie}`, { password: newPwd })
        .then((res) => {
          console.log('Password updated successfully');
          // navigate(-1); // Equivalent to goBack()
          alert('Profile Password Successfully');
          setNewPwd('');
        })
        .catch((err) => {
          console.error('Error while updating tags status:', err);
        });
        }

        updatePasswordfn()
        console.log("Updating User Lock Password.")
    }

    const handleUpdateLockFormSubmit = (e) =>{
        e.preventDefault();

        const updateLockPasswordfn = () =>{
        axios
        .put(`http://localhost:5001/api/user/updateLockPwd/${ecookie}`, { lockedFolderPassword: newLockPwd })
        .then((res) => {
          console.log('Password updated successfully');
          // navigate(-1); // Equivalent to goBack()
          alert('Updated Lock Password Successfully');
          setNewLockPwd('');
        })
        .catch((err) => {
          console.error('Error while updating tags status:', err);
        });
        }

        updateLockPasswordfn()
        console.log("Updating User Lock Password.")
    }

    const handleValidateFormSubmit = (e) => {
      e.preventDefault();
      // Here you can add your password validation logic
      setLoading(true) 
      const getData = async () => {
        try {
            await axios.get(`http://localhost:5001/api/userprofile/validation`, {
                params: {
                    username: ecookie,
                    password: password,
                }
            }).then(res => {
                console.log(res.data)
                const { valid, interestTags } = res.data;

                if (valid) {
                    setAuthenticated(true);
                    setTags(interestTags);
                } else {
                    alert('Incorrect Credentials, Please Retry');
                }
            })

        } catch (error) {
            console.error('Validation error:', error);
        }
        console.log(authenticated)
        setLoading(false); // Set loading back to false after validation
    }

    getData();

    };

    return (
        <div className="container5 center">
            {loading ? (
                <p>Loading...</p>
            ) : !authenticated ? (
                <div className="container6 center">
                     <p>Hello {ecookie}</p>
                    <form  onSubmit={handleValidateFormSubmit}>
                            <div className="search-container center">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={handleValidate}
                                />
                                <label htmlFor="textarea1">Password</label>
                            </div>
                        <button className="waves-effect waves-light btn"> Submit </button>
                    </form>
                </div>
            ) : (
                <div>
                    <div className="container6">
                        <h3>Edit User Profile</h3>
                    </div>
                    <div className="container6">
                        <UserTags tags = {tags} userid={ecookie}/>
                    </div>
                    <div className="container6">
  <div className="input-field-container">
    <input
      type="password"
      placeholder="Locked Folder Password"
      className="password-input"
      value={newLockPwd}
      onChange={handleUpdateLockSubmit}
    />
    <button
      className="update-button waves-effect waves-light btn"
      onClick={handleUpdateLockFormSubmit} // Use an onClick event to submit
    >
      Update
    </button>
  </div>
</div>

<div className="container6">
  <div className="input-field-container">
    <input
      type="password"
      placeholder="Profile password"
      className="password-input"
      value={newPwd}
      onChange={handleUpdatePwdSubmit}
    />
    <button
      className="update-button waves-effect waves-light btn"
      onClick={handleUpdatePwdFormSubmit} // Assume this is your event handler for button click
    >
      Update
    </button>
  </div>
</div>

                </div>
            )}
        </div>
    )
}

export default UserProfile