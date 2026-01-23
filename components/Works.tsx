"use client";

import { useState, useRef } from "react";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useMotionValueEvent,
  MotionValue,
  useSpring
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const works = [
  {
    id: 1,
    title: "ANIL VISHVAKARMA",
    category: "Aluminium enterprises & Furnitures",
    src: "/image/av12.png",
    color: "text-red-500"
  },
  {
    id: 2,
    title: "MKSUKO ATTA",
    category: "FOOD PRODUCTS",
    src: "/image/av2.png", 
    color: "text-orange-500"
  },
  {
    id: 3,
    title: "REALITY",
    category: "CONCEPT",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    color: "text-white"
  },
  {
    id: 4,
    title: "ELEGANCE",
    category: "FASHION",
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop",
    color: "text-blue-400"
  },
  {
    id: 5,
    title: "FUTURE",
    category: "DIGITAL",
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
    color: "text-purple-500"
  }
];

// Sub-component for individual carousel items to allow hook usage
const CarouselItem = ({ 
  work, 
  index, 
  rotation, 
  total, 
  isActive 
}: { 
  work: typeof works[0], 
  index: number, 
  rotation: MotionValue<number>, 
  total: number,
  isActive: boolean
}) => {
  const angleStep = 360 / total;
  const radius = 260;

  // Transform rotation value to item-specific values
  const theta = useTransform(rotation, (r) => (index - r) * angleStep);
  
  const x = useTransform(theta, (t) => radius * Math.sin(t * (Math.PI / 180)));
  const z = useTransform(theta, (t) => radius * Math.cos(t * (Math.PI / 180)));
  const rotateY = useTransform(theta, (t) => t);
  
  const opacity = useTransform(theta, (t) => {
    // Normalize angle to -180 to 180
    let norm = t % 360;
    if (norm > 180) norm -= 360;
    if (norm < -180) norm += 360;
    
    // Back items (angle > 90 or < -90) get lower opacity
    return Math.abs(norm) > 90 ? 0.6 : 1;
  });

  const scale = useTransform(theta, (t) => {
    let norm = t % 360;
    if (norm > 180) norm -= 360;
    if (norm < -180) norm += 360;
    
    // Smooth scale interpolation based on how close to center (0)
    // Front item (0 deg) -> 1.1, Back items -> 0.85
    const dist = Math.abs(norm);
    if (dist > 90) return 0.85;
    return 1.1 - (dist / 90) * 0.25; 
  });

  return (
    <motion.div
      style={{
        x,
        z,
        rotateY,
        opacity,
        scale,
      }}
      suppressHydrationWarning
      className="absolute left-1/2 top-1/2 w-[220px] md:w-[280px] aspect-[2/3] rounded-xl overflow-hidden border border-white/10 bg-zinc-900 work-card shadow-2xl -ml-[110px] -mt-[165px] md:-ml-[140px] md:-mt-[210px] [transform-style:preserve-3d]"
    >
      <Link href={`/works/${work.id}`} className="block w-full h-full cursor-pointer">
        <div className="w-full h-full relative group">
          <Image 
            src={work.src} 
            alt={work.title} 
            fill 
            className="object-cover"
            priority={isActive}
          />
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent transition-opacity duration-300 ${isActive ? 'opacity-60' : 'opacity-80'}`} />
          
          {/* Title on Card */}
          <div className={`absolute bottom-6 left-0 w-full text-center transition-all duration-300 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tighter drop-shadow-2xl px-2">
              {work.title}
            </h2>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function Works() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(works[0].id);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Create a smooth spring-based scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map scroll progress (0 to 1) to rotation index (0 to works.length - 1)
  // We want to rotate through all items as we scroll down.
  const rotationIndex = useTransform(smoothProgress, [0, 1], [0, works.length - 1]);

  // Update active state based on rotation
  useMotionValueEvent(rotationIndex, "change", (latest) => {
    const index = Math.round(latest);
    const safeIndex = Math.max(0, Math.min(index, works.length - 1));
    if (works[safeIndex].id !== activeId) {
      setActiveId(works[safeIndex].id);
    }
  });

  const activeWork = works.find(w => w.id === activeId) || works[0];

  return (
    // Tall container for scrolling track (200vh = 2 screens worth of scroll)
    <div ref={containerRef} id="works" className="relative h-[200vh] bg-black z-10">
      
      {/* Sticky Content Wrapper */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
        
        {/* Title Section */}
        <div className="absolute top-20 left-0 w-full flex flex-col items-center justify-center z-20 pointer-events-none">
            <div className="flex items-center gap-2 mb-1">
                <span className="text-lime-400 text-lg font-light">¬</span>
                <span className="text-xs font-bold tracking-[0.3em] text-white/60 uppercase">FEATURED</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-medium text-white tracking-tighter select-none">WORK</h1>
        </div>

        {/* 3D Carousel Container */}
        <div className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center perspective-container z-10 mt-24">
          <div className="relative w-full h-full flex items-center justify-center" 
               style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
            
            {works.map((work, index) => (
              <CarouselItem 
                key={work.id}
                work={work}
                index={index}
                rotation={rotationIndex}
                total={works.length}
                isActive={work.id === activeId}
              />
            ))}
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="relative z-20 flex flex-col items-center justify-center gap-3 mt-4">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeWork.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.3 }}
               className="px-5 py-1.5 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm"
             >
               <span className="text-xs font-medium text-white tracking-widest uppercase">
                 {activeWork.category}
               </span>
             </motion.div>
           </AnimatePresence>
           
           <Link href="/works">
             <div className="flex items-center gap-2 text-white/40 text-[10px] tracking-widest uppercase hover:text-white transition-colors cursor-pointer group">
               <span>Explore Projects</span>
               <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
             </div>
           </Link>
        </div>
      </div>
    </div>
  );
}
