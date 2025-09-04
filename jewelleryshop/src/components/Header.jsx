'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Header() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link href="/">
            <Image src="/logo.webp" alt="Elegance Jewels Logo" width={150} height={60} />
          </Link>
        </div>
        <nav className="main-nav">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li>
              <Link href="/products">Products</Link>
              <div className="dropdown">
                <Link href="/products/rings">Rings</Link>
                <Link href="/products/earrings">Earrings</Link>
                <Link href="/products/necklaces">Necklaces</Link>
                <Link href="/products/bracelets">Bracelets</Link>
              </div>
            </li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div className="header-actions">
          <div className="search-box">
            <input type="text" placeholder="Search products..." />
            <button type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
          </div>
          <Link href="/cart" className="cart-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            <span className="cart-count">0</span>
          </Link>
          <div className="user-account">
            {user ? (
              <div className="user-profile" onClick={() => setShowDropdown(!showDropdown)}>
                <span className="user-name">{user.name}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg>
                {showDropdown && (
                  <div className="user-dropdown">
                    <Link href="/profile">My Profile</Link>
                    <Link href="/orders">My Orders</Link>
                    <button onClick={logout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-links">
                <Link href="/login" className="login-btn">Login</Link>
                <Link href="/singup" className="signup-btn">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}