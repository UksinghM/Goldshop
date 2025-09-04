// app/products/[category]/page.jsx
import { products, categories } from '../../../data/products';
import ProductGrid from '../../../components/ProductGrid';
import Link from 'next/link';

export default function CategoryPage({ params }) {
  const { category } = params;
  const categoryInfo = categories.find(cat => cat.id === category);
  
  // Filter products by category
  const categoryProducts = products.filter(product => product.category === category);

  if (!categoryInfo) {
    return (
      <div className="not-found" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Category Not Found</h1>
        <p>The category you're looking for doesn't exist.</p>
        <Link href="/products" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
          Back to All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="category-page">
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
          {categoryInfo.name}
        </h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--dark-gray)' }}>
          Browse our collection of {categoryInfo.name.toLowerCase()}. Filter by material or price to find your perfect piece.
        </p>
      </div>
      
      <div style={{ padding: '40px 0' }}>
        <ProductGrid products={categoryProducts} />
      </div>
    </div>
  );
}