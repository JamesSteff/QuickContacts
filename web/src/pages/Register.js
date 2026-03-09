import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import '../App.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) alert(error.message);
    else {
      alert("Registration successful! Please check your email for verification.");
      navigate("/login");
    }
    setLoading(false);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1><span>Quick</span>Register</h1>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
          </div>
          <button className="btn-primary" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p className="link-text">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;