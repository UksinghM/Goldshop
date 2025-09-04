// app/products/page.jsx
import { products } from '../../data/products';
import ProductGrid from '../../components/ProductGrid';

export default function ProductsPage() {
  return (
    <div className="products-page">
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
          Our Collection
        </h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--dark-gray)' }}>
          Explore our exquisite collection of handcrafted jewelry. Filter by category, material, or price to find your perfect piece.
        </p>
      </div>
      
      <div style={{ padding: '40px 0' }}>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}