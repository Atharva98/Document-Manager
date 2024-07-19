import React, { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useParams } from "react-router-dom";
import ShowItems from "../ShowItems/ShowItems";
import { getFiles, getFolders } from "../../../redux/actionCreators/fileFolderActionCreator";
import { createSelector } from 'reselect';

const selectChildFilesAndFolders = createSelector(
  [state => state.filefolders.userFiles, state => state.filefolders.userFolders, (_, folderId) => folderId],
  (userFiles, userFolders, folderId) => ({
    childFiles: userFiles.filter(file => file.data.parent === folderId),
    childFolders: userFolders.filter(folder => folder.data.parent === folderId)
  })
);

const FolderComponent = ({ onFolderChange }) => {
  const { folderId } = useParams();
  const dispatch = useDispatch();

  const { childFiles, childFolders } = useSelector(state => selectChildFilesAndFolders(state, folderId), shallowEqual);

  useEffect(() => {
    if (folderId) {
      console.log('Fetching files and folders for folderId:', folderId);
      dispatch(getFiles(folderId));
      dispatch(getFolders(folderId)); 
    }
  }, [folderId, dispatch]);

  useEffect(() => {
    if (onFolderChange) {
      onFolderChange(folderId);
    }
  }, [folderId, onFolderChange]);

  return (
    <div>
      {childFiles.length > 0 || childFolders.length > 0 ? (
        <>
          {childFolders.length > 0 && (
            <ShowItems title="Subfolders" type="folder" items={childFolders} />
          )}
          {childFiles.length > 0 && (
            <ShowItems title="Files" type="file" items={childFiles} />
          )}
        </>
      ) : (
        <p className="text-center my-5">Empty folder</p>
      )}
    </div>
  );
};

export default FolderComponent;
