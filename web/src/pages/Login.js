import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient'; 
import './Login.css'; 

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
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

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
        });

        if (error) {
            alert(error.message);
        } else {
            alert("Login Successful!");
            localStorage.setItem("user", data.user.email);
            navigate("/dashboard");
        }
        setLoading(false);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                {/* Updated Branding & Subtitle */}
                <h1><span>Quick</span>Contacts</h1>
                <p className="subtitle">Welcome back!</p>
                
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            onChange={e => setCredentials({...credentials, email: e.target.value})} 
                            required 
                        />
                    </div>
                    
                    <div className="input-group">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            onChange={e => setCredentials({...credentials, password: e.target.value})} 
                            required 
                        />
                    </div>
                    
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'AUTHENTICATING...' : 'LOGIN'}
                    </button>
                </form>

                <div className="divider"><span>OR</span></div>

                <button 
                    onClick={handleGoogleLogin} 
                    className="google-btn" 
                    type="button"
                    disabled={loading}
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="google" />
                    Sign in with Google
                </button>

                <div className="login-footer">
                    <p>Don't have an account? <Link to="/register" className="register-link">Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;