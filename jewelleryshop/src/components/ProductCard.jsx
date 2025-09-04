import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const DOLLAR_TO_INR = 83; // Example conversion rate

export default function ProductCard({ product }) {
  // Convert prices to INR
  const originalPriceINR = product.price * DOLLAR_TO_INR;
  const discountedPriceINR = product.discount > 0 
    ? product.price * (1 - product.discount / 100) * DOLLAR_TO_INR 
    : originalPriceINR;

  return (
    <div className="product-card">
      <div className="product-image">
        <Link href={`/product/${product.id}`}>
          <Image 
            src={product.image} 
            alt={product.name} 
            width={300} 
            height={300} 
            className="product-img"
          />
        </Link>
        {product.isNew && <span className="badge new">New</span>}
        {product.discount > 0 && <span className="badge discount">{product.discount}% OFF</span>}
      </div>
      <div className="product-info">
        <h3 className="product-name">
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="product-category">{product.category}</div>
        <div className="product-material">{product.material}</div>
        <div className="product-price">
          {/* Only show prices in Indian Rupees */}
          {discountedPriceINR < originalPriceINR ? (
            <>
              <span style={{ textDecoration: 'line-through', color: '#888' }}>
                ₹{originalPriceINR.toLocaleString('en-IN')}
              </span>
              {' '}
              <span style={{ color: '#c19a6b', fontWeight: 'bold' }}>
                ₹{discountedPriceINR.toLocaleString('en-IN')}
              </span>
            </>
          ) : (
            <span>₹{originalPriceINR.toLocaleString('en-IN')}</span>
          )}
        </div>
        <div className="product-actions">
          <button className="add-to-cart">
            Add to Cart
          </button>
          <button className="wishlist">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}