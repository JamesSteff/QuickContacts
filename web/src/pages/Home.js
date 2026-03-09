import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Home = () => {
  return (
    <div className="auth-wrapper">
      <div className="auth-card" style={{ maxWidth: '450px', padding: '3.5rem 2rem' }}>
        
        {/* Simple Project Title */}
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '10px' }}>
          <span>Quick</span>Contacts
        </h1>
        
        {/* The One-Liner (The "Remark" from Sir) */}
        <p style={{ color: '#888', fontSize: '1.1rem', marginBottom: '40px' }}>
          Synchronize and manage your <span style={{ color: '#3ecf8e' }}>Google Contacts</span> with ease.
        </p>

        {/* Clear Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link to="/login">
            <button className="btn-primary">Sign In</button>
          </Link>
          <Link to="/register">
            <button className="btn-primary" style={{ 
              background: 'transparent', 
              border: '1px solid #333', 
              color: '#fff' 
            }}>
              Register
            </button>
          </Link>
        </div>

        {/* Minimalist Tech Tag */}
        <div style={{ marginTop: '40px', fontSize: '0.7rem', color: '#444', letterSpacing: '2px' }}>
          REACT • SPRING BOOT • GOOGLE API
        </div>

      </div>
    </div>
  );
};

export default Home;