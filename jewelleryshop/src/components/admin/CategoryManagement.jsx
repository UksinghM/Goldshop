'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from '@/context/AdminContext';

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const { admin } = useAdmin();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/category/getall');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const url = currentCategory 
        ? `http://localhost:5000/category/update/${currentCategory._id}`
        : 'http://localhost:5000/category/add';
      
      const method = currentCategory ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admin.token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save category');
      }
      
      // Reset form and refresh categories
      setFormData({ name: '', description: '' });
      setShowForm(false);
      setCurrentCategory(null);
      fetchCategories();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setFormData({
      name: category.name,
      description: category.description || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/category/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${admin.token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      
      // Refresh categories list
      fetchCategories();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddNew = () => {
    setCurrentCategory(null);
    setFormData({ name: '', description: '' });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setCurrentCategory(null);
    setFormData({ name: '', description: '' });
  };

  if (loading && categories.length === 0) return <div className="loading">Loading categories...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="category-management">
      <div className="category-header">
        <h2>Category Management</h2>
        {!showForm && (
          <button className="add-button" onClick={handleAddNew}>Add New Category</button>
        )}
      </div>

      {showForm ? (
        <div className="category-form-container">
          <h3>{currentCategory ? 'Edit Category' : 'Add New Category'}</h3>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit} className="category-form">
            <div className="form-group">
              <label htmlFor="name">Category Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
              />
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-button" 
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="save-button" 
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Category'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="category-list">
          {categories.length === 0 ? (
            <p>No categories found. Add your first category!</p>
          ) : (
            <table className="category-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td>{category.name}</td>
                    <td>{category.description || '-'}</td>
                    <td className="actions">
                      <button 
                        className="edit-button" 
                        onClick={() => handleEdit(category)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-button" 
                        onClick={() => handleDelete(category._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}