import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import '../App.css';
import './Login.css'; 
import logo from '../assets/logo.png';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard'
      }
    });

    if (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert(error.message);
    } else {
      alert("Registration successful!");
      navigate("/login");
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div style={{ marginBottom: '-5px', marginTop: '-35px', display: 'flex', justifyContent: 'center' }}>
          <img 
            src={logo} 
            alt="QuickContacts Logo" 
            style={{ width: '200px', height: 'auto' }} 
          />
        </div>
        {/* Consistent Branding & Subtitle */}
        <h1>
            <span style={{ color: '#3b82f6' }}>Quick</span>Contacts
        </h1>
        <p className="subtitle">Create your account</p>
        
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email Address" 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Password" 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button 
            type="submit"
            className="login-btn" 
            disabled={loading} 
          >
            {loading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
          </button>
        </form>

        <div className="divider"><span>OR</span></div>

        <button 
          onClick={handleGoogleLogin} 
          className="google-btn" 
          type="button"
          disabled={loading}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="google icon" />
          Sign up with Google
        </button>

        <div className="login-footer">
            <p>
                Already have an account? <Link to="/login" className="login-link">Login</Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Register;