import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import M from "materialize-css";
import axios from 'axios';


const Signup = () => {

    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        M.AutoInit();
    }, [])

    const handleSubmit = (e) => {

        e.preventDefault();

        const getData = async () => {
            try {
                await axios.post("http://localhost:5001/api/adduser", {
                    username: id,
                    password: password,
                }).then(res => {

                    console.log(res.data.valid);
                    
                    if (res.data.valid) {
                        alert('User Successfully Added');
                        navigate('/login');

                    } else {
                        alert('Incorrect Credentials, Please Retry');
                        setId('')
                        setPassword('')
                    }

                })

            } catch (error) {

            }
        }

        getData();

    }

    return (
        <div className="center">
            <h1>Create New User</h1>
            <div className="container">

                <div className="dropdown-container">

                    <div className="row">
                        <form className="col s12" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setId(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">Enter User Name</label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    {/* <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setPassword(e.target.value) }}></textarea> */}
                                    <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                    <label htmlFor="textarea1">Password</label>
                                </div>
                            </div>

                            <button className="waves-effect waves-light btn"> Signup </button>

                        </form>
                    </div>
                </div>
            </div>
            <h5>More Personal Details are to be added in Edit Profile Section</h5>
        </div>

    )
}

export default Signup