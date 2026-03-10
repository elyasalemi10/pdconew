import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Outlet, useLocation } from '@tanstack/react-router';

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
    </div>
  );
}
