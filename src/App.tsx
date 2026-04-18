import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Packages from './pages/Packages';
import Portfolio from './pages/Portfolio';
import Quote from './pages/Quote';
import Upload from './pages/Upload';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import BuildProduct from './pages/BuildProduct';
import About from './pages/About';
import PopupManager from './components/funnel/PopupManager';
import PageLoader from './components/ui/PageLoader';
import CustomCursor from './components/ui/CustomCursor';

export default function App() {
  const location = useLocation();
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    setIsPageLoading(true);
    const timer = setTimeout(() => {
      setIsPageLoading(false);
      window.scrollTo(0, 0);
    }, 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <PageLoader isLoading={isPageLoading} />
      <CustomCursor />
      <PopupManager />
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/get-quote" element={<Quote />} />
            <Route path="/upload-design" element={<Upload />} />
            <Route path="/build-product" element={<BuildProduct />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Home />} />
            <Route path="/privacy" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </ThemeProvider>
  );
}
