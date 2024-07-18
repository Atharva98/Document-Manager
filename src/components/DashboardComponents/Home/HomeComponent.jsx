import React from 'react';
import ShowItems from '../ShowItems/ShowItems';
import { shallowEqual, useSelector } from 'react-redux';

const HomeComponent = () => {
  const { isLoading, userFolders, userFiles } = useSelector((state) => ({
    isLoading: state.filefolders.isLoading,
    userFolders: state.filefolders.userFolders.filter(folder => folder.data.parent === 'root'),
    userFiles: state.filefolders.userFiles.filter(file => file.data.folderId === 'root'),
  }), shallowEqual);


  return (
    <div className="col-md-12 w-100 mt-4">
      {isLoading ? (
        <h1 className='display1 my-5 text-center'>Loading...</h1>
      ) : (
        <>
          <ShowItems title={'Folders'} type={'folder'} items={userFolders} />
          <ShowItems title={'Files'} type={'file'} items={userFiles} />
        </>
      )}
    </div>
  );
};

export default HomeComponent;
