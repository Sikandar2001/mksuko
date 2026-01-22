"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  return (
    <section className="py-32 bg-black text-white flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        
        {/* Large Typography */}
        <div className="flex flex-col items-center justify-center leading-none select-none mb-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[6rem] md:text-[10rem] lg:text-[13rem] font-bold tracking-tighter flex flex-col items-center justify-center gap-0 md:gap-4"
          >
            <div className="flex items-center gap-4">
              <span>HI</span>
              <div className="w-[0.8em] h-[0.8em] rounded-full border-[0.1em] border-white flex items-center justify-center">
                <span className="text-[0.6em] -mt-[0.1em]">@</span>
              </div>
            </div>
            <span>MKSUKO</span>
          </motion.div>
        </div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 md:mt-0 flex items-center justify-center gap-4"
        >
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black">
            <ArrowUpRight className="w-6 h-6" />
          </div>
          <Link 
            href="/contact" 
            className="px-8 py-3 rounded-full border border-white text-lg font-medium tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            CONTACT
          </Link>
        </motion.div>

      </div>

      <style jsx>{`
        .font-outline-2 {
          -webkit-text-stroke: 2px white;
        }
        @media (min-width: 768px) {
          .font-outline-2 {
            -webkit-text-stroke: 3px white;
          }
        }
      `}</style>
    </section>
  );
}
