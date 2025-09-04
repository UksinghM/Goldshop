'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Check if user just registered
    const registered = searchParams.get('registered');
    if (registered === 'true') {
      setSuccessMessage('Account created successfully! Please login.');
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      setServerError('');
      setSuccessMessage('');

      try {
        await login(formData.email, formData.password);
        router.push('/');
      } catch (error) {
        setServerError(error.message || 'Invalid email or password');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <style>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-image: url('https://getwallpapers.com/wallpaper/full/7/a/7/928836-cool-jewelry-wallpapers-1920x1200-image.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          padding: 2rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .auth-form-container {
          background: rgba(255, 255, 255, 0.93);
          max-width: 420px;
          width: 100%;
          padding: 2.5rem 3rem;
          border-radius: 10px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
          color: #333;
          text-align: center;
        }

        .auth-form-container h1 {
          margin-bottom: 0.25rem;
          font-weight: 700;
          font-size: 2rem;
          color: #7b3e19;
        }

        .auth-subtitle {
          margin-bottom: 2rem;
          font-size: 0.95rem;
          color: #5a4031;
          font-style: italic;
        }

        .auth-form {
          text-align: left;
        }

        .form-group {
          margin-bottom: 1.4rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.4rem;
          font-weight: 600;
          color: #5a4031;
        }

        .form-group input {
          width: 100%;
          padding: 0.6rem 0.8rem;
          font-size: 1rem;
          border: 1.8px solid #d8cfc1;
          border-radius: 6px;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus {
          outline: none;
          border-color: #7b3e19;
          box-shadow: 0 0 6px rgba(123, 62, 25, 0.4);
        }

        .error {
          border-color: #d44b4b !important;
        }

        .error-text {
          color: #d44b4b;
          font-size: 0.85rem;
          margin-top: 0.25rem;
          display: block;
        }

        .error-message {
          background: #fddede;
          padding: 0.6rem 1rem;
          border: 1.5px solid #d44b4b;
          color: #a02626;
          border-radius: 6px;
          margin-bottom: 1.6rem;
          font-weight: 600;
          text-align: center;
        }

        .success-message {
          background: #d4edda;
          color: #155724;
          border: 1.5px solid #c3e6cb;
          padding: 0.6rem 1rem;
          border-radius: 6px;
          margin-bottom: 1.6rem;
          font-weight: 600;
          text-align: center;
        }

        .auth-button {
          background: #7b3e19;
          color: #fff;
          font-weight: 700;
          padding: 0.85rem;
          width: 100%;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .auth-button:disabled {
          background: #c1a77b;
          cursor: not-allowed;
        }

        .auth-button:hover:not(:disabled) {
          background: #633010;
        }

        .auth-footer {
          margin-top: 1.8rem;
          font-weight: 600;
          color: #5a4031;
          text-align: center;
        }

        .auth-footer a {
          color: #7b3e19;
          text-decoration: underline;
          transition: color 0.3s ease;
        }

        .auth-footer a:hover {
          color: #633010;
        }
      `}</style>

      <div className="auth-container">
        <div className="auth-form-container">
          <h1>Login to Your Account</h1>
          <p className="auth-subtitle">Welcome back to Elegance Jewels</p>

          {successMessage && <div className="success-message">{successMessage}</div>}
          {serverError && <div className="error-message">{serverError}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <button
              type="submit"
              className="auth-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="auth-footer">
            Don't have an account? <Link href="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  );
}
