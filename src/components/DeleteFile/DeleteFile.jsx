
import { useDispatch } from 'react-redux';
import { deleteFileByName } from '../../redux/actionCreators/fileFolderActionCreator';

const DeleteFileModal = ({ setIsDeleteFileModalOpen, file }) => {
    const { fileName, fileDocId } = file || {}; // Destructure fileName and fileDocId from props
    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            // Dispatch delete action with fileName and fileDocId
            await dispatch(deleteFileByName(fileName, fileDocId));
            setIsDeleteFileModalOpen(false); // Close the modal upon successful deletion
        } catch (error) {
            console.error('Error deleting file:', error);
            // Handle error as needed (e.g., show error message)
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={() => setIsDeleteFileModalOpen(false)}>&times;</span>
                <h2>Delete File</h2>
                <p>Are you sure you want to delete <strong>{fileName}</strong>?</p>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default DeleteFileModal;
