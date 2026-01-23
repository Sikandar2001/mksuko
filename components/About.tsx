"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import React, { useRef } from "react";

// 3D Tilt Card Wrapper
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative ${className}`}
    >
      <div style={{ transform: "translateZ(50px)" }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
};

export default function About() {
  return (
    <section id="about" className="pt-0 pb-0 bg-black relative overflow-hidden" style={{ perspective: "1000px" }}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-6">
          
          {/* Headline */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-white max-w-6xl tracking-tight"
          >
            We Don&apos;t Just Design For The Present <span className="text-zinc-500">—</span> We Craft Experiences For The Future.
          </motion.h2>

          {/* Subtext - Right Aligned */}
          <div className="flex justify-end mt-8">
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-zinc-400 text-lg md:text-xl max-w-xl leading-relaxed text-right font-light"
            >
              Specializing in creating visually captivating designs that leave a lasting impression by transforming your ideas into stunning visuals. Crafting unique and immersive brand narratives that captivate audiences across digital platforms.
            </motion.p>
          </div>

          {/* Stats / Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-0 perspective-container">
            
            {/* Card 1: 360 Stats */}
            <TiltCard className="bg-[#0a0a0a] rounded-3xl p-8 flex flex-col justify-between aspect-square md:aspect-auto md:h-[320px] border border-white/5 hover:border-white/10 transition-colors group">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-6xl md:text-7xl font-bold text-white tracking-tighter">360°</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-xs font-bold tracking-widest text-white/60 uppercase">Hardwork + Dedication</p>
                  <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-lime-400 rounded-full" />
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Card 2: Work Hard 24/7 */}
            <TiltCard className="bg-[#0a0a0a] rounded-3xl p-8 flex items-center justify-between relative overflow-hidden md:h-[320px] border border-white/5 hover:border-white/10 transition-colors group">
               <div className="flex items-center h-full gap-6">
                  {/* WORK Stacked */}
                  <div className="flex flex-col leading-none">
                    <span className="text-5xl font-medium text-white tracking-tighter">WO</span>
                    <span className="text-5xl font-medium text-white tracking-tighter">RK</span>
                  </div>
                  
                  {/* HARD Vertical */}
                  <div className="h-24 w-[1px] bg-white/20 mx-2" />
                  <span className="text-xs font-bold tracking-[0.3em] text-white/60 uppercase -rotate-90 whitespace-nowrap origin-center">HARD</span>
                  
                  {/* 24/7 Rotated */}
                  <span className="text-4xl md:text-5xl font-bold text-white tracking-tighter -rotate-90 ml-2 whitespace-nowrap">24/7</span>
               </div>

               {/* Circle Icon */}
               <div className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-white/20 flex items-center justify-center">
                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                 </div>
               </div>
            </TiltCard>

            {/* Card 3: Future */}
            <TiltCard className="bg-[#0a0a0a] rounded-3xl p-8 flex flex-col justify-between md:h-[320px] border border-white/5 hover:border-white/10 transition-colors group">
              <div className="flex flex-col h-full justify-between">
                <div className="flex items-start justify-between">
                  <h3 className="text-5xl font-bold text-transparent stroke-text tracking-tighter uppercase" style={{ WebkitTextStroke: "1px white" }}>FUTURE</h3>
                  <div className="text-white">
                     <div className="flex">
                        <ChevronRight className="w-8 h-8 -mr-4 opacity-50" />
                        <ChevronRight className="w-8 h-8" />
                     </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs font-bold tracking-widest text-white/80 uppercase leading-relaxed max-w-[200px]">
                    Transforming With Creative Design
                  </p>
                </div>
              </div>
            </TiltCard>

          </div>

        </div>
      </div>
    </section>
  );
}
