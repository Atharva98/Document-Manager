import React from 'react';
import './ShowItems.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFolder } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeFolder } from '../../../redux/actionCreators/fileFolderActionCreator';

const ShowItems = ({ title, items = [], type }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDblClick = (item) => {
        if (type === 'folder') {
            dispatch(changeFolder(item.docId));
            navigate(`/dashboard/folder/${item.docId}`);
        } else {
            window.open(item.url)
        }
    };

    

    // Add a console log to inspect the items
    console.log(`${title} items:`, items);

    return (
        <div className='w-100'>
            <h4 className='text-center border-bottom'>{title}</h4>
            <div className="row gap-2 p-4 flex-wrap">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className='col-md-2 border p-4 text-center d-flex flex-column'
                        onDoubleClick={() => handleDblClick(item)}
                    >
                        {type === 'folder' ? (
                            <FontAwesomeIcon icon={faFolder} size='3x' className='mb-2' />
                        ) : (
                            <FontAwesomeIcon icon={faFile} size='3x' className='mb-2' />
                        )}
                        <p className="mb-0">{type === 'folder' ? item.data.name : item.data.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowItems;
