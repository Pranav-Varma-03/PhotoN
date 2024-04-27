import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import M from "materialize-css";
import axios from 'axios';
import Cookies from 'js-cookie';
import UserTags from "./UserTagsButton";

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
        <div className="container1 center">
            {loading ? (
                <p>Loading...</p>
            ) : !authenticated ? (
                <div className="container">
                    <form className="col s12" onSubmit={handleValidateFormSubmit}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={handleValidate}
                                />
                                <label htmlFor="textarea1">Password</label>
                            </div>
                        </div>
                        <button className="waves-effect waves-light btn"> Submit </button>
                    </form>
                </div>
            ) : (
                <div>
                    <div className="container">
                        <h3>Edit User Profile</h3>
                    </div>
                    <div className="container">
                        <UserTags tags = {tags} userid={ecookie}/>
                    </div>
                    <div className="container">
                        <form className="col s12" onSubmit={handleUpdateLockFormSubmit}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input
                                        type="password"
                                        value={newLockPwd}
                                        onChange={handleUpdateLockSubmit}
                                    />
                                    <label htmlFor="textarea1">Lock Folder Password</label>
                                </div>
                            </div>
                            <button className="waves-effect waves-light btn"> Update </button>
                        </form>
                    </div>

                    <div className="container">
                        <form className="col s12" onSubmit={handleUpdatePwdFormSubmit}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input
                                        type="password"
                                        value={newPwd}
                                        onChange={handleUpdatePwdSubmit}
                                    />
                                    <label htmlFor="textarea1">Profile Password</label>
                                </div>
                            </div>
                            <button className="waves-effect waves-light btn"> Update </button>
                        </form>
                    </div>

                </div>
            )}
        </div>
    )
}

export default UserProfile