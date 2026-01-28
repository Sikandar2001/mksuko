"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  authorEmail: string;
  keywords: string[];
  createdAt: any;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      let fetchedPosts: BlogPost[] = [];

      try {
        // Try to fetch from LocalStorage first (Demo Mode)
        const localPosts = JSON.parse(localStorage.getItem('demo_blog_posts') || '[]');
        if (localPosts.length > 0) {
          fetchedPosts = [...fetchedPosts, ...localPosts];
        }

        // Try to fetch from Firebase
        try {
          const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            fetchedPosts.push({ id: doc.id, ...doc.data() } as BlogPost);
          });
        } catch (firebaseError) {
          console.warn("Firebase fetch failed (likely demo mode), showing local posts only:", firebaseError);
        }

        // Sort combined posts by date (descending)
        fetchedPosts.sort((a, b) => {
           const dateA = a.createdAt?.seconds || 0;
           const dateB = b.createdAt?.seconds || 0;
           return dateB - dateA;
        });

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white pt-20 pb-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading posts...</p>
        </div>
      </main>
    );
  }

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
          {posts.length === 0 ? (
            <div className="col-span-full text-center text-zinc-500 py-12">
              No blog posts yet. Check back soon!
            </div>
          ) : (
            posts.map((post, index) => (
              <Link href={`/blog/${post.id}`} key={post.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group cursor-pointer h-full"
                >
                  {/* Image Card */}
                  <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden mb-8 border border-white/10 bg-zinc-900">
                    <Image 
                      src={post.imageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"} 
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
                    <p className="text-zinc-400 line-clamp-2">
                      {post.description}
                    </p>
                    
                    <div className="flex items-center justify-between border-t border-white/10 pt-6">
                      {/* Author */}
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-zinc-800 flex items-center justify-center">
                          {/* Placeholder avatar if no user system yet */}
                          <span className="text-xs font-bold text-zinc-400">
                            {post.authorEmail.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm font-medium tracking-wider uppercase text-zinc-300">
                          {post.authorEmail.split('@')[0]}
                        </span>
                      </div>

                      {/* Category/Keyword */}
                      {post.keywords && post.keywords.length > 0 && (
                        <span className="px-4 py-1 rounded-full border border-white/20 text-xs font-medium tracking-widest uppercase bg-white/5">
                          {post.keywords[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
