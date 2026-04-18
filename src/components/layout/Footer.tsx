import React from 'react';
import { Link } from 'react-router-dom';
import { Printer, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="text-xl font-extrabold uppercase tracking-[-1px] text-white">
                Nelson<span className="text-brand-neon">'s</span>
              </div>
            </Link>
            <p className="text-brand-secondary text-sm leading-relaxed mb-8">
              We help businesses get seen, brands look professional, and ideas turn into visibility. Your brand, everywhere.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-brand-neon hover:text-brand-matte transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-brand-neon hover:text-brand-matte transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold uppercase tracking-widest text-xs text-brand-neon mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-brand-secondary">
              <li><Link to="/about" className="hover:text-brand-neon">About Us</Link></li>
              <li><Link to="/services" className="hover:text-brand-neon">Services</Link></li>
              <li><Link to="/packages" className="hover:text-brand-neon">Business Packages</Link></li>
              <li><Link to="/portfolio" className="hover:text-brand-neon">Portfolio</Link></li>
              <li><Link to="/get-quote" className="hover:text-brand-neon">Request a Quote</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold uppercase tracking-widest text-xs text-brand-neon mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-brand-secondary">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-neon shrink-0 mt-0.5" />
                <a 
                  href="https://www.google.com/maps/place/Nelson's+Signs+and+Printery/@18.411905,-77.1032642,17z" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-brand-neon transition-colors"
                >
                  Parry Town, Ocho Rios<br />St. Ann, Jamaica
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-neon shrink-0" />
                <span>+1 (876) 555-0123</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-neon shrink-0" />
                <span>hello@nelsonsigns.com</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="font-display font-bold uppercase tracking-widest text-xs text-brand-neon mb-6">Studio Hours</h4>
            <ul className="space-y-2 text-sm text-brand-secondary">
              <li className="flex justify-between font-mono">
                <span>MON - FRI</span>
                <span className="text-white">8:30AM - 5:00PM</span>
              </li>
              <li className="flex justify-between font-mono">
                <span>SATURDAY</span>
                <span className="text-white">9:00AM - 2:00PM</span>
              </li>
              <li className="flex justify-between font-mono">
                <span>SUNDAY</span>
                <span className="text-brand-neon">CLOSED</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-white/40 uppercase tracking-widest">
          <p>© 2026 Nelson’s Signs & Printery. Built for Visibility.</p>
          <div className="flex gap-8">
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/admin" className="text-brand-neon">Admin Access</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
