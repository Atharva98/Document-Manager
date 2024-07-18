import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFileDetails } from '../../../redux/actionCreators/fileFolderActionCreator';
import { useDispatch, useSelector } from 'react-redux';

const FileComponent = () => {
  const { fileId } = useParams();
  const dispatch = useDispatch();
  const [fileContent, setFileContent] = useState(null);

  const file = useSelector((state) =>
    state.filefolders.userFiles.find((file) => file.docId === fileId)
  );

  useEffect(() => {
    if (file) {
      // Load file content from storage if necessary
      dispatch(getFileDetails(fileId)).then((content) => setFileContent(content));
    }
  }, [dispatch, file, fileId]);

  console.log(fileId)

  return (
    <div className="file-viewer">
      {file ? (
        <div>
          <h1>{file.data.name}</h1>
          <div>{fileContent}</div>
        </div>
      ) : (
        <h1 className='display1 my-5 text-center'>File not found</h1>
      )}
    </div>
  );
};

export default FileComponent;
