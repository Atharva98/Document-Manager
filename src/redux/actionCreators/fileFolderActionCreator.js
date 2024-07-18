import * as types from "../actionType/fileFolderActionTypes";
import { db, storage } from "../../config/firebase";
import { collection, addDoc, query, where, getDoc , getDocs } from "firebase/firestore";
//import fileModel from '../../components/models/files'
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";


//actions
const addFolder = (payload) => ({
    type: types.CREATE_FOLDER,
    payload: payload,
});

//for multiple folders
const addFolders = (payload) => ({
    type: types.ADD_FOLDERS,
    payload: payload,
});

const setLoading = (payload) => ({
    type: types.SET_LOADING,
    payload: payload,
})

const setChangeFolder = (payload) => ({
    type:types.CHANGE_FOLDER,
    payload: payload,
})

const addFile = (file) => ({
    type: types.ADD_FILE,
    payload: file,
});

const addFiles = (payload) => ({
    type: types.ADD_FILES,
    payload: payload,
})

export const setSearchResults = (results) => ({
    type: types.SET_SEARCH_RESULTS,
    payload: Array.isArray(results) ? results : [],
  });

//action creators
export const createFolder = (data) => (dispatch) => {
    addDoc(collection(db, "folders"), data)
        .then((docRef) => getDoc(docRef))
        .then((docSnap) => {
            if (docSnap.exists()) {
                const folderData = docSnap.data(); 
                const docId = docSnap.id; 
                dispatch(addFolder({ data: folderData, docId: docId })); 
                alert("Folder created successfully");
            }
        });
};

export const getFolders = (userId) => async (dispatch) => {
    dispatch(setLoading(true));
    const foldersQuery = query(collection(db, "folders"), where("userId", "==", userId));
    const querySnapshot = await getDocs(foldersQuery);
    
    if (querySnapshot && querySnapshot.docs) {
        const foldersData = querySnapshot.docs.map((folder) => ({
            data: folder.data(),
            docId: folder.id,
        }));
        
        dispatch(addFolders(foldersData));
    } else {
        console.error("No documents found or querySnapshot.docs is undefined", querySnapshot);
    }
    
    dispatch(setLoading(false));
};


export const changeFolder = (folderId) => (dispatch) => {
    dispatch(setChangeFolder(folderId));
}

export const uploadFile = (folderId, file) => async (dispatch) => {
    try {
        const fileRef = ref(storage, `files/${folderId}/${file.name}`);
        await uploadBytes(fileRef, file);
        const fileURL = await getDownloadURL(fileRef);

        const docRef = await addDoc(collection(db, 'files'), {
            folderId,
            name: file.name,
            url: fileURL,
            createdAt: new Date(),
        });

        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const fileData = docSnap.data();
            const docId = docSnap.id;
            dispatch(addFile({ data: fileData, docId: docId }));
            alert("File uploaded successfully!");
        }
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};

export const getFiles = (folderId) => async (dispatch) => {
    dispatch(setLoading(true));
    const filesQuery = query(collection(db, "files"), where("folderId", "==", folderId));
    const querySnapshot = await getDocs(filesQuery);

    if (querySnapshot && querySnapshot.docs) {
        const filesData = querySnapshot.docs.map((file) => ({
            data: file.data(),
            docId: file.id,
        }));

        dispatch(addFiles(filesData));
    } else {
        console.error("No documents found or querySnapshot.docs is undefined", querySnapshot);
    }

    dispatch(setLoading(false));
};


export const getFilesFromStorage = (folderPath = '') => async (dispatch) => {
    dispatch(setLoading(true));
    const filesRef = ref(storage, folderPath);
    try {
        const filesSnapshot = await listAll(filesRef);
        const filesData = await Promise.all(
            filesSnapshot.items.map(async (itemRef) => {
                const url = await getDownloadURL(itemRef);
                return {
                    name: itemRef.name,
                    url,
                };
            })
        );
        dispatch(addFiles(filesData));
    } catch (error) {
        console.error("Error fetching files from storage:", error);
    }
    dispatch(setLoading(false));
};


export const getFileDetails = (fileId) => async (dispatch) => {
    try {
      const fileRef = storage.ref(`files/${fileId}`);
      const fileContent = await fileRef.getDownloadURL();
      return fileContent;
    } catch (error) {
      console.error('Error fetching file content:', error);
      return null;
    }
  };


