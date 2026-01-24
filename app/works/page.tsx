"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { works } from "@/lib/data";

const WorkCard = ({ work, index }: { work: typeof works[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="sticky top-24 w-full h-[80vh] md:h-[90vh] rounded-t-[3rem] overflow-hidden shadow-2xl origin-top"
      style={{
        zIndex: index + 1,
      }}
    >
      <div className="relative w-full h-full group">
        <Image
          src={work.src}
          alt={work.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          unoptimized
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 text-center text-white p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4"
          >
            <span className="px-4 py-1.5 border border-white/30 rounded-full text-xs font-bold tracking-widest uppercase bg-white/10 backdrop-blur-md">
              {work.category}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 uppercase"
          >
            {work.title}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href={`/works/${work.id}`}
              className="group/btn inline-flex items-center gap-2 text-sm font-bold tracking-[0.2em] uppercase hover:text-gray-300 transition-colors"
            >
              <span>Explore</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default function WorksPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="text-lime-400 text-lg">¬</span>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/60">
              OUR LATEST
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-6xl md:text-9xl font-bold tracking-tighter text-center"
          >
            WORKS
          </motion.h1>
        </div>

        {/* Works Stack */}
        <div className="flex flex-col items-center gap-10 md:gap-0 pb-20">
          {works.map((work, index) => (
            <WorkCard key={work.id} work={work} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-20">
            <Link 
                href="/contact"
                className="text-zinc-500 hover:text-white transition-colors text-sm font-bold tracking-widest uppercase"
            >
                Start a Project
            </Link>
        </div>

      </div>
    </div>
  );
}
