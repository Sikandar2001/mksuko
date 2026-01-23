"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { services } from "@/lib/services";
import { TiltCard } from "@/components/TiltCard";

export default function Services() {
  return (
    <section id="services" className="pt-20 pb-0 bg-black text-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-12">
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
            className="text-6xl md:text-8xl font-bold tracking-tighter"
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
                  // @ts-ignore
                  service.wide ? "lg:col-span-4" : "lg:col-span-4"
                )}>
                  <span className="text-zinc-500 font-mono text-sm">({service.id})</span>
                  <h3 className={cn(
                    "text-4xl md:text-6xl font-medium tracking-tight group-hover:pl-4 transition-all duration-300",
                    // @ts-ignore
                    service.className
                  )}>
                    {service.title}
                  </h3>
                </div>

                {/* Center Image Area */}
                <div className={cn(
                  "flex justify-center relative z-10",
                  // @ts-ignore
                  service.wide ? "lg:col-span-5" : "lg:col-span-5"
                )}>
                  <TiltCard className="w-full max-w-[440px]">
                    <div className={`relative w-full aspect-[4/3] ${service.bgColor} rounded-xl overflow-hidden shadow-2xl border border-white/10`}>
                       <div className="absolute inset-0 flex items-center justify-center p-6">
                          <div className="relative w-full h-full shadow-inner rounded-lg overflow-hidden">
                             <Image 
                              src={service.src} 
                              alt={service.title} 
                              fill 
                              className="object-cover transition-transform duration-700 hover:scale-110"
                            />
                          </div>
                       </div>
                    </div>
                  </TiltCard>
                </div>

                {/* Description & Link */}
                <div className={cn(
                  "flex flex-col md:flex-row lg:flex-col justify-between items-start lg:items-end gap-6 text-right relative z-10",
                  // @ts-ignore
                  service.wide ? "lg:col-span-3" : "lg:col-span-3"
                )}>
                  <p className="text-zinc-400 text-lg max-w-xs leading-relaxed text-left lg:text-right group-hover:text-white transition-colors duration-300">
                    {service.description}
                  </p>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 group-hover:scale-110">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

              </motion.div>
            </Link>
          ))}
          <div className="border-t border-white/10" />
        </div>

      </div>
    </section>
  );
}
