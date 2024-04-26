import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import M from "materialize-css";
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {

    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        M.AutoInit();
    }, [])

    const handleSignup = (e) =>{
        e.preventDefault();

        navigate('/signup');
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        // const getData = async () => {
        //     try {
        //         await axios.get(`/auth`, {
        //             params: {
        //                 email: id,
        //                 password: password
        //             }
        //         }).then(res => {


        //             console.log(res.data[0].valid);

        //             if (res.data[0].valid) {

        //                 navigate('/home/photon');

        //                 Cookies.set('id', id);

        //             } else {
        //                 alert('Incorrect Credentials, Please Retry');
        //             }

        //         })

        //     } catch (error) {

        //     }
        // }

        // getData();

        if(id === "test" & password === "test"){
            navigate('/home/photon');
            Cookies.set('id', id);
        }
        else{
            alert('Incorrect Credentials, Please Retry');
        }

        console.log(`User Id: ${id}`);
        // console.log(valid);


    }

    return (
        <div className="center">
            <h1>Login Page</h1>
            <div className="container">

                <div className="dropdown-container">

                    <div className="row">
                        <form className="col s12" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setId(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">User id</label>
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

                            <button className="waves-effect waves-light btn"> Login </button>

                        </form>
                    </div>
                    <button className="waves-effect waves-light btn" onClick={handleSignup}> Signup </button>
                </div>
            </div>
        </div>

    )
}

export default Login