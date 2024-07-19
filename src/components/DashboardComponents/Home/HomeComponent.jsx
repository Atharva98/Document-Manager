import React from 'react';
import ShowItems from '../ShowItems/ShowItems';
import { shallowEqual, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const selectRootFilesAndFolders = createSelector(
  [state => state.filefolders.userFiles, state => state.filefolders.userFolders],
  (userFiles, userFolders) => ({
    rootFiles: userFiles.filter(file => file.data.parent === 'root'),
    rootFolders: userFolders.filter(folder => folder.data.parent === 'root')
  })
);

const HomeComponent = () => {
  const { isLoading, rootFiles, rootFolders } = useSelector(state => {
    const { rootFiles, rootFolders } = selectRootFilesAndFolders(state);
    return {
      isLoading: state.filefolders.isLoading,
      rootFiles,
      rootFolders
    };
  }, shallowEqual);

  return (
    <div className="col-md-12 w-100 mt-4"> {
      isLoading ? (
        <h1 className='display1 my-5 text-center'>Loading...</h1>
      ) : (
        <>
          <ShowItems title={'Folders'} type={'folder'} items={rootFolders} />
          <ShowItems title={'Files'} type={'file'} items={rootFiles} />
        </>
      )
    }
    </div>
  );
}

export default HomeComponent;
