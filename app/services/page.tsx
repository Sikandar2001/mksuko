"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { services } from "@/lib/services";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-20">
      <section className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-green-400 text-sm font-medium tracking-[0.2em] uppercase mb-4"
          >
            Our Agency&apos;s
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-7xl md:text-9xl font-bold tracking-tighter text-white"
          >
            SER<span className="italic font-serif font-light">VICES</span>
          </motion.h2>
        </div>

        {/* Services List */}
        <div className="flex flex-col">
          {services.map((service, index) => (
            <Link key={service.id} href={`/services/${service.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ margin: "-100px" }}
                className="group border-t border-white/10 py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden cursor-pointer"
              >
                {/* Number & Title */}
                <div className={cn(
                  "flex items-center gap-6 relative z-10",
                  service.wide ? "lg:col-span-6" : "lg:col-span-4"
                )}>
                  <span className="text-zinc-500 font-mono text-sm">({service.id})</span>
                  <h3 className={cn(
                    "text-4xl md:text-6xl font-medium tracking-tight text-white group-hover:pl-4 transition-all duration-300",
                    service.className
                  )}>
                    {service.title}
                  </h3>
                </div>

                {/* Center Image Area */}
                <div className={cn(
                  "flex justify-center relative z-10 perspective-[1500px]",
                  service.wide ? "lg:col-span-3 lg:-translate-x-12" : "lg:col-span-4"
                )}>
                  <div className={`relative w-full max-w-[320px] aspect-[4/3] ${service.bgColor} rounded-lg overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] origin-center opacity-100 [transform:rotateX(0deg)_scale(1)] lg:opacity-0 lg:[transform:rotateX(90deg)_scale(0.8)] lg:group-hover:[transform:rotateX(0deg)_scale(1)] lg:group-hover:opacity-100`}>
                     <div className="absolute inset-0 flex items-center justify-center p-8">
                        <div className="relative w-full h-full shadow-2xl">
                           <Image 
                            src={service.src} 
                            alt={service.title} 
                            fill 
                            className="object-cover"
                           />
                        </div>
                     </div>
                  </div>
                </div>

                {/* Description & Button */}
                <div className={cn(
                  "flex flex-col items-end gap-6 relative z-10 text-right",
                  service.wide ? "lg:col-span-3" : "lg:col-span-4"
                )}>
                  <p className="text-zinc-400 max-w-xs text-lg leading-relaxed">
                    {service.description}
                  </p>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
