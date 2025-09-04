// app/page.jsx
import Image from 'next/image';
import Link from 'next/link';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  // Get featured products (first 6)
  const featuredProducts = products.slice(0, 6);
  
  // Get new arrivals (products with isNew flag)
  const newArrivals = products.filter(product => product.isNew).slice(0, 4);

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="hero-banner" style={{ 
        position: 'relative', 
        height: '600px', 
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <Image 
          src="/banner_1.webp" 
          alt="Elegance Jewels Banner" 
          fill 
          style={{ objectFit: 'cover' }}
          priority
        />
        <div style={{ 
          position: 'absolute', 
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.4)',
          zIndex: 1
        }}></div>
        <div style={{ 
          position: 'relative',
          zIndex: 2,
          maxWidth: '600px',
          margin: '0 auto',
          padding: '0 20px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: '3rem', 
            marginBottom: '20px' 
          }}>
            Elegance in Every Piece
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
            Discover our exquisite collection of handcrafted jewelry in gold, silver, and platinum.
          </p>
          <Link href="/products" style={{
            backgroundColor: 'var(--primary)',
            color: 'white',
            padding: '15px 40px',
            borderRadius: '5px',
            fontWeight: '600',
            display: 'inline-block',
            transition: 'background-color 0.3s'
          }}>
            Shop Collection
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: '80px 20px', maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{ 
          fontFamily: "'Playfair Display', serif", 
          fontSize: '2.5rem', 
          textAlign: 'center',
          marginBottom: '50px',
          color: 'var(--secondary)'
        }}>
          Shop by Category
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px'
        }}>
          {categories.map(category => (
            <Link href={`/products/${category.id}`} key={category.id} style={{
              position: 'relative',
              height: '300px',
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'block'
            }}>
              <Image 
                src={`/product-${categories.indexOf(category) + 1}.webp`}
                alt={category.name}
                fill
                style={{ objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '100%',
                padding: '20px',
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: 'white',
                textAlign: 'center'
              }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{category.name}</h3>
                <p>{category.count} products</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '80px 20px', backgroundColor: 'var(--light-gray)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: '2.5rem', 
            textAlign: 'center',
            marginBottom: '50px',
            color: 'var(--secondary)'
          }}>
            Featured Products
          </h2>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link href="/products" style={{
              backgroundColor: 'var(--primary)',
              color: 'white',
              padding: '15px 40px',
              borderRadius: '5px',
              fontWeight: '600',
              display: 'inline-block',
              transition: 'background-color 0.3s'
            }}>
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section style={{ padding: '80px 20px', maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{ 
          fontFamily: "'Playfair Display', serif", 
          fontSize: '2.5rem', 
          textAlign: 'center',
          marginBottom: '50px',
          color: 'var(--secondary)'
        }}>
          New Arrivals
        </h2>
        <div className="products-grid">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ 
        padding: '80px 20px', 
        backgroundColor: 'var(--secondary)',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: '2.5rem', 
            marginBottom: '50px',
            color: 'var(--primary)'
          }}>
            What Our Customers Say
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            <div style={{ padding: '30px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px' }}>
                <Image src="/t1.jpg" alt="Customer" width={80} height={80} style={{ objectFit: 'cover' }} />
              </div>
              <p style={{ marginBottom: '20px', lineHeight: '1.6' }}>
                "The craftsmanship of my ring is exceptional. I've received so many compliments on it!"
              </p>
              <h4 style={{ color: 'var(--primary)' }}>Sarah Johnson</h4>
            </div>
            <div style={{ padding: '30px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px' }}>
                <Image src="/t2.jpg" alt="Customer" width={80} height={80} style={{ objectFit: 'cover' }} />
              </div>
              <p style={{ marginBottom: '20px', lineHeight: '1.6' }}>
                "The quality of the gold necklace I purchased exceeded my expectations. Will definitely shop here again!"
              </p>
              <h4 style={{ color: 'var(--primary)' }}>Michael Chen</h4>
            </div>
            <div style={{ padding: '30px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px' }}>
                <Image src="/t3.jpg" alt="Customer" width={80} height={80} style={{ objectFit: 'cover' }} />
              </div>
              <p style={{ marginBottom: '20px', lineHeight: '1.6' }}>
                "I bought earrings for my wife's birthday and she absolutely loves them. The customer service was excellent too!"
              </p>
              <h4 style={{ color: 'var(--primary)' }}>David Williams</h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
