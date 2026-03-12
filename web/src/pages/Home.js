import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Home = () => {
  return (
    <div className="auth-wrapper">
      <div className="auth-card" style={{ maxWidth: '450px', padding: '3.5rem 2rem' }}>
        
        {/* Project Title with Blue Accent */}
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '10px' }}>
          <span style={{ color: '#3b82f6' }}>Quick</span>Contacts
        </h1>
        
        {/* One-liner description with Blue highlighted keyword */}
        <p style={{ color: '#888', fontSize: '1.1rem', marginBottom: '40px' }}>
          Synchronize and manage your <span style={{ color: '#3b82f6' }}>Google Contacts</span> with ease.
        </p>

        {/* Action Buttons for Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link to="/login">
            {/* Primary Action: Sign In */}
            <button className="btn-primary" style={{ backgroundColor: '#3b82f6' }}>
              Sign In
            </button>
          </Link>
          <Link to="/register">
            {/* Secondary Action: Register (Transparent Style) */}
            <button className="btn-primary" style={{ 
              background: 'transparent', 
              border: '1px solid #333', 
              color: '#fff' 
            }}>
              Register
            </button>
          </Link>
        </div>

        {/* Minimalist Tech Stack Footer */}
        <div style={{ marginTop: '40px', fontSize: '0.7rem', color: '#444', letterSpacing: '2px' }}>
          Full-Stack Contact Management
        </div>

      </div>
    </div>
  );
};

export default Home;