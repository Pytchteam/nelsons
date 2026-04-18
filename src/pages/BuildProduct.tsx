import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  ArrowRight, 
  Check, 
  Monitor, 
  Truck, 
  Briefcase, 
  Layers, 
  ChevronRight,
  Info,
  Maximize2,
  FileText
} from 'lucide-react';
import { cn } from '../lib/utils';
import { db, storage } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const productCategories = [
  {
    id: 'signage',
    name: 'Architectural Signage',
    icon: <Monitor />,
    description: 'Banners, Lightboxes, Exterior Signs',
    options: ['3D Channel Letters', 'Dimensional Plastic', 'Lighted Signs', 'Vinyl Banners']
  },
  {
    id: 'vehicle',
    name: 'Moving Media',
    icon: <Truck />,
    description: 'Wraps and Fleet Branding',
    options: ['Full Vehicle Wrap', 'Partial Wrap', 'Door Decals', 'Window Perforation']
  },
  {
    id: 'storefront',
    name: 'Storefront Systems',
    icon: <Layers />,
    description: 'Window Graphics and Wall Murals',
    options: ['One-Way Vision', 'Frosted Privacy Film', 'Cut Vinyl Lettering', 'Wall Murals']
  },
  {
    id: 'essentials',
    name: 'Business Essentials',
    icon: <Briefcase />,
    description: 'Cards, Flyers, and Commercial Print',
    options: ['Silk Business Cards', 'Spot UV Brochures', 'Commercial Folders', 'Letterheads']
  }
];

export default function BuildProduct() {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dimensions, setDimensions] = useState({ width: '', height: '', unit: 'in' });
  const [isUploading, setIsUploading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStep(4);
    }
  };

  const handleSubmit = async () => {
    if (!file || !selectedCategory || !selectedOption) return;
    
    setIsUploading(true);
    try {
      const storageRef = ref(storage, `builds/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const fileUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'quotes'), {
        type: 'build_a_product',
        category: selectedCategory,
        product: selectedOption,
        fileUrl,
        dimensions,
        status: 'New',
        createdAt: serverTimestamp()
      });

      setOrderComplete(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const activeCategoryData = productCategories.find(c => c.id === selectedCategory);

  return (
    <div className="pt-24 pb-20 min-h-screen px-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress Stepper */}
        <div className="flex justify-between items-center mb-12 max-w-2xl mx-auto relative">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="z-10 flex flex-col items-center">
              <div 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all border-2",
                  step >= s ? "bg-brand-neon border-brand-neon text-black" : "bg-brand-charcoal border-brand-border text-brand-secondary"
                )}
              >
                {step > s ? <Check size={18} /> : s}
              </div>
              <span className={cn(
                "hidden md:block absolute top-12 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap",
                step === s ? "text-brand-neon" : "text-brand-secondary"
              )}>
                {s === 1 ? 'Category' : s === 2 ? 'Specifics' : s === 3 ? 'Sizing' : 'Art Assets'}
              </span>
            </div>
          ))}
          {/* Connector Line */}
          <div className="absolute top-5 left-0 right-0 h-[2px] bg-brand-border -z-0" />
          <div 
            className="absolute top-5 left-0 h-[2px] bg-brand-neon transition-all duration-500 ease-out" 
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          {!orderComplete ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10"
            >
              <div className="lg:col-span-8">
                {/* Step 1: Categories */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="mb-10">
                      <h2 className="text-4xl font-black uppercase tracking-tight mb-2">Build Your Product</h2>
                      <p className="text-brand-secondary">Select the visibility category you're looking to scale.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {productCategories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => { setSelectedCategory(cat.id); setStep(2); }}
                          className={cn(
                            "flex items-start gap-5 p-6 rounded-[12px] border-2 text-left transition-all group",
                            selectedCategory === cat.id 
                              ? "bg-white text-black border-black shadow-xl" 
                              : "bg-brand-charcoal border-brand-border text-brand-text hover:border-brand-neon"
                          )}
                        >
                          <div className={cn(
                            "p-3 rounded-[8px] transition-colors",
                            selectedCategory === cat.id ? "bg-black text-brand-neon" : "bg-white/5 text-brand-neon group-hover:bg-brand-neon group-hover:text-black"
                          )}>
                             {React.cloneElement(cat.icon as React.ReactElement, { size: 24 })}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold uppercase mb-1">{cat.name}</h3>
                            <p className="text-xs font-medium opacity-60 leading-relaxed uppercase tracking-widest">{cat.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Specific Options */}
                {step === 2 && activeCategoryData && (
                  <div>
                    <button onClick={() => setStep(1)} className="flex items-center gap-2 text-brand-neon text-xs font-bold uppercase tracking-widest mb-6 hover:translate-x-[-4px] transition-transform">
                      <ChevronRight size={14} className="rotate-180" /> Back
                    </button>
                    <div className="mb-10">
                      <h2 className="text-4xl font-black uppercase tracking-tight mb-2">{activeCategoryData.name}</h2>
                      <p className="text-brand-secondary">Which specific solution fits your needs?</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeCategoryData.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => { setSelectedOption(opt); setStep(3); }}
                          className={cn(
                            "flex items-center justify-between p-6 rounded-[12px] border-2 text-left transition-all",
                            selectedOption === opt 
                              ? "bg-white text-black border-black shadow-xl" 
                              : "bg-brand-charcoal border-brand-border text-brand-text hover:border-brand-neon"
                          )}
                        >
                          <span className="font-bold uppercase tracking-tight">{opt}</span>
                          <div className={cn(
                            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                            selectedOption === opt ? "bg-black border-black text-brand-neon" : "border-brand-border text-transparent"
                          )}>
                            <Check size={14} strokeWidth={4} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Sizing */}
                {step === 3 && (
                  <div>
                    <button onClick={() => setStep(2)} className="flex items-center gap-2 text-brand-neon text-xs font-bold uppercase tracking-widest mb-6 hover:translate-x-[-4px] transition-transform">
                      <ChevronRight size={14} className="rotate-180" /> Back
                    </button>
                    <div className="mb-10">
                      <h2 className="text-4xl font-black uppercase tracking-tight mb-2">Scale & Specs</h2>
                      <p className="text-brand-secondary">Tell us the dimensions required for this installation.</p>
                    </div>
                    
                    <div className="bg-white p-10 rounded-[12px] intake-shadow text-black">
                      <div className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                          <label className="text-[10px] font-bold uppercase text-gray-400 mb-2 block">Width</label>
                          <div className="relative">
                             <input 
                              type="number" 
                              value={dimensions.width}
                              onChange={e => setDimensions({...dimensions, width: e.target.value})}
                              placeholder="0.00"
                              className="w-full bg-gray-50 border border-gray-100 rounded-[8px] p-4 font-bold text-xl outline-none focus:border-black"
                             />
                             <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-gray-300">IN</div>
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase text-gray-400 mb-2 block">Height</label>
                          <div className="relative">
                             <input 
                              type="number" 
                              value={dimensions.height}
                              onChange={e => setDimensions({...dimensions, height: e.target.value})}
                              placeholder="0.00"
                              className="w-full bg-gray-50 border border-gray-100 rounded-[8px] p-4 font-bold text-xl outline-none focus:border-black"
                             />
                             <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-gray-300">IN</div>
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => setStep(4)}
                        disabled={!dimensions.width || !dimensions.height}
                        className="w-full bg-black text-white py-5 rounded-[8px] font-bold uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-brand-neon hover:text-black transition-all disabled:opacity-30"
                      >
                        Next: Art Assets
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Assets */}
                {step === 4 && (
                  <div>
                    <button onClick={() => setStep(3)} className="flex items-center gap-2 text-brand-neon text-xs font-bold uppercase tracking-widest mb-6 hover:translate-x-[-4px] transition-transform">
                      <ChevronRight size={14} className="rotate-180" /> Back
                    </button>
                    <div className="mb-10">
                      <h2 className="text-4xl font-black uppercase tracking-tight mb-2">Art Assets</h2>
                      <p className="text-brand-secondary">Upload your print-ready vector or high-res image.</p>
                    </div>

                    <div className="space-y-6">
                      {!file ? (
                        <label className="flex flex-col items-center justify-center w-full aspect-[2/1] bg-white text-black border-4 border-dashed border-[#EEEEEE] rounded-[24px] cursor-pointer hover:border-black transition-all intake-shadow group">
                          <div className="bg-brand-neon/10 p-6 rounded-full text-brand-neon mb-6 group-hover:scale-110 transition-transform">
                            <Upload size={48} />
                          </div>
                          <span className="text-xl font-bold uppercase">Drag Art Here</span>
                          <span className="text-gray-400 font-mono text-xs mt-2 uppercase">PDF, AI, SVG, OR HIGH-RES PNG</span>
                          <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.ai,.svg,.png,.jpg,.jpeg" />
                        </label>
                      ) : (
                        <div className="bg-white p-8 rounded-[12px] intake-shadow text-black">
                          <div className="flex items-center gap-6 p-6 border-2 border-brand-neon bg-brand-neon/5 rounded-[8px] mb-8">
                             <div className="bg-black text-white p-4 rounded-[6px]">
                               <FileText size={32} />
                             </div>
                             <div className="flex-1">
                               <p className="font-bold uppercase tracking-tight truncate max-w-[200px]">{file.name}</p>
                               <p className="text-[10px] text-gray-500 font-bold uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB • READY</p>
                             </div>
                             <button onClick={() => setFile(null)} className="text-gray-400 hover:text-black transition-colors font-bold uppercase text-[10px]">Remove</button>
                          </div>
                          
                          <button 
                            onClick={handleSubmit}
                            disabled={isUploading}
                            className="w-full bg-black text-white py-5 rounded-[8px] font-bold uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-brand-neon hover:text-black transition-all disabled:opacity-50"
                          >
                            {isUploading ? 'Positioning Assets...' : 'Request Architectural Prototype'}
                            <Check size={20} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Summary */}
              <div className="lg:col-span-4">
                <div className="sticky top-32 space-y-6">
                  <div className="bg-brand-charcoal p-8 rounded-[12px] border border-brand-border">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-brand-neon mb-6">Configuration Summary</h4>
                    
                    <div className="space-y-6">
                      <div className={cn("transition-all", selectedCategory ? "opacity-100" : "opacity-30")}>
                        <p className="text-[10px] font-bold uppercase text-brand-secondary mb-1">Architectural Flow</p>
                        <p className="font-bold border-l-2 border-brand-neon pl-3">{activeCategoryData?.name || 'Pending Selection'}</p>
                      </div>
                      
                      <div className={cn("transition-all", selectedOption ? "opacity-100" : "opacity-30")}>
                        <p className="text-[10px] font-bold uppercase text-brand-secondary mb-1">Specific Substrate</p>
                        <p className="font-bold border-l-2 border-brand-neon pl-3">{selectedOption || 'Pending Optimization'}</p>
                      </div>
                      
                      <div className={cn("transition-all", dimensions.width ? "opacity-100" : "opacity-30")}>
                        <p className="text-[10px] font-bold uppercase text-brand-secondary mb-1">Dimensions</p>
                        <p className="font-bold border-l-2 border-brand-neon pl-3">
                          {dimensions.width ? `${dimensions.width}x${dimensions.height} ${dimensions.unit}` : 'Calculating Scale'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-brand-border">
                       <div className="flex items-start gap-3">
                         <Info size={16} className="text-brand-neon shrink-0 mt-0.5" />
                         <p className="text-[11px] text-brand-secondary italic">Our design team reviews every "Build-A-Product" asset for resolution and print-readiness within 4 hours.</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto text-center py-20"
            >
              <div className="w-24 h-24 bg-brand-neon rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(50,255,14,0.3)]">
                <Check size={48} className="text-black" strokeWidth={4} />
              </div>
              <h2 className="text-5xl font-black uppercase tracking-tight mb-6 leading-none">Visibility Optimization <br /> <span className="text-brand-neon">Confirmed</span></h2>
              <p className="text-brand-secondary mb-10 text-lg">We've received your build specs. An architectural visualization specialist will contact you with a formal quote and production timeline.</p>
              
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => window.location.href = '/'}
                  className="bg-white text-black py-5 rounded-[8px] font-bold uppercase tracking-widest hover:bg-brand-neon transition-all"
                >
                  Return to HeadQuarters
                </button>
                <button 
                  onClick={() => setOrderComplete(false)}
                  className="text-brand-secondary font-bold uppercase text-[10px] tracking-widest hover:text-white transition-colors"
                >
                  Configure Another Project
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
