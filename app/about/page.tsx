"use client";

import { motion } from "framer-motion";
import { Youtube, Instagram, Facebook, ChevronRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { teamMembers } from "@/lib/team";
import { TiltCard } from "@/components/TiltCard";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Section 1: Header (ABOUT US) */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl md:text-9xl font-bold tracking-tighter leading-none"
          >
            ABOUT
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:max-w-md mb-2 text-center md:text-right mx-auto md:mx-0 md:mr-auto md:pl-20 self-center"
          >
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              The forefront of innovation — Seamlessly blending creativity with technology to deliver stunning visual experiences.
            </p>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-7xl md:text-9xl font-bold tracking-tighter text-transparent stroke-text leading-none"
            style={{ WebkitTextStroke: "2px white" }}
          >
            US
          </motion.h1>
        </div>

        {/* Section 2: Main Image (Vertical Strips Effect) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full h-[60vh] md:h-[80vh] rounded-2xl overflow-hidden mb-32 group"
        >
          <Image
            src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop" 
            alt="About Us Vision"
            fill
            className="object-cover"
          />
          {/* Vertical Strips Overlay Effect */}
          <div className="absolute inset-0 flex">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="flex-1 bg-black/20 border-r border-white/5 backdrop-blur-[1px]" 
              />
            ))}
          </div>
        </motion.div>

        {/* Section 3: Brand Narrative & Stats */}
        <div className="mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-white max-w-6xl tracking-tight mb-16"
          >
            We Don&apos;t Just Design For The Present <span className="text-zinc-500">—</span> We Craft Experiences For The Future.
          </motion.h2>

          {/* Stats / Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-container">
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

            {/* Card 2: Strategy/Work */}
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

        {/* Section 4: Team */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-7xl font-medium tracking-tighter">
                Our <span className="italic font-light text-zinc-400">Team</span>
              </h2>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xs text-right mt-8 md:mt-0"
            >
              <h3 className="text-xs font-bold tracking-widest uppercase mb-2">Get To Know</h3>
              <p className="text-zinc-400 text-sm">
                Our team of talented designers and developers bring expertise and creativity to every project.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group cursor-pointer"
              >
                <Link href={`/team/${member.id}`}>
                  <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-6 bg-zinc-900">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="text-center p-6 bg-zinc-900/30 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                    <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                    <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase block mb-4">{member.role}</span>
                    <p className="text-zinc-400 text-sm mb-6 min-h-[40px]">{member.description}</p>
                    
                    <div className="flex justify-center gap-4 text-white">
                      <div className="p-2 hover:bg-white/10 rounded-full transition-colors" onClick={(e) => e.stopPropagation()}>
                        <Youtube className="w-4 h-4 hover:text-red-500 cursor-pointer transition-colors" />
                      </div>
                      <div className="p-2 hover:bg-white/10 rounded-full transition-colors" onClick={(e) => e.stopPropagation()}>
                        <Instagram className="w-4 h-4 hover:text-pink-500 cursor-pointer transition-colors" />
                      </div>
                      <div className="p-2 hover:bg-white/10 rounded-full transition-colors" onClick={(e) => e.stopPropagation()}>
                        <Facebook className="w-4 h-4 hover:text-blue-500 cursor-pointer transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 5: Core Projects */}
        <div className="mb-20">
            <div className="text-center mb-16 relative">
              <span className="text-xs font-bold tracking-widest uppercase text-zinc-500 block mb-2">CORE</span>
              <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white">PROJECT</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Image */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative w-full aspect-[3/4] lg:aspect-[4/5] rounded-2xl overflow-hidden"
              >
                 <Image
                    src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop"
                    alt="Creative Skills"
                    fill
                    className="object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>

              {/* Right Skills */}
              <div className="space-y-12">
                 {[
                   { name: "WEB DESIGN", value: 70 },
                   { name: "DEVELOPMENT", value: 80 },
                   { name: "UX/UI CONCEPT", value: 90 },
                   { name: "BRANDING", value: 65 },
                 ].map((skill, index) => (
                   <motion.div 
                     key={skill.name}
                     initial={{ opacity: 0, x: 50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.6, delay: index * 0.1 }}
                   >
                     <div className="flex justify-between items-end mb-4">
                       <h3 className="text-2xl md:text-3xl font-medium tracking-tight">{skill.name}</h3>
                       <span className="text-sm font-bold text-zinc-500">{skill.value}%</span>
                     </div>
                     <div className="w-full h-[1px] bg-white/20 relative">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          className="absolute top-0 left-0 h-full bg-white"
                        />
                     </div>
                   </motion.div>
                 ))}
              </div>
            </div>
        </div>

      </div>
    </main>
  );
}
