import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhkVEostXyWUT6dcYUloARdANazqTB3Cs",
  authDomain: "file-management-platform.firebaseapp.com",
  projectId: "file-management-platform",
  storageBucket: "file-management-platform.appspot.com",
  messagingSenderId: "113923565848",
  appId: "1:113923565848:web:8cc7ae6ad2fb5d29a8d66d"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);
const db = getFirestore(fire);
const storage = getStorage(fire);


export {fire, db, storage};
export default fire;