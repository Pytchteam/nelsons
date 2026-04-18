import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileCTA from './MobileCTA';
import CTAFooter from './CTAFooter';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-brand-matte">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <CTAFooter />
      <Footer />
      <MobileCTA />
    </div>
  );
}
