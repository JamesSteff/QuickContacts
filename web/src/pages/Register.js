import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import '../App.css';
/* Ensure your Login.css is imported or these classes are in App.css for the button to style correctly */
import './Login.css'; 

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // NEW: Handle Google OAuth Sign-Up/Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Redirects to dashboard after successful Google authentication
        redirectTo: window.location.origin + '/dashboard'
      }
    });

    if (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  // ORIGINAL: Handle Manual Email/Password Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Using Supabase Auth SDK to create a new user account
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert(error.message);
    } else {
      alert("Registration successful!");
      // Redirect to login page after successful signup
      navigate("/login");
    }
    setLoading(false);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* Branding with Blue accent color */}
        <h1><span style={{ color: '#3b82f6' }}>Quick</span>Register</h1>
        
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email" 
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

          {/* Registration button with Blue background */}
          <button 
            className="btn-primary" 
            disabled={loading} 
            style={{ backgroundColor: '#3b82f6', border: 'none', width: '100%', padding: '14px', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* NEW: Divider and Google Sign-Up Button */}
        <div className="divider"><span>OR</span></div>

        <button 
          onClick={handleGoogleLogin} 
          className="google-btn" 
          type="button"
          disabled={loading}
          style={{ marginTop: '0' }} /* Adjusting margin for the register card layout */
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="google icon" />
          Sign up with Google
        </button>

        {/* Navigation link back to Login */}
        <p className="link-text" style={{ marginTop: '20px' }}>
          Already have an account? <Link to="/login" style={{ color: '#3b82f6' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;