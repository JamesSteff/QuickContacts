import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import '../App.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) navigate("/login");
      else setUser(user);
    };
    getUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div style={{ padding: '2rem' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Quick<span>Contacts</span> Dashboard</h2>
        <button onClick={handleLogout} className="btn-primary" style={{ width: 'auto', padding: '8px 20px' }}>Logout</button>
      </nav>
      
      <div className="auth-card" style={{ maxWidth: '100%', textAlign: 'left' }}>
        <h3>Welcome, {user?.email}</h3>
        <p>This is where your contacts list will be displayed.</p>
        {/* Soon: <ContactTable /> component here */}
      </div>
    </div>
  );
};

export default Dashboard;