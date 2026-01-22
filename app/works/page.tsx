"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { works } from "@/lib/data";

const WorkItem = ({ work }: { work: typeof works[0] }) => {
  return (
    <section className="h-screen w-screen min-w-full snap-start flex flex-col md:flex-row relative group overflow-hidden">
      
      {/* Left Content (Text) - Divided Layout */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center items-start px-8 md:px-20 bg-black z-20 border-r border-white/5 relative">
         <motion.div 
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           viewport={{ once: false }}
           className="max-w-lg"
         >
           <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-12 bg-lime-400"></span>
              <span className="text-lime-400 text-sm font-bold tracking-[0.2em] uppercase">
                {work.category}
              </span>
           </div>
           
           <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-8 leading-none">
             {work.title}
           </h2>
           
           <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-sm">
             {work.description}
           </p>

           <Link href={`/works/${work.id}`} className="inline-flex items-center gap-2 text-white border-b border-white/30 pb-1 hover:border-lime-400 hover:text-lime-400 transition-colors uppercase tracking-widest text-sm font-bold group-hover:pl-2 transition-all">
             <span>View Case Study</span>
             <ArrowUpRight className="w-4 h-4" />
           </Link>
         </motion.div>
         
         {/* Background Number */}
         <div className="absolute bottom-10 left-10 md:left-20 text-[10rem] md:text-[15rem] font-bold text-white/5 select-none pointer-events-none leading-none -z-10">
           0{work.id}
         </div>
      </div>

      {/* Right Content (Image) - Divided Layout */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-zinc-900">
        <Link href={`/works/${work.id}`} className="block w-full h-full cursor-pointer">
          <motion.div
             initial={{ scale: 1.2 }}
             whileInView={{ scale: 1 }}
             transition={{ duration: 1.5, ease: "easeOut" }}
             className="w-full h-full relative"
          >
             <Image
               src={work.src}
               alt={work.title}
               fill
               className="object-cover transition-transform duration-700 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
          </motion.div>
        </Link>
      </div>

    </section>
  );
};

export default function WorksPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      onWheel={(e) => {
        const container = containerRef.current;
        if (container && e.deltaY !== 0) {
          container.scrollLeft += e.deltaY;
        }
      }}
      className="h-screen w-full bg-black overflow-x-scroll overflow-y-hidden snap-x snap-mandatory scroll-smooth flex"
    >
      {works.map((work) => (
        <WorkItem key={work.id} work={work} />
      ))}
    </div>
  );
}
