"use client";

import { works } from "@/lib/data";
import { ArrowLeft, Globe, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function WorkDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const work = works.find((w) => w.id === id);

  if (!work) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/works" className="text-lime-400 hover:underline">
            Back to Works
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-12 flex justify-between items-center pointer-events-none">
        <Link 
          href="/works" 
          className="pointer-events-auto w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white text-white hover:text-black transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="relative w-full h-[80vh] md:h-screen">
        <div className="absolute inset-0">
          <Image
            src={work.src}
            alt={work.title}
            fill
            className="object-cover opacity-60"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className={`px-4 py-1 rounded-full border border-white/20 text-xs font-bold tracking-widest uppercase bg-black/50 backdrop-blur-sm ${work.color}`}>
                {work.category}
              </span>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8">
              {work.title}
            </h1>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* @ts-ignore */}
              {work.website && (
                <a 
                  // @ts-ignore
                  href={work.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-sm font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors w-fit"
                >
                  <Globe className="w-5 h-5" />
                  <span>Official Website</span>
                </a>
              )}
              
              <Link 
                href="/contact"
                className="flex items-center gap-3 px-8 py-4 border border-white/30 text-white rounded-full text-sm font-bold tracking-widest uppercase hover:bg-white/10 transition-colors w-fit"
              >
                <Mail className="w-5 h-5" />
                <span>Contact Me</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Content Section */}
      <section className="container mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          <div className="md:col-span-4">
            <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-8 sticky top-32">
              Project Overview
            </h2>
          </div>
          
          <div className="md:col-span-8 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-5xl font-medium leading-tight mb-8">
                {work.description}
              </h3>
              
              <div className="text-zinc-400 text-lg leading-relaxed space-y-6">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </motion.div>

            {/* Project Details Grid */}
            <div className="grid grid-cols-2 gap-8 py-12 border-t border-white/10 border-b">
              <div>
                <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Client</h4>
                <p className="text-xl font-medium">Global Brand Inc.</p>
              </div>
              <div>
                <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Year</h4>
                <p className="text-xl font-medium">2024</p>
              </div>
              <div>
                <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Role</h4>
                <p className="text-xl font-medium">Art Direction, Design</p>
              </div>
              <div>
                <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Deliverables</h4>
                <p className="text-xl font-medium">Brand Identity, Web Design</p>
              </div>
            </div>

            {/* Additional Images */}
            <div className="space-y-8">
               <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-zinc-900">
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-700">
                    Image Placeholder 1
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-8">
                  <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900">
                     <div className="absolute inset-0 flex items-center justify-center text-zinc-700">
                       Image Placeholder 2
                     </div>
                  </div>
                  <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900">
                     <div className="absolute inset-0 flex items-center justify-center text-zinc-700">
                       Image Placeholder 3
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Next Project Link */}
      <section className="border-t border-white/10">
        <div className="container mx-auto px-6 py-24 text-center">
            <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-4">Next Project</p>
            <Link 
              href={`/works/${works[(works.findIndex(w => w.id === id) + 1) % works.length].id}`}
              className="inline-block text-5xl md:text-8xl font-bold tracking-tighter hover:text-lime-400 transition-colors"
            >
              {works[(works.findIndex(w => w.id === id) + 1) % works.length].title}
            </Link>
        </div>
      </section>
    </main>
  );
}
