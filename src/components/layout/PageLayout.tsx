import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Outlet, useLocation } from '@tanstack/react-router';
import { Toaster } from 'react-hot-toast';

export function PageLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-secondary selection:text-primary">
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
      <Toaster 
        position="bottom-right"
        toastOptions={{
          className: 'rounded-none border-primary font-heading font-medium text-sm px-6 py-4 shadow-elegant',
          success: { icon: '✓', style: { background: 'white', color: '#1B2A41' } },
          error: { icon: '✕', style: { background: 'white', color: '#B91C1C' } },
        }}
      />
    </div>
  );
}
