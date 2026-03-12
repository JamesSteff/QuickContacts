import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import './Dashboard.css'; 
import '../App.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [uploading, setUploading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newContact, setNewContact] = useState({ 
    full_name: '', email: '', phone_number: '', avatar_url: '', group_id: '' 
  });
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) navigate("/login");
      else { 
        setUser(user); 
        fetchInitialData(user.id); 
      }
    };
    getUser();
  }, [navigate]);

  const fetchInitialData = async (userId) => {
    setLoading(true);
    await Promise.all([fetchContacts(userId), fetchGroups(userId)]);
    setLoading(false);
  };

  const fetchContacts = async (userId) => {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (!error) setContacts(data);
  };

  const fetchGroups = async (userId) => {
    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .eq('user_id', userId)
      .order('name', { ascending: true });
    if (!error) setGroups(data);
  };

  const showToast = (msg, type = 'success') => {
    setToast({ show: true, message: msg, type: type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleAddGroup = async () => {
    const name = window.prompt("Enter new group name:");
    if (!name) return;
    const { data, error } = await supabase.from('groups').insert([{ name, user_id: user.id }]).select();
    if (error) showToast(error.message, 'error');
    else { setGroups([...groups, data[0]]); showToast("Group added!"); }
  };

  const handleDeleteGroup = async (groupId, groupName, e) => {
    e.stopPropagation(); 
    if (!window.confirm(`Delete group "${groupName}"? Contacts won't be deleted.`)) return;
    const { error } = await supabase.from('groups').delete().eq('id', groupId);
    if (error) showToast(error.message, 'error');
    else {
      setGroups(groups.filter(g => g.id !== groupId));
      if (activeFilter === groupId) setActiveFilter('all');
      showToast("Group deleted");
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm("Delete this contact?")) return;
    
    const { error } = await supabase.from('contacts').delete().eq('id', id);
    
    if (error) {
      showToast(error.message, 'error');
    } else {
      setContacts(contacts.filter(c => c.id !== id));
      showToast("Contact deleted");
    }
  };

  const handleFileUpload = async (event) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      if (!file) return;
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `public/${fileName}`;
      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      setNewContact({ ...newContact, avatar_url: data.publicUrl });
      showToast("📷 Image uploaded!");
    } catch (error) { showToast(error.message, 'error'); } 
    finally { setUploading(false); }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      const contactPayload = { ...newContact, group_id: newContact.group_id === "" ? null : newContact.group_id };
      if (isEditMode) {
        const { error } = await supabase.from('contacts').update(contactPayload).eq('id', editingId);
        if (error) throw error;
        setContacts(contacts.map(c => c.id === editingId ? { ...c, ...contactPayload } : c));
        showToast("Contact Updated");
      } else {
        const { data, error } = await supabase.from('contacts').insert([{ ...contactPayload, user_id: user.id }]).select();
        if (error) throw error;
        setContacts([data[0], ...contacts]);
        showToast("Contact Saved");
      }
      closeModal();
    } catch (error) { showToast(error.message, 'error'); }
  };

  const toggleFavorite = async (id, currentStatus) => {
    const { error } = await supabase.from('contacts').update({ is_favorite: !currentStatus }).eq('id', id);
    if (!error) setContacts(contacts.map(c => c.id === id ? { ...c, is_favorite: !currentStatus } : c));
  };

  const filteredContacts = contacts.filter((c) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = c.full_name?.toLowerCase().includes(term) || 
                          c.email?.toLowerCase().includes(term) || 
                          c.phone_number?.includes(term);
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'favorites') return matchesSearch && c.is_favorite;
    return matchesSearch && c.group_id === activeFilter;
  });

  const openEditModal = (contact) => {
    setNewContact({ 
      full_name: contact.full_name, email: contact.email || '', 
      phone_number: contact.phone_number || '', avatar_url: contact.avatar_url || '',
      group_id: contact.group_id || ''
    });
    setEditingId(contact.id); setIsEditMode(true); setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false); setIsEditMode(false);
    setNewContact({ full_name: '', email: '', phone_number: '', avatar_url: '', group_id: '' });
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-logo"><span style={{ color: '#3b82f6' }}>Quick</span>Contacts</div>
        <nav className="sidebar-nav">
          <ul>
            <li className={activeFilter === 'all' ? 'active' : ''} onClick={() => setActiveFilter('all')}>All Contacts</li>
            <li className={activeFilter === 'favorites' ? 'active' : ''} onClick={() => setActiveFilter('favorites')}>Favorites</li>
            <li className="sidebar-label">Groups</li>
            {groups.map(g => (
              <li key={g.id} className={activeFilter === g.id ? 'active group-item' : 'group-item'} onClick={() => setActiveFilter(g.id)}>
                <span># {g.name}</span>
                <button className="delete-group-small" onClick={(e) => handleDeleteGroup(g.id, g.name, e)}>&times;</button>
              </li>
            ))}
            <li className="add-group-btn" onClick={handleAddGroup}>+ Create Group</li>
          </ul>
        </nav>
        <div className="sidebar-footer">
           <button onClick={() => { supabase.auth.signOut(); navigate("/login"); }} className="logout-btn">Logout</button>
        </div>
      </aside>

      <div className="main-wrapper">
        <nav className="top-navbar">
          <input type="text" placeholder="Search..." className="search-bar-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <div className="user-profile">{user?.email}</div>
        </nav>

        <main className="dashboard-container">
          <header className="content-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
            <h2 style={{fontSize: '1.8rem', fontWeight: 'bold'}}>
              {activeFilter === 'all' ? 'Your Contacts' : activeFilter === 'favorites' ? 'Favorites' : (groups.find(g => g.id === activeFilter)?.name || 'Group View')}
            </h2>
            <button className="add-btn" onClick={() => setIsModalOpen(true)}>+ New Contact</button>
          </header>

          <div className="content-grid">
            {loading ? <p>Loading...</p> : filteredContacts.map((contact) => (
              <div className={`contact-card ${contact.is_favorite ? 'favorite' : ''}`} key={contact.id}>
                <div className="card-header">
                  <div className="name-with-fav">
                    <img src={contact.avatar_url || 'https://via.placeholder.com/40'} alt="avatar" className="contact-img" />
                    <span onClick={() => toggleFavorite(contact.id, contact.is_favorite)} className="star-btn" style={{cursor: 'pointer', color: '#facc15'}}>{contact.is_favorite ? '★' : '☆'}</span>
                    <h4 style={{margin: 0}}>{contact.full_name}</h4>
                  </div>
                  <div className="card-actions">
                    <button onClick={() => openEditModal(contact)} className="edit-icon-btn">✎</button>
                    <button onClick={() => handleDeleteContact(contact.id)} className="delete-btn">&times;</button>
                  </div>
                </div>
                <p className="card-sub">{contact.email || 'No email'}</p>
                <p className="card-sub">{contact.phone_number || 'No phone'}</p>
              </div>
            ))}
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{isEditMode ? 'Edit' : 'Add'} Contact</h3>
            <div className="avatar-upload-section">
              <img src={newContact.avatar_url || 'https://via.placeholder.com/80'} className="preview-img" alt="preview" />
              <input type="file" accept="image/*" onChange={handleFileUpload} />
              {uploading && <small style={{display: 'block', color: '#3b82f6'}}>Uploading...</small>}
            </div>
            <form onSubmit={handleAddOrUpdate}>
              <div className="form-group"><label>Full Name</label><input type="text" required value={newContact.full_name} onChange={(e) => setNewContact({...newContact, full_name: e.target.value})} /></div>
              <div className="form-group"><label>Email</label><input type="email" value={newContact.email} onChange={(e) => setNewContact({...newContact, email: e.target.value})} /></div>
              <div className="form-group"><label>Phone</label><input type="text" value={newContact.phone_number} onChange={(e) => setNewContact({...newContact, phone_number: e.target.value})} /></div>
              <div className="form-group">
                <label>Group</label>
                <select className="group-select" value={newContact.group_id} onChange={(e) => setNewContact({...newContact, group_id: e.target.value})}>
                  <option value="">No Group</option>
                  {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
                <button type="submit" className="save-btn" disabled={uploading}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {toast.show && <div className={`toast-notification ${toast.type}`}>{toast.message}</div>}
    </div>
  );
};

export default Dashboard;