import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/DashboardComponents/Navbar/Navbar';
import SubBar from '../../components/DashboardComponents/SubBar/SubBar';
import HomeComponent from '../../components/DashboardComponents/Home/HomeComponent';
import CreateFolder from '../../components/DashboardComponents/CreateFolder/createFolder';
import { getFolders, getFiles } from '../../redux/actionCreators/fileFolderActionCreator';
import FolderComponent from '../../components/DashboardComponents/FolderComponent/FolderComponent';
import FileComponent from '../../components/DashboardComponents/FileComponent/FileComponent';
import UploadFile from '../../components/UploadFile/UploadFile';

const Dashboard = () => {
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false);
  const [showSubbar, setShowSubbar] = useState(true);
  const [currentFolderId, setCurrentFolderId] = useState('root'); // Default to root
  const { pathname } = useLocation();


  const { isLoggedIn, userId } = useSelector(state => ({
    isLoggedIn: state.auth.isAuthenticated,
    userId: state.auth.user.uid,
  }), shallowEqual);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (userId) {
      dispatch(getFolders(userId));
      dispatch(getFiles(currentFolderId));
    }
  }, [userId, currentFolderId, dispatch]);

  useEffect(() => {
    if (pathname.includes("/file/")) {
      setShowSubbar(false);
    } else {
      setShowSubbar(true);
    }
  }, [pathname]);

  const handleFolderChange = (folderId) => {
    setCurrentFolderId(folderId);
  };


  return (
    <>
      {isCreateFolderModalOpen && <CreateFolder setIsCreateFolderModalOpen={setIsCreateFolderModalOpen} />}
      {isFileUploadModalOpen && <UploadFile setIsFileUploadModalOpen={setIsFileUploadModalOpen} folderId={currentFolderId} />}
      <Navbar />
      {showSubbar && (
        <SubBar 
          setIsCreateFolderModalOpen={setIsCreateFolderModalOpen}
          setIsFileUploadModalOpen={setIsFileUploadModalOpen}
        />
      )}
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/folder/:folderId" element={<FolderComponent onFolderChange={handleFolderChange} />} />
        <Route path="/file/:fileId" element={<FileComponent />} />
      </Routes>
    </>
  );
};

export default Dashboard;
