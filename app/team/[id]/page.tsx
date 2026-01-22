"use client";

import { teamMembers } from "@/lib/team";
import { motion } from "framer-motion";
import { ArrowLeft, Facebook, Instagram, Youtube, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

export default function TeamMemberPage() {
  const { id } = useParams();
  const member = teamMembers.find((m) => m.id === id);

  if (!member) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Member Not Found</h1>
          <Link href="/about" className="text-zinc-400 hover:text-white underline">
            Back to Team
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <Link 
          href="/about"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Team
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden"
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Right Column: Info */}
          <div className="flex flex-col h-full justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">{member.name}</h1>
              <p className="text-xl text-zinc-400 mb-8 font-light tracking-widest uppercase">{member.role}</p>
              
              <div className="h-px w-24 bg-white/20 mb-8" />
              
              <p className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-12">
                {member.bio || member.description}
              </p>

              {member.skills && (
                <div className="mb-12">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6">Expertise</h3>
                  <div className="flex flex-wrap gap-3">
                    {member.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-4 py-2 rounded-full border border-white/10 text-sm hover:bg-white/5 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-6">
                <Link href="#" className="p-4 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all">
                  <Youtube className="w-5 h-5" />
                </Link>
                <Link href="#" className="p-4 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all">
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link href="#" className="p-4 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all">
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link href="#" className="p-4 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all">
                  <Mail className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
