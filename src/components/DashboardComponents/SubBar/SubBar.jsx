import React, { useState } from 'react';
import './SubBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faFolderPlus, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { query, collection, getDocs, where } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { setSearchResults } from '../../../redux/actionCreators/fileFolderActionCreator';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SubBar = ({ setIsCreateFolderModalOpen, setIsFileUploadModalOpen }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();

 

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/'); // Redirect to the login or register page
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  const handleSearch = async () => {
    if (!searchTerm) return;

    // Query Firestore for folders and files matching the search term
    const folderQuery = query(collection(db, "folders"), where("name", "==", searchTerm));
    const fileQuery = query(collection(db, "files"), where("name", "==", searchTerm));

    const folderSnapshots = await getDocs(folderQuery);
    const fileSnapshots = await getDocs(fileQuery);

    const folders = folderSnapshots.docs.map(doc => ({ docId: doc.id, data: doc.data() }));
    const files = fileSnapshots.docs.map(doc => ({ docId: doc.id, data: doc.data() }));

    // Combine folders and files into a single array
    const results = [...folders, ...files];

    // Dispatch search results to Redux store
    dispatch(setSearchResults(results));

    setSearchTerm('');
  };

  return (
    <nav className="subbar navbar navbar-expand-lg navbar-light bg-white px-4 mg-2 mb-10">
      <ul className='navbar-nav me-5'>
        <li className='nav-item mx-2'>
          <button className='btn btn-outline-dark' onClick={() => setIsFileUploadModalOpen(true)}>
            <FontAwesomeIcon icon={faFileUpload} /> &nbsp;
            Upload File 
          </button>
        </li>
        <li className='nav-item mx-2'>
          <button className='btn btn-outline-dark' onClick={() => setIsCreateFolderModalOpen(true)}>
            <FontAwesomeIcon icon={faFolderPlus} /> &nbsp;
            Create Folder
          </button>
        </li>
      </ul>
      
      <form className="d-flex ms-auto">
        <input
          className="form-control form-control-sm me-2"
          type="search"
          placeholder="Search files..."
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-outline-dark btn-sm" type="button" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      
      <div className="d-flex align-items-center">
        <button className='btn btn-outline-dark btn-sm'>
          <FontAwesomeIcon icon={faTrash} /> Delete
        </button>
        
      </div>

      <button className='btn' type='button' onClick={handleLogOut}> Logout</button>
    </nav>
  );
};

export default SubBar;
