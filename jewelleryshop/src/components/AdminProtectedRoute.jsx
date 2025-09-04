'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';

export default function AdminProtectedRoute({ children }) {
  const { admin } = useAdmin();
  const router = useRouter();
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (!admin) {
      setAccessDenied(true);
      setTimeout(() => {
        router.replace('/admin-login');
      }, 1200);
    }
  }, [admin, router]);

  if (!admin && accessDenied) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
        Access denied. Admin privileges required.
      </div>
    );
  }

  return children;
}