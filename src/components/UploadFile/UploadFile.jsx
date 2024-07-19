import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadFile } from '../../redux/actionCreators/fileFolderActionCreator'; 
import './UploadFile.css'; // Import CSS for modal styling

const UploadFile = ({ setIsFileUploadModalOpen, folderId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      dispatch(uploadFile(folderId, selectedFile));
      setIsFileUploadModalOpen(false);
    } else {
      alert('Please select a file to upload');
    }
  };

  

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => setIsFileUploadModalOpen(false)}>&times;</span>
        <h2>Upload File</h2>
        <input type="file" onChange={handleFileChange} />
        <button className='btn btn-primary mt-3' onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default UploadFile;
