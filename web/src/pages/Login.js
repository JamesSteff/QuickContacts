import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient'; 
import './Login.css'; 

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Using Supabase Auth SDK instead of Backend API
        const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
        });

        if (error) {
            alert(error.message);
        } else {
            // Added success alert here
            alert("Login Successful!");
            
            // Save only the email to local storage as per your original logic
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