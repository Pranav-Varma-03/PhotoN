import React, { useEffect, useState } from "react";
import { TagsInput } from "react-tag-input-component";
import axios from "axios";
import Cookies from "js-cookie";
import M from "materialize-css";

const EditTags = ({tags,photoid}) => {

    useEffect(() => {
        // Initialize Materialize components
        M.AutoInit();
    }, []);

    const [selectedTags, setSelectedTags] = useState(tags || []);

    const handleTagChange = (tags) => {
        setSelectedTags(tags);
    }; 
 
    const handleSave = () => {

        console.log(selectedTags);
        const photoId = photoid; // Assuming you have a unique identifier for the photo
        const isCurrentTags =  selectedTags;

      axios
        .put(`http://localhost:5001/api/photo/${photoId}/edit-tags/`, { curTags: selectedTags })
        .then((res) => {
          console.log('Tags updated successfully');
          // navigate(-1); // Equivalent to goBack()
        })
        .catch((err) => {
          console.error('Error while updating tags status:', err);
        });
        
      }; 
 
    return (
        <div>
            <button className="btn modal-trigger" data-target="editTagsModal"><i className="fas fa-edit"></i></button>
            <div id="editTagsModal" className="modal">
                <div className="modal-content">
                    <h4>Edit Tags</h4>
                    <TagsInput
                        value={selectedTags}
                        onChange={handleTagChange}
                        name="tags"
                        placeHolder="Enter tags separated by commas"
                    />
                    <em>Press Enter to add a new tag</em>
                </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default EditTags;


