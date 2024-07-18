import React from 'react';
import LoginForm from '../../../components/AuthComponents/LoginForm';

const Login = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#000000' }}>
      <div className='col-md-6'>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login;
