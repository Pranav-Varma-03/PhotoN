import React, { useEffect, useState } from "react";
import { TagsInput } from "react-tag-input-component";
import axios from "axios";
import Cookies from "js-cookie";
import M from "materialize-css";

const ShareAlbumButton = ({ albumid }) => {
    useEffect(() => {
        M.AutoInit();
    }, []);

    const usernamesArray = [];
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleSelectedUsers = (selectedUsers) => {
        setSelectedUsers(selectedUsers);
    };


    const [sharedUsers, setSharedUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = () => {
            axios
                .get('http://localhost:5001/api/album/sharedUsers', {
                    params: {
                        albumid: albumid
                    }
                })
                .then((res) => {
                    if (res.data.length > 0) {
                        const usernamesArray = res.data.map(({ username }) => username);
                        setSelectedUsers(usernamesArray);
                    }
                    setLoading(false);
                })
                .catch((err) => console.error(err));
        }

        fetchData();

    }, [albumid, sharedUsers]);

    const handleSave = () => {
        const albumId = albumid;

        console.log(selectedUsers);

        axios
            .post(`http://localhost:5001/api/album/share-photo/`, { albumId, curUsers: selectedUsers })
            .then((res) => {
                console.log('Tags updated successfully');
            })
            .catch((err) => {
                console.error('Error while updating tags status:', err);
            });
    };

    const beforeAddValidate2 = async (tag) => {
        try {
            const res = await axios.post('http://localhost:5001/api/check-username', { username: tag });
            if (res.data.exists === false) {
                alert('Username not exists.');
                return false; // Prevent adding the tag
            }
            return true; // Allow adding the tag
        } catch (err) {
            console.error('Error while checking username status:', err);
            return false;
        }
    };

    const beforeAddValidate = async (tag) => {
        try {
            const isValid = await beforeAddValidate2(tag);
    
            if (!isValid) {
                // alert('Username does not exist.');
                return false;
            } else {
                return true;
            }
        } catch (err) {
            console.error('Error validating username:', err);
            return false;
        }
    };
    
    // const beforeAddValidate =  (tag) => {
    //     return false ;
    // };



    return (
        <div>
            <button className="btn modal-trigger" data-target="ShareAlbumModel">Share Album</button>
            <div id="ShareAlbumModel" className="modal">
                <div className="modal-content">
                    <h4>Share Album</h4>
                    <TagsInput
                        value={selectedUsers}
                        onChange={handleSelectedUsers}
                        beforeAddValidate={beforeAddValidate}
                        name="tags"
                        placeHolder="Enter User names separated by commas"
                    />
                    <em>Press enter to add that user</em>
                </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat" onClick={handleSave}>Share</button>
                </div>
            </div>
        </div>
    );
};

export default ShareAlbumButton;
