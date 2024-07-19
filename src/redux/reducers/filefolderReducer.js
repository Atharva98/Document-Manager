import * as types from "../actionType/fileFolderActionTypes"

const initialState = {
    isLoading : false,
    currentFolder : "root",
    userFolders: [],
    userFiles : [],
    searchResults: [],
    error: null
}

const filefolderReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_FOLDER:
            return {
                ...state,
                userFolders: [...state.userFiles, action.payload],
            };
        case types.ADD_FOLDERS:
            return {
                ...state,
                userFolders: action.payload,
            };
        case types.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case types.CHANGE_FOLDER:
            return {
                ...state,
                currentFolder: action.payload,
            };
        case types.SET_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: action.payload,
            };
        case types.ADD_FILE:
            return {
                ...state,
                userFiles: [...state.userFiles, action.payload],
            };
        case types.ADD_FILES:
            return {
                ...state,
                userFiles: action.payload,
            };
        
        default:
            return state;
    }
};

export default filefolderReducer;
