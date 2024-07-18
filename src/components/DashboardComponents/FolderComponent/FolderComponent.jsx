import React, { useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ShowItems from "../ShowItems/ShowItems";
import { getFiles, getFolders } from "../../../redux/actionCreators/fileFolderActionCreator";

const FolderComponent = () => {
    const { folderId } = useParams();
    const dispatch = useDispatch();

    const { childFiles, childFolders } = useSelector(state => ({
        childFiles: state.filefolders.userFiles.filter(file => file.data.folderId === folderId),
        childFolders: state.filefolders.userFolders.filter(folder => folder.data.parent === folderId),
    }), shallowEqual);

    useEffect(() => {
        if (folderId) {
            dispatch(getFiles(folderId));
            dispatch(getFolders(folderId)); // Ensure you are fetching child folders as needed
        }
    }, [folderId, dispatch]);

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
