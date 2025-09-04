// app/about/page.jsx
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="about-page">
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
          About Us
        </h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--dark-gray)' }}>
          Discover our story, our passion for jewelry, and our commitment to quality craftsmanship.
        </p>
      </div>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', marginBottom: '60px' }}>
          <div>
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: '2rem', 
              color: 'var(--secondary)',
              marginBottom: '20px'
            }}>
              Our Story
            </h2>
            <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
              Founded in 2010, our jewelry shop began as a small family business with a passion for creating beautiful, handcrafted pieces. Over the years, we've grown into a respected name in the jewelry industry, known for our commitment to quality and exceptional craftsmanship.
            </p>
            <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
              Each piece in our collection is carefully designed and crafted by our team of skilled artisans, using only the finest materials. We take pride in creating jewelry that not only looks beautiful but also stands the test of time.
            </p>
            <p style={{ lineHeight: '1.8' }}>
              Our mission is to provide our customers with exquisite jewelry that celebrates life's special moments and becomes treasured heirlooms for generations to come.
            </p>
          </div>
          <div style={{ position: 'relative', height: '400px' }}>
            <Image 
              src="/testimonials.png" 
              alt="Our jewelry workshop" 
              fill
              style={{ objectFit: 'cover', borderRadius: '8px' }}
            />
          </div>
        </div>
        
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: '2rem', 
            color: 'var(--secondary)',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Our Values
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '30px' }}>
            <div style={{ textAlign: 'center', padding: '30px 20px', backgroundColor: 'var(--light-gray)', borderRadius: '8px' }}>
              <div style={{ marginBottom: '20px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="var(--primary)" viewBox="0 0 16 16">
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </svg>
              </div>
              <h3 style={{ marginBottom: '15px', fontSize: '1.3rem' }}>Quality</h3>
              <p>We use only the finest materials and employ skilled artisans to create jewelry of exceptional quality.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '30px 20px', backgroundColor: 'var(--light-gray)', borderRadius: '8px' }}>
              <div style={{ marginBottom: '20px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="var(--primary)" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                </svg>
              </div>
              <h3 style={{ marginBottom: '15px', fontSize: '1.3rem' }}>Integrity</h3>
              <p>We conduct our business with honesty and transparency, building trust with our customers.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '30px 20px', backgroundColor: 'var(--light-gray)', borderRadius: '8px' }}>
              <div style={{ marginBottom: '20px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="var(--primary)" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                </svg>
              </div>
              <h3 style={{ marginBottom: '15px', fontSize: '1.3rem' }}>Innovation</h3>
              <p>We continuously explore new designs and techniques to create unique and contemporary jewelry.</p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: '2rem', 
            color: 'var(--secondary)',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Meet Our Team
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '30px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ position: 'relative', height: '200px', marginBottom: '15px' }}>
                <Image 
                  src="/t1.jpg" 
                  alt="Team Member" 
                  fill
                  style={{ objectFit: 'cover', borderRadius: '50%' }}
                />
              </div>
              <h3 style={{ marginBottom: '5px', fontSize: '1.2rem' }}>Sophia Johnson</h3>
              <p style={{ color: 'var(--primary)' }}>Founder & Designer</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ position: 'relative', height: '200px', marginBottom: '15px' }}>
                <Image 
                  src="/t2.jpg" 
                  alt="Team Member" 
                  fill
                  style={{ objectFit: 'cover', borderRadius: '50%' }}
                />
              </div>
              <h3 style={{ marginBottom: '5px', fontSize: '1.2rem' }}>Michael Chen</h3>
              <p style={{ color: 'var(--primary)' }}>Master Craftsman</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ position: 'relative', height: '200px', marginBottom: '15px' }}>
                <Image 
                  src="/t3.jpg" 
                  alt="Team Member" 
                  fill
                  style={{ objectFit: 'cover', borderRadius: '50%' }}
                />
              </div>
              <h3 style={{ marginBottom: '5px', fontSize: '1.2rem' }}>Emily Rodriguez</h3>
              <p style={{ color: 'var(--primary)' }}>Gemologist</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ position: 'relative', height: '200px', marginBottom: '15px' }}>
                <Image 
                  src="/t4.jpg" 
                  alt="Team Member" 
                  fill
                  style={{ objectFit: 'cover', borderRadius: '50%' }}
                />
              </div>
              <h3 style={{ marginBottom: '5px', fontSize: '1.2rem' }}>David Kim</h3>
              <p style={{ color: 'var(--primary)' }}>Sales Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}