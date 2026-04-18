import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Phone, FileUp, ClipboardList } from 'lucide-react';

export default function MobileCTA() {
  return (
    <div className="md:hidden fixed bottom-1 left-4 right-4 z-40">
      <div className="bg-brand-matte/80 backdrop-blur-lg border border-brand-border rounded-2xl p-2 flex justify-between items-center shadow-2xl">
        <Link 
          to="/get-quote" 
          className="flex flex-col items-center justify-center p-2 text-brand-text hover:text-brand-neon transition-colors"
        >
          <ClipboardList className="w-5 h-5 mb-1" />
          <span className="text-[10px] uppercase font-bold tracking-widest">Quote</span>
        </Link>
        
        <a 
          href="https://wa.me/18765550123" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-2 text-brand-text hover:text-brand-neon transition-colors"
        >
          <MessageCircle className="w-5 h-5 mb-1" />
          <span className="text-[10px] uppercase font-bold tracking-widest">WhatsApp</span>
        </a>

        <a 
          href="tel:+18765550123" 
          className="flex flex-col items-center justify-center p-2 text-brand-text hover:text-brand-neon transition-colors"
        >
          <Phone className="w-5 h-5 mb-1" />
          <span className="text-[10px] uppercase font-bold tracking-widest">Call</span>
        </a>

        <Link 
          to="/upload-design" 
          className="bg-brand-neon text-brand-matte px-4 py-2 rounded-xl flex items-center justify-center space-x-2"
        >
          <FileUp className="w-5 h-5" />
          <span className="text-[10px] uppercase font-black tracking-widest">Upload</span>
        </Link>
      </div>
    </div>
  );
}
