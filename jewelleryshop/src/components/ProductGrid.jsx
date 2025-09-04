import { useState } from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    material: [],
    priceRange: { min: 0, max: 10000 }
  });

  // Categories for jewelry
  const categories = [
    { id: 'rings', name: 'Rings' },
    { id: 'earrings', name: 'Earrings' },
    { id: 'necklaces', name: 'Necklaces' },
    { id: 'bracelets', name: 'Bracelets' },
    { id: 'handcuts', name: 'Handcuts' }
  ];

  // Materials for jewelry
  const materials = [
    { id: '1gm-gold', name: '1gm Gold' },
    { id: '2gm-gold', name: '2gm Gold' },
    { id: '5gm-gold', name: '5gm Gold' },
    { id: '10gm-gold', name: '10gm Gold' },
    { id: '50gm-gold', name: '50gm Gold' },
    { id: 'silver', name: 'Silver' },
    { id: 'platinum', name: 'Platinum' }
  ];

  // Handle category filter changes
  const handleCategoryChange = (categoryId) => {
    setActiveFilters(prev => {
      const newCategories = prev.category.includes(categoryId)
        ? prev.category.filter(id => id !== categoryId)
        : [...prev.category, categoryId];
      
      return { ...prev, category: newCategories };
    });
  };

  // Handle material filter changes
  const handleMaterialChange = (materialId) => {
    setActiveFilters(prev => {
      const newMaterials = prev.material.includes(materialId)
        ? prev.material.filter(id => id !== materialId)
        : [...prev.material, materialId];
      
      return { ...prev, material: newMaterials };
    });
  };

  // Handle price range filter changes
  const handlePriceChange = (min, max) => {
    setActiveFilters(prev => ({
      ...prev,
      priceRange: { min, max }
    }));
  };

  // Apply filters
  const applyFilters = () => {
    let result = [...products];
    
    // Filter by category
    if (activeFilters.category.length > 0) {
      result = result.filter(product => 
        activeFilters.category.includes(product.category)
      );
    }
    
    // Filter by material
    if (activeFilters.material.length > 0) {
      result = result.filter(product => 
        activeFilters.material.includes(product.material)
      );
    }
    
    // Filter by price range
    result = result.filter(product => {
      const price = product.discount > 0
        ? product.price * (1 - product.discount / 100)
        : product.price;
      
      return price >= activeFilters.priceRange.min && 
             price <= activeFilters.priceRange.max;
    });
    
    setFilteredProducts(result);
  };

  // Reset all filters
  const resetFilters = () => {
    setActiveFilters({
      category: [],
      material: [],
      priceRange: { min: 0, max: 10000 }
    });
    setFilteredProducts(products);
  };

  return (
    <div className="product-section">
      <div className="filter-sidebar">
        <div className="filter-group">
          <h3>Categories</h3>
          {categories.map(category => (
            <div key={category.id} className="filter-item">
              <input
                type="checkbox"
                id={`category-${category.id}`}
                checked={activeFilters.category.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
              <label htmlFor={`category-${category.id}`}>{category.name}</label>
            </div>
          ))}
        </div>

        <div className="filter-group">
          <h3>Materials</h3>
          {materials.map(material => (
            <div key={material.id} className="filter-item">
              <input
                type="checkbox"
                id={`material-${material.id}`}
                checked={activeFilters.material.includes(material.id)}
                onChange={() => handleMaterialChange(material.id)}
              />
              <label htmlFor={`material-${material.id}`}>{material.name}</label>
            </div>
          ))}
        </div>

        <div className="filter-group">
          <h3>Price Range</h3>
          <div className="price-range">
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={activeFilters.priceRange.min}
              onChange={(e) => handlePriceChange(parseInt(e.target.value), activeFilters.priceRange.max)}
            />
            <div className="price-inputs">
              <input
                type="number"
                min="0"
                max={activeFilters.priceRange.max}
                value={activeFilters.priceRange.min}
                onChange={(e) => handlePriceChange(parseInt(e.target.value), activeFilters.priceRange.max)}
              />
              <span>to</span>
              <input
                type="number"
                min={activeFilters.priceRange.min}
                max="10000"
                value={activeFilters.priceRange.max}
                onChange={(e) => handlePriceChange(activeFilters.priceRange.min, parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="filter-actions">
          <button className="apply-filters" onClick={applyFilters}>Apply Filters</button>
          <button className="reset-filters" onClick={resetFilters}>Reset Filters</button>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-products">No products match your filters. Try adjusting your criteria.</div>
        )}
      </div>
    </div>
  );
}