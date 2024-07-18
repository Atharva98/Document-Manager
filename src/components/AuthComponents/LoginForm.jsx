import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { signInUser } from '../../redux/actionCreators/authActionCreator';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all the fields!");
      return;
    }

    dispatch(signInUser(email, password, setSuccess));
  };

  React.useEffect(() => {
    if(success){
      navigate('/dashboard');
    }
  }, [success, navigate])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '500px', backgroundColor: '#ffffff', borderRadius: '15px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
        <div style={{ width: '100%', padding: '20px', backgroundColor: '#4A4A4A', color: '#ffffff', borderRadius: '15px 15px 0 0', textAlign: 'center' }}>
          <h2>Login</h2>
        </div>
        <div style={{ width: '100%', padding: '30px', backgroundColor: '#ffffff', borderRadius: '0 0 15px 15px' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter your email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: '10px', margin: '10px 0' }}
              />
            </div>
            <div className="form-group mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: '10px', margin: '10px 0' }}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block" style={{ padding: '10px', margin: '10px 0' }}>Login</button>
          </form>
          <Link to='/register' className='mx-auto'>Not a member? Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
