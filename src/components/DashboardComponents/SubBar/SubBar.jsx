import React, { useState } from 'react';
import './SubBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faFolderPlus, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { query, collection, getDocs } from 'firebase/firestore';
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
  
    console.log('Searching for:', searchTerm);
  
    try {
      const folderQuery = query(collection(db, "folders"));
      const fileQuery = query(collection(db, "files"));
  
      const [folderSnapshots, fileSnapshots] = await Promise.all([
        getDocs(folderQuery),
        getDocs(fileQuery)
      ]);
  
      const folders = folderSnapshots.docs.map(doc => ({ docId: doc.id, data: doc.data() }));
      const files = fileSnapshots.docs.map(doc => ({ docId: doc.id, data: doc.data() }));
  
      // Client-side filtering for partial match
      const filteredFolders = folders.filter(folder => folder.data.name && folder.data.name.toLowerCase().includes(searchTerm.toLowerCase()));
      const filteredFiles = files.filter(file => file.data.name && file.data.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
      const results = [...filteredFolders, ...filteredFiles];

      

      console.log('Search results:', results);
  
      dispatch(setSearchResults(results));
      setSearchTerm('');
    } catch (error) {
      console.error('Error searching:', error);
    }
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
        <li className='nav-item mx-2'>
        <button className='btn btn-outline-dark'>
          <FontAwesomeIcon icon={faTrash} /> Delete
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
      

      <button className='btn' type='button' onClick={handleLogOut}> Logout</button>
    </nav>
  );
};

export default SubBar;