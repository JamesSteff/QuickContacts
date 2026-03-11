import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient'; 
import './Login.css'; 

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // NEW: Handle Google OAuth Login
    const handleGoogleLogin = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                // Redirects user to the dashboard after successful Google authentication
                redirectTo: window.location.origin + '/dashboard' 
            }
        });

        if (error) {
            alert(error.message);
            setLoading(false);
        }
    };

    // ORIGINAL: Handle Email/Password Login (No changes to your logic)
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
            // Storing the user email in local storage as per your original requirement
            localStorage.setItem("user", data.user.email);
            navigate("/dashboard");
        }
        setLoading(false);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1><span>Quick</span>Contacts</h1>
                <p>Please sign in to continue</p>
                
                {/* Traditional Login Form */}
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
                        {loading ? 'Authenticating...' : 'Login'}
                    </button>
                </form>

                {/* Visual Divider */}
                <div className="divider"><span>OR</span></div>

                {/* NEW: Google Sign-In Button */}
                <button 
                    onClick={handleGoogleLogin} 
                    className="google-btn" 
                    type="button"
                    disabled={loading}
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="google" />
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default Login;