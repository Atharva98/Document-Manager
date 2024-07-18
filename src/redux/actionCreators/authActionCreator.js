import { SIGN_IN, SIGN_OUT } from '../actionType/authActionTypes';
import app from '../../config/firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(app);

const loginUser = (user) => ({
  type: SIGN_IN,
  payload: user
});

const signOutUser = () => ({
  type: SIGN_OUT,
});

export const signInUser = (email, password, setSuccess) => (dispatch) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      dispatch(loginUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      }));
      setSuccess(true);
    })
    .catch((error) => {
      alert("Invalid Email ID or Password");
      setSuccess(false);
    });
};

export const signUpUser = (firstName, lastName, email, password, setSuccess) => (dispatch) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      });
    })
    .then(() => {
      const currentUser = auth.currentUser;
      dispatch(loginUser({
        uid: currentUser.uid,
        name: currentUser.displayName,
        email: currentUser.email
      }));
      setSuccess(true);
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        alert("Email already in use! Try logging in");
      }
      if (error.code === 'auth/invalid-email') {
        alert("Invalid Email address");
      }
      if (error.code === 'auth/weak-password') {
        alert("Weak Password");
      }
      setSuccess(false);
    });
};

export const signOut = () => (dispatch) => {
  auth.signOut().then(() => {
    dispatch(signOutUser());
  });
};

export const checkIsLoggedIn = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(loginUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      }));
    } else {
      dispatch(signOutUser());
    }
  });
};
