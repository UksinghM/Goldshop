'use client';

import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="profile-container">
        <div className="profile-card">
          <h1>My Profile</h1>
          
          <div className="profile-info">
            <div className="profile-avatar">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
              </svg>
            </div>
            
            <div className="profile-details">
              <div className="detail-group">
                <label>Name</label>
                <p>{user.name}</p>
              </div>
              
              <div className="detail-group">
                <label>Email</label>
                <p>{user.email}</p>
              </div>
              
              {user.city && (
                <div className="detail-group">
                  <label>City</label>
                  <p>{user.city}</p>
                </div>
              )}
              
              <div className="detail-group">
                <label>Account Created</label>
                <p>{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          
          <div className="profile-actions">
            <button className="edit-profile-btn">Edit Profile</button>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}