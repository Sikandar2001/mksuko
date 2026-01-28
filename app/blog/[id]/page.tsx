"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string | null;
  authorEmail: string;
  keywords: string[];
  createdAt: any;
  seo?: {
    title: string;
    description: string;
    keywords: string;
  };
}

export default function BlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      // Try LocalStorage first (Demo Mode)
      const localPosts = JSON.parse(localStorage.getItem('demo_blog_posts') || '[]');
      const localPost = localPosts.find((p: any) => p.id === id);
      
      if (localPost) {
        setPost(localPost);
        setLoading(false);
        return;
      }

      // If not in LocalStorage, try Firestore
      try {
        const docRef = doc(db, "blogs", id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() } as BlogPost);
        } else {
          setError("Post not found");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Error loading post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Update page title dynamically
  useEffect(() => {
    if (post) {
      const pageTitle = post.seo?.title || post.title;
      document.title = `${pageTitle} | Mksuko Blog`;
      
      // Update meta description if possible (client-side only)
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && (post.seo?.description || post.description)) {
        metaDesc.setAttribute('content', post.seo?.description || post.description);
      }
    }
  }, [post]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white pt-32 pb-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading post...</p>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen bg-black text-white pt-32 pb-24 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-red-500">Error</h1>
          <p className="text-zinc-400">{error || "Post not found"}</p>
          <Link href="/blog" className="inline-flex items-center gap-2 text-white border border-white/20 px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </main>
    );
  }

  // Format date if exists
  const date = post.createdAt?.seconds 
    ? new Date(post.createdAt.seconds * 1000).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : "Recently";

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-24">
      <article className="container mx-auto px-6 max-w-4xl">
        
        {/* Navigation */}
        <div className="mb-12">
          <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Blog</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <header className="mb-12 space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400 mb-6">
              {post.keywords && post.keywords.length > 0 && (
                <span className="px-3 py-1 rounded-full border border-white/20 text-xs font-medium uppercase bg-white/5 text-white">
                  {post.keywords[0]}
                </span>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.authorEmail?.split('@')[0] || 'Admin'}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {post.title}
            </h1>

            {post.description && (
              <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">
                {post.description}
              </p>
            )}
          </header>

          {/* Featured Image */}
          {post.imageUrl && (
            <div className="relative aspect-video rounded-[2rem] overflow-hidden mb-16 border border-white/10 bg-zinc-900">
              <Image 
                src={post.imageUrl} 
                alt={post.title} 
                fill 
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div 
            className="w-full max-w-none text-lg text-zinc-300 leading-relaxed
              [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:text-white [&>h1]:mb-6 [&>h1]:mt-10
              [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mb-4 [&>h2]:mt-8
              [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-white [&>h3]:mb-3 [&>h3]:mt-6
              [&>h4]:text-xl [&>h4]:font-bold [&>h4]:text-white [&>h4]:mb-3 [&>h4]:mt-4
              [&>h5]:text-lg [&>h5]:font-bold [&>h5]:text-white [&>h5]:mb-2 [&>h5]:mt-4
              [&>p]:text-lg [&>p]:text-zinc-300 [&>p]:leading-relaxed [&>p]:mb-6
              [&>div]:text-lg [&>div]:text-zinc-300 [&>div]:leading-relaxed [&>div]:mb-6
              [&>span]:text-zinc-300
              [&>a]:text-blue-400 [&>a]:underline hover:[&>a]:text-blue-300
              [&>blockquote]:border-l-4 [&>blockquote]:border-white/20 [&>blockquote]:bg-white/5 [&>blockquote]:px-6 [&>blockquote]:py-4 [&>blockquote]:my-6 [&>blockquote]:rounded-r-lg [&>blockquote]:text-zinc-300
              [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:text-zinc-300
              [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:text-zinc-300
              [&>li]:mb-2
              [&>img]:rounded-2xl [&>img]:my-8 [&>img]:w-full"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />

          {/* Tags */}
          {post.keywords && post.keywords.length > 0 && (
            <div className="mt-16 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 text-zinc-500 mb-4">
                <Tag className="w-4 h-4" />
                <span className="text-sm font-bold uppercase tracking-widest">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.keywords.map((keyword, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 text-sm hover:text-white hover:border-white/30 transition-colors cursor-default"
                  >
                    #{keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </article>
    </main>
  );
}
