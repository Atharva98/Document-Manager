import authReducer from "./authReducer";
import filefolderReducer from "./filefolderReducer";
import { combineReducers } from "redux";


const rootReducer = combineReducers({auth: authReducer, filefolders: filefolderReducer})

export default rootReducer;