"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const posts = [
  {
    id: 1,
    title: "Redesigned A Website",
    image: "https://images.unsplash.com/photo-1558655146-d09347e0b7a9?q=80&w=800&auto=format&fit=crop", // Orange/Laptop vibe
    author: {
      name: "MARIA CARTER",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
    },
    category: "DESIGN"
  },
  {
    id: 2,
    title: "How To Use Color Effectively",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop", // Cup/Minimal vibe
    author: {
      name: "JOHN SMITH",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"
    },
    category: "THEORY"
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-20 pb-24">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Our <span className="italic font-serif font-light">Blog</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Stay ahead of the curve with our latest insights, tips, and industry trends.
          </motion.p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              {/* Image Card */}
              <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden mb-8 border border-white/10 bg-zinc-900">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="space-y-6">
                <h3 className="text-3xl md:text-4xl font-medium leading-tight group-hover:text-zinc-300 transition-colors">
                  {post.title}
                </h3>
                
                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20">
                      <Image 
                        src={post.author.avatar} 
                        alt={post.author.name} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium tracking-wider uppercase text-zinc-300">
                      {post.author.name}
                    </span>
                  </div>

                  {/* Category */}
                  <span className="px-4 py-1 rounded-full border border-white/20 text-xs font-medium tracking-widest uppercase bg-white/5">
                    {post.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
