"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Youtube, Instagram, Twitter } from "lucide-react";
import Image from "next/image";

const HERO_IMAGES = [
  "/image/av11.png",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2864&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2864&auto=format&fit=crop"
];

export default function Hero() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black pt-24 pb-32">
      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
        
        {/* Main Card Wrapper */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[60vh] md:h-[85vh] group"
        >
          {/* Inner Image Container with Overflow Hidden */}
          <div className="absolute inset-0 rounded-[3rem] overflow-hidden bg-zinc-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImageIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <Image
                  src={HERO_IMAGES[activeImageIndex]}
                  alt="Creative Vision"
                  fill
                  className="object-cover opacity-90"
                  priority
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />

            {/* Typography Overlay */}
            <div className="absolute top-1/2 -translate-y-1/2 left-[5%] z-20 pointer-events-none">
              <motion.h1 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[18vw] lg:text-[14rem] font-bold leading-none text-white tracking-tighter mix-blend-difference"
              >
                MKSUKO
              </motion.h1>
            </div>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute top-[60%] left-[8%] max-w-md z-20"
             >
               <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                 Aluminium Enterprises & Furniture
               </h2>
               <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed drop-shadow-lg">
                 From Concept to Creation — Beautiful design has the power to captivate audiences.
               </p>
               <button className="mt-6 px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition-colors">
                 Read More
               </button>
             </motion.div>
          </div>

           {/* Right Social Sidebar (Notch Style) */}
           <div className="absolute top-1/2 -translate-y-1/2 right-0 bg-black py-8 px-4 rounded-l-3xl flex flex-col gap-8 z-30 border-l border-y border-white/5 shadow-2xl">
              <a href="#" className="text-white hover:text-purple-500 transition-colors"><Youtube size={24} /></a>
             <a href="https://instagram.com/mksuko_official" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500 transition-colors"><Instagram size={24} /></a>
             <a href="#" className="text-white hover:text-blue-400 transition-colors"><Twitter size={24} /></a>
           </div>

           {/* Bottom Gallery */}
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.6 }}
             className="absolute bottom-0 left-1/2 md:left-auto md:right-[10%] -translate-x-1/2 md:translate-x-0 z-30 translate-y-1/2"
           >
             <div className="bg-black p-4 rounded-3xl flex gap-4 border border-white/10 shadow-2xl">
                {HERO_IMAGES.map((src, i) => (
                  <div 
                    key={i} 
                    onClick={() => setActiveImageIndex(i)}
                    onMouseEnter={() => setActiveImageIndex(i)}
                    className={`relative w-20 h-14 md:w-28 md:h-20 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${activeImageIndex === i ? 'ring-2 ring-white scale-105' : 'opacity-50 hover:opacity-100 hover:scale-105'}`}
                  >
                    <Image src={src} alt="Gallery" fill className="object-cover" />
                  </div>
                ))}
             </div>
           </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
