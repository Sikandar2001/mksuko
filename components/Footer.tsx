"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const footerImages = [
  "/image/av11.png", // Model
  "/image/water.png", // Male model
  "/image/mksuko.png", // Fashion
  "/image/av7.png", // Abstract
  "/image/av9.png", // Portrait
  "/image/mksuko.png", // Tech
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* CTA Section */}
        <div className="flex flex-col items-center justify-center leading-none select-none mb-0">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[6rem] md:text-[10rem] lg:text-[13rem] font-bold tracking-tighter flex flex-col items-center justify-center gap-0 md:gap-4 text-white"
          >
            <div className="flex items-center gap-4">
              <span>HI</span>
              <div className="w-[0.8em] h-[0.8em] rounded-full border-[0.1em] border-white flex items-center justify-center">
                <span className="text-[0.6em] -mt-[0.1em]">@</span>
              </div>
            </div>
            <span>MKSUKO</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 md:mt-16 flex items-center justify-center gap-4"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black">
              <ArrowUpRight className="w-6 h-6" />
            </div>
            <Link 
              href="/contact" 
              className="px-8 py-3 rounded-full border border-white text-lg font-medium tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              CONTACT
            </Link>
          </motion.div>
        </div>

        {/* Tilted Image Marquee */}
        <div className="relative w-full pt-10 mt-10 pb-10 -mx-6 md:-mx-12 mb-20 overflow-hidden" style={{ perspective: "1000px" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none" />
          <div style={{ transform: "rotateX(10deg) rotateY(-5deg) rotateZ(-6deg) scale(1.1)", transformStyle: "preserve-3d" }}>
            <motion.div 
              className="flex gap-8 origin-center"
              initial={{ x: 0 }}
              animate={{ x: "-50%" }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              style={{ width: "fit-content" }}
            >
              {[...footerImages, ...footerImages, ...footerImages].map((src, index) => (
                <div 
                  key={index} 
                  className="relative w-[200px] md:w-[280px] aspect-[3/4] rounded-2xl overflow-hidden shrink-0 border border-white/10 transition-all duration-500 shadow-2xl bg-zinc-900"
                >
                  <Image 
                    src={src} 
                    alt={`Footer gallery ${index}`}
                    fill 
                    className="object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-t border-white/10 pt-16">
          <div className="md:col-span-2">
            <Link href="/" className="text-3xl font-bold tracking-tighter mb-6 block">
              MKSUKO
            </Link>
            <p className="text-gray-400 max-w-sm text-lg">
              Our company is committed to delivering high-quality work that meets industry standards and goes beyond customer expectations.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link href="/home" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/works" className="text-gray-400 hover:text-white transition-colors">Our Work</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/blog/create" className="text-gray-400 hover:text-white transition-colors">Post Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="text-gray-400">mksuko@gmail.com</li>
              <li className="text-gray-400">Greater Noida</li>
              <li className="text-gray-400">+91-8542898438, 8576898438</li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} MKSUKO. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
