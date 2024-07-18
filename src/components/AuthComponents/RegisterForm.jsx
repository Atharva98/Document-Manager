import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { fire } from '../../config/firebase'; 

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      const auth = getAuth(fire); // Initialize auth using the app instance
      // Create a new user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      //console.log('User created successfully:', { firstName, lastName, email });

      // Reset form fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');

      window.location.href = '/login';
    } catch (error) {
      console.error('Error creating user:', error);
      setError(error.message);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 20px)', backgroundColor: '#000000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '500px', backgroundColor: '#ffffff', borderRadius: '15px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
        <div style={{ padding: '20px', backgroundColor: '#4A4A4A', color: '#ffffff', borderRadius: '15px 15px 0 0', textAlign: 'center' }}>
          <h2>Register</h2>
        </div>
        <div style={{ padding: '30px', backgroundColor: '#ffffff', borderRadius: '0 0 15px 15px', height: 'auto' }}>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <div className="row">
                <div className="col">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{ padding: '10px', marginBottom: '15px' }}
                    required
                  />
                </div>
                <div className="col">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={{ padding: '10px', marginBottom: '15px' }}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter your email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: '10px', marginBottom: '15px' }}
                required
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
                style={{ padding: '10px', marginBottom: '15px' }}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ padding: '10px', marginBottom: '15px' }}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block" style={{ padding: '10px', marginBottom: '20px' }}>Register</button>
          </form>
          <div style={{ textAlign: 'center' }}>
            Already a user? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
