// app/search/page.jsx
'use client';

import { useSearchParams } from 'next/navigation';
import { products } from '../../data/products';
import ProductGrid from '../../components/ProductGrid';
import Link from 'next/link';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  // Filter products based on search query
  const searchResults = products.filter(product => {
    const searchText = query.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText) ||
      product.material.toLowerCase().includes(searchText) ||
      product.description.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="search-page">
      <div className="page-header" style={{ 
        padding: '60px 20px', 
        backgroundColor: 'var(--light-gray)',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontFamily: "'Playfair Display', serif", 
          fontSize: '2.5rem', 
          color: 'var(--secondary)',
          marginBottom: '20px'
        }}>
          Search Results
        </h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--dark-gray)' }}>
          {searchResults.length} results found for "{query}"
        </p>
      </div>
      
      <div style={{ padding: '40px 0' }}>
        {searchResults.length > 0 ? (
          <ProductGrid products={searchResults} />
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <h2 style={{ marginBottom: '20px' }}>No products found</h2>
            <p style={{ marginBottom: '30px' }}>We couldn't find any products matching your search.</p>
            <Link href="/products" style={{ 
              backgroundColor: 'var(--primary)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '4px',
              textDecoration: 'none'
            }}>
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}