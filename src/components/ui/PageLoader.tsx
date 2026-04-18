import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PageLoaderProps {
  isLoading: boolean;
}

export default function PageLoader({ isLoading }: PageLoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-brand-matte flex flex-col items-center justify-center p-10"
        >
          <div className="relative">
            {/* Logo Mark */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-extrabold uppercase tracking-[-2px] mb-8"
            >
              Nelson<span className="text-brand-neon">'s</span>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-48 h-[2px] bg-brand-charcoal relative overflow-hidden">
              <motion.div
                initial={{ left: '-100%' }}
                animate={{ left: '100%' }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute top-0 bottom-0 w-full bg-brand-neon"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-secondary text-center"
            >
              Architecting Visibility
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
