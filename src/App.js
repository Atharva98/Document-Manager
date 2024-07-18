import React, { useEffect }  from 'react';
import './App.css';


import { Route, Routes } from 'react-router-dom';
import { Login, Homepage, Register, Dashboard } from './pages';
import { useDispatch } from 'react-redux';
import { checkIsLoggedIn } from './redux/actionCreators/authActionCreator';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIsLoggedIn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch]);

  return (
    
    <div className='App'>
    <Routes>
      <Route path='*' element = {<Homepage />}></Route>
      <Route path='/login' element = {<Login/>}></Route>
      <Route path='/register' element = {<Register/>}></Route>
      <Route path='/Dashboard/*' element = {<Dashboard/>}></Route>
    </Routes>
    </div>
  );
};

export default App;
