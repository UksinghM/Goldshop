// app/product/[id]/page.jsx
import { products } from '../../../data/products';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetailPage({ params }) {
  const { id } = params;
  const product = products.find(p => p.id.toString() === id);

  if (!product) {
    return (
      <div className="not-found" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Product Not Found</h1>
        <p>The product you're looking for doesn't exist.</p>
        <Link href="/products" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
          Back to All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page" style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
        {/* Product Images */}
        <div className="product-images">
          <div style={{ position: 'relative', height: '500px', marginBottom: '20px' }}>
            <Image 
              src={product.image} 
              alt={product.name} 
              fill
              style={{ objectFit: 'cover', borderRadius: '8px' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {product.images.map((img, index) => (
              <div key={index} style={{ position: 'relative', width: '100px', height: '100px' }}>
                <Image 
                  src={img} 
                  alt={`${product.name} - Image ${index + 1}`} 
                  fill
                  style={{ objectFit: 'cover', borderRadius: '4px' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: '2.5rem', 
            color: 'var(--secondary)',
            marginBottom: '10px'
          }}>
            {product.name}
          </h1>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <span style={{ 
              backgroundColor: 'var(--light-gray)', 
              padding: '5px 10px', 
              borderRadius: '4px',
              fontSize: '0.9rem'
            }}>
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </span>
            <span style={{ 
              backgroundColor: 'var(--light-gray)', 
              padding: '5px 10px', 
              borderRadius: '4px',
              fontSize: '0.9rem'
            }}>
              {product.material.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </span>
          </div>

          <div style={{ marginBottom: '30px' }}>
            {product.discount > 0 ? (
              <div>
                <span style={{ 
                  textDecoration: 'line-through', 
                  color: 'var(--dark-gray)',
                  marginRight: '10px',
                  fontSize: '1.2rem'
                }}>
                  ₹{product.price.toFixed(2)}
                </span>
                <span style={{ 
                  color: 'var(--primary-dark)',
                  fontSize: '2rem',
                  fontWeight: '600'
                }}>
                  ₹{(product.price * (1 - product.discount / 100)).toFixed(2)}
                </span>
                <span style={{ 
                  backgroundColor: 'var(--error)', 
                  color: 'white', 
                  padding: '3px 8px', 
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  marginLeft: '10px'
                }}>
                  {product.discount}% OFF
                </span>
              </div>
            ) : (
              <span style={{ 
                color: 'var(--primary-dark)',
                fontSize: '2rem',
                fontWeight: '600'
              }}>
                ₹{product.price.toFixed(2)}
              </span>
            )}
          </div>

          <p style={{ 
            marginBottom: '30px',
            lineHeight: '1.8',
            color: 'var(--dark-gray)'
          }}>
            {product.description}
          </p>

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Features:</h3>
            <ul style={{ paddingLeft: '20px' }}>
              {product.features.map((feature, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>{feature}</li>
              ))}
            </ul>
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '15px',
            marginBottom: '30px'
          }}>
            <div style={{ flex: '1' }}>
              <label htmlFor="quantity" style={{ display: 'block', marginBottom: '5px' }}>Quantity</label>
              <select 
                id="quantity" 
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '1px solid var(--medium-gray)',
                  borderRadius: '4px'
                }}
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <button style={{ 
              flex: '1',
              backgroundColor: 'var(--primary)',
              color: 'white',
              border: 'none',
              padding: '15px',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Add to Cart
            </button>
            <button style={{ 
              width: '50px',
              backgroundColor: 'var(--light-gray)',
              border: 'none',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}