import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient'; // Path to your client
import './Login.css'; // Link your final CSS

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Using Supabase Auth instead of Axios
        const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
        });

        if (error) {
            alert(error.message);
        } else {
            localStorage.setItem("user", data.user.email);
            navigate("/dashboard");
        }
        setLoading(false);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1><span>Quick</span>Contacts</h1>
                <p>Welcome back, James!</p>
                
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
            </div>
        </div>
    );
};

export default Login;