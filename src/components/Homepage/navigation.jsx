import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const NavigationComponent = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Main Container */}
      <div style={{ minHeight: '100vh', backgroundColor: '#000000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Combined Box */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '500px', backgroundColor: '#ffffff', borderRadius: '15px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)', height : '300px' }}>
          {/* Name Box */}
          <div style={{ width: '100%', padding: '20px', backgroundColor: '#4A4A4A', color: '#ffffff', borderRadius: '15px 15px 0 0', textAlign: 'center' }}>
            <h2>File Management System</h2>
          </div>
          
          {/* Login/Register Box */}
          <div style={{ width: '100%', padding: '40px', backgroundColor: '#ffffff', borderRadius: '0 0 15px 15px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>Login or Register</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/login')}>Login</button>
              <button className="btn btn-outline-primary btn-lg" onClick={() => navigate('/register')}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationComponent;
