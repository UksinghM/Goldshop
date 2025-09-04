'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from '@/context/AdminContext';

export default function ProductForm({ product, onSave, onCancel }) {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    inStock: true,
    images: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const { admin } = useAdmin();

  useEffect(() => {
    // Fetch categories
    fetchCategories();
    
    // If editing, populate form with product data
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || '',
        inStock: product.inStock !== undefined ? product.inStock : true,
        images: product.images || []
      });
      
      // Set image previews for existing images
      if (product.images && product.images.length > 0) {
        setImagePreview(product.images);
      }
    }
  }, [product]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/category/getall');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError('Failed to load categories: ' + err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    
    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  const uploadImages = async () => {
    if (imageFiles.length === 0) return formData.images; // Return existing images if no new ones
    
    const uploadPromises = imageFiles.map(file => {
      const formData = new FormData();
      formData.append('image', file);
      
      return fetch('http://localhost:5000/upload/image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${admin.token}`
        },
        body: formData
      })
      .then(res => {
        if (!res.ok) throw new Error('Image upload failed');
        return res.json();
      })
      .then(data => data.imageUrl);
    });
    
    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      return uploadedUrls;
    } catch (err) {
      throw new Error('Failed to upload images: ' + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Upload images if any
      let imageUrls = formData.images;
      if (imageFiles.length > 0) {
        imageUrls = await uploadImages();
      }
      
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        images: imageUrls
      };
      
      const url = product 
        ? `http://localhost:5000/product/update/${product._id}`
        : 'http://localhost:5000/product/add';
      
      const method = product ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admin.token}`
        },
        body: JSON.stringify(productData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save product');
      }
      
      onSave();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form-container">
      <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
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
            required
            rows="4"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group checkbox">
          <label htmlFor="inStock">
            <input
              type="checkbox"
              id="inStock"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
            />
            In Stock
          </label>
        </div>
        
        <div className="form-group">
          <label htmlFor="images">Product Images</label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageChange}
            multiple
            accept="image/*"
          />
        </div>
        
        {imagePreview.length > 0 && (
          <div className="image-preview">
            {imagePreview.map((src, index) => (
              <img 
                key={index} 
                src={src} 
                alt={`Preview ${index + 1}`} 
                className="preview-image" 
              />
            ))}
          </div>
        )}
        
        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-button" 
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="save-button" 
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
}