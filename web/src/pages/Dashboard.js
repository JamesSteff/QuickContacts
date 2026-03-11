import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import './Dashboard.css'; // Ensure we are importing the specific Dashboard CSS
import '../App.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current user session from Supabase
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Redirect to login if no active session is found
        navigate("/login");
      } else {
        setUser(user);
      }
    };
    getUser();
  }, [navigate]);

  const handleLogout = async () => {
    // End the Supabase session and redirect to login page
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Navigation bar with Logo and Logout action */}
      <nav className="nav-bar">
        <h2>Quick<span style={{ color: '#3b82f6' }}>Contacts</span> Dashboard</h2>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </nav>
      
      {/* Main Welcome Card */}
      <div className="welcome-section">
        <h3>Welcome, {user?.email}</h3>
        <p>This is where your contacts list will be displayed.</p>
      </div>

      {/* Placeholder for future Contact Cards grid */}
      <div className="content-grid">
        {/* Contacts will be mapped here later */}
      </div>
    </div>
  );
};

export default Dashboard;