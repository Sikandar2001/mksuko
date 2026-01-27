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
              Committed to delivering reliable, high-quality, and modern solutions tailored to our clients’ needs.
            </p>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-7xl md:text-9xl font-bold tracking-tighter text-transparent stroke-text leading-none"
            style={{ WebkitTextStroke: "2px white" }}
          >
            INDIA
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
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row gap-16 items-start mb-20"
          >
             <div className="lg:w-1/3">
                 <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">About MKSUKO</h2>
                 <div className="h-1 w-20 bg-lime-400 rounded-full"/>
            </div>
            <div className="lg:w-2/3 space-y-8 text-xl md:text-2xl text-zinc-300 leading-relaxed">
                <p>
                    MKSUKO is a professional work and services provider company committed to delivering reliable, high-quality, and modern solutions tailored to our clients’ needs. We believe that great service is not just about completing work—it’s about building long-term trust, transparency, and value.
                </p>
                <p>
                    At MKSUKO, we focus on providing efficient, result-driven services with a strong emphasis on quality, innovation, and customer satisfaction. Every project we take on is handled with attention to detail, professionalism, and a clear understanding of our client’s goals.
                </p>
            </div>
          </motion.div>

          {/* What We Do Grid */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-4">
               <div>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">What We Do</h2>
                  <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
                    We offer a wide range of professional services designed to support businesses and individuals with dependable solutions. Our approach is simple:
                  </p>
               </div>
               <div className="text-right hidden lg:block">
                  <span className="text-xs font-bold tracking-widest text-lime-400 uppercase">Our Process</span>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                 { title: "Understand", subtitle: "the requirement", icon: "01" },
                 { title: "Plan", subtitle: "smartly", icon: "02" },
                 { title: "Execute", subtitle: "with precision", icon: "03" },
                 { title: "Deliver", subtitle: "on time", icon: "04" },
               ].map((item, index) => (
                 <TiltCard key={index} className="bg-zinc-900/50 rounded-2xl p-8 border border-white/10 hover:border-lime-400/50 transition-all duration-300 group min-h-[240px] flex flex-col justify-between">
                    <span className="text-4xl font-bold text-white/10 group-hover:text-lime-400/20 transition-colors">{item.icon}</span>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-zinc-400 uppercase tracking-widest text-xs font-bold">{item.subtitle}</p>
                    </div>
                 </TiltCard>
               ))}
            </div>

            <div className="text-center mt-8">
                <p className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                    No shortcuts. <span className="text-zinc-500">No compromises on quality.</span>
                </p>
            </div>
          </div>

          {/* Our Mission Section */}
          <div className="flex flex-col lg:flex-row gap-16 items-start mt-24 border-t border-white/10 pt-16">
             <div className="lg:w-1/3">
                 <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">Our Mission</h2>
                 <div className="h-1 w-20 bg-lime-400 rounded-full"/>
            </div>
            <div className="lg:w-2/3 text-xl md:text-2xl text-zinc-300 leading-relaxed">
                <p>
                    Our mission is to deliver trusted, high-quality work services that help our clients grow with confidence. We aim to become a reliable service partner by consistently providing value, performance, and satisfaction in every project we handle.
                </p>
            </div>
          </div>

          {/* Our Vision Section */}
          <div className="flex flex-col lg:flex-row gap-16 items-start mt-24 border-t border-white/10 pt-16">
             <div className="lg:w-1/3">
                 <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">Our Vision</h2>
                 <div className="h-1 w-20 bg-lime-400 rounded-full"/>
            </div>
            <div className="lg:w-2/3 text-xl md:text-2xl text-zinc-300 leading-relaxed">
                <p>
                    To build MKSUKO as a recognized and trusted service provider brand, known for professionalism, innovation, and long-term client relationships.
                </p>
            </div>
          </div>

          {/* Our Commitment Section */}
          <div className="flex flex-col lg:flex-row gap-16 items-start mt-24 border-t border-white/10 pt-16">
             <div className="lg:w-1/3">
                 <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">Our Commitment</h2>
                 <div className="h-1 w-20 bg-lime-400 rounded-full"/>
            </div>
            <div className="lg:w-2/3 text-xl md:text-2xl text-zinc-300 leading-relaxed">
                <p>
                    At MKSUKO, quality is not an option—it’s a standard. We are committed to delivering services that meet industry standards and exceed customer expectations, every single time.
                </p>
            </div>
          </div>

          {/* Final Tagline */}
          <div className="mt-24 border-t border-white/10 pt-16 text-center">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">
                  MKSUKO <span className="text-zinc-500">–</span> Trusted Work & Service Provider
              </h2>
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
                    src="/image/image.png"
                    alt="Creative Skills"
                    fill
                    className="object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>

              {/* Right Skills */}
              <div className="space-y-12">
                 {[
                   { name: "Msuko ATTA", value: 70 },
                   { name: "Msuko WATER", value: 80 },
                   { name: "Aluminium and Furniture", value: 90 },
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
