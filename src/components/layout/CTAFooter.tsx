import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, MessageCircle, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function CTAFooter() {
  return (
    <div className="hidden md:flex h-20 bg-brand-charcoal border-t border-brand-border items-center justify-between px-10">
      <div className="flex items-center gap-8 font-semibold text-[12px] text-brand-secondary">
        <span className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-brand-neon rounded-full" />
          Fast Turnaround
        </span>
        <span className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-brand-neon rounded-full" />
          Industrial Quality
        </span>
        <span className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-brand-neon rounded-full" />
          Expert Design Team
        </span>
      </div>

      <div className="flex items-center gap-4">
        <a 
          href="https://wa.me/18765550123" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-6 py-3 border border-brand-border rounded-[6px] text-brand-text text-[14px] font-bold uppercase hover:bg-brand-text/5 transition-all"
        >
          WhatsApp Us
        </a>
        <Link 
          to="/upload-design"
          className="px-6 py-3 bg-brand-text text-brand-matte rounded-[6px] text-[14px] font-bold uppercase flex items-center gap-2 hover:bg-brand-neon hover:text-brand-matte transition-all"
        >
          <Upload size={16} strokeWidth={3} />
          Upload Design
        </Link>
        <Link 
          to="/get-quote"
          className="px-6 py-3 bg-brand-neon text-brand-matte rounded-[6px] text-[14px] font-bold uppercase hover:scale-105 transition-all"
        >
          Build My Brand
        </Link>
      </div>
    </div>
  );
}
