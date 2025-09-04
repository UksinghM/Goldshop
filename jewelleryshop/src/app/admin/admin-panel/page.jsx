'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminProtectedRoute from '@/components/AdminProtectedRoute';
import { useAdmin } from '@/context/AdminContext';
import ProductManagement from '@/components/admin/ProductManagement';
import CategoryManagement from '@/components/admin/CategoryManagement';
import '../admin.css';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { admin, logout } = useAdmin();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/admin-login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="admin-dashboard-content">
            <h2>Dashboard Overview</h2>
            <div className="admin-stats">
              <div className="stat-card">
                <h3>Products</h3>
                <p className="stat-number">0</p>
              </div>
              <div className="stat-card">
                <h3>Categories</h3>
                <p className="stat-number">0</p>
              </div>
              <div className="stat-card">
                <h3>Users</h3>
                <p className="stat-number">0</p>
              </div>
            </div>
          </div>
        );
      case 'products':
        return <ProductManagement />;
      case 'categories':
        return <CategoryManagement />;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <AdminProtectedRoute>
      <div className="admin-panel">
        <div className="admin-sidebar">
          <div className="admin-profile">
            <div className="admin-avatar">A</div>
            <div className="admin-info">
              <h3>{admin?.name || 'Admin'}</h3>
              <p>{admin?.email || 'admin@example.com'}</p>
            </div>
          </div>
          
          <nav className="admin-nav">
            <button 
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button 
              className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              Products
            </button>
            <button 
              className={`nav-item ${activeTab === 'categories' ? 'active' : ''}`}
              onClick={() => setActiveTab('categories')}
            >
              Categories
            </button>
            <button 
              className="nav-item logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </nav>
        </div>
        
        <div className="admin-content">
          <header className="admin-header">
            <h1>Admin Panel</h1>
          </header>
          
          <main className="admin-main">
            {renderContent()}
          </main>
        </div>
      </div>
    </AdminProtectedRoute>
  );
}
