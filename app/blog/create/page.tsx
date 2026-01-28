"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Image as ImageIcon, Link as LinkIcon, Type, Save, Heading1, Heading2, Heading3, Heading4, Heading5, Settings, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "@/lib/firebase";

export default function CreateBlogPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for Demo Mode authentication first
    const isDemo = localStorage.getItem('isDemoAuthenticated') === 'true';
    if (isDemo) {
      setIsAuthenticated(true);
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [isSeoOpen, setIsSeoOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (contentRef.current) {
        contentRef.current.focus();
    }
  };

  const addHeading = (level: number) => {
    execCommand('formatBlock', `<H${level}>`);
  };

  const addLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      execCommand('createLink', url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const content = contentRef.current?.innerHTML;
    
    // Check if we are in Demo Mode
    const isDemo = localStorage.getItem('isDemoAuthenticated') === 'true';

    try {
      let imageUrl = null;

      if (isDemo) {
        // Demo Mode: Simulate upload and save to LocalStorage
        if (image) {
          try {
            imageUrl = await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onload = (e) => resolve(e.target?.result as string);
              reader.readAsDataURL(image);
            });
          } catch (e) {
            console.error("Error converting image for demo mode", e);
            // Fallback if conversion fails
            imageUrl = "https://images.unsplash.com/photo-1499750310159-5b5f0072643f?q=80&w=800&auto=format&fit=crop"; 
          }
        }

        const newPost = {
          id: `demo-${Date.now()}`,
          title,
          description,
          keywords: keywords.split(',').map(k => k.trim()).filter(k => k),
          content,
          imageUrl,
          seo: {
            title: seoTitle || title,
            description: seoDescription || description,
            keywords: seoKeywords || keywords
          },
          createdAt: { seconds: Date.now() / 1000 }, // Simulate Firestore timestamp
          authorId: 'demo-user',
          authorEmail: 'demo@example.com',
        };

        // Save to LocalStorage
        const existingPosts = JSON.parse(localStorage.getItem('demo_blog_posts') || '[]');
        localStorage.setItem('demo_blog_posts', JSON.stringify([newPost, ...existingPosts]));

        await new Promise(resolve => setTimeout(resolve, 1000)); // Fake network delay
        alert("Blog post published successfully (Demo Mode)!");
        router.push("/blog");
        return;
      }

      // Real Firebase Mode
      // Upload image if selected
      if (image) {
        // Create a unique filename
        const filename = `blog/${Date.now()}_${image.name}`;
        const storageRef = ref(storage, filename);
        
        // Upload the file
        const snapshot = await uploadBytes(storageRef, image);
        
        // Get the download URL
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // Create blog post document
      const blogPost = {
        title,
        description,
        keywords: keywords.split(',').map(k => k.trim()).filter(k => k),
        content,
        imageUrl,
        seo: {
          title: seoTitle || title,
          description: seoDescription || description,
          keywords: seoKeywords || keywords
        },
        createdAt: serverTimestamp(),
        authorId: auth.currentUser?.uid || 'anonymous',
        authorEmail: auth.currentUser?.email || 'anonymous',
      };

      // Save to Firestore
      const docRef = await addDoc(collection(db, "blogs"), blogPost);
      console.log("Document written with ID: ", docRef.id);

      alert("Blog post published successfully!");
      router.push("/blog"); // Redirect to blog list
    } catch (error) {
      console.error("Error adding document: ", error);
      // Fallback to demo mode if Firebase fails (e.g. no keys)
      if (confirm("Unable to connect to the cloud database. Would you like to save locally instead?")) {
         let localImageUrl = null;
         
         // Try to convert image to Base64 for local storage
         if (image) {
           try {
             localImageUrl = await new Promise<string>((resolve) => {
               const reader = new FileReader();
               reader.onload = (e) => resolve(e.target?.result as string);
               reader.readAsDataURL(image);
             });
           } catch (e) {
             console.error("Error converting image for local save", e);
           }
         }

         const newPost = {
          id: `local-${Date.now()}`,
          title,
          description,
          keywords: keywords.split(',').map(k => k.trim()).filter(k => k),
          content,
          imageUrl: localImageUrl,
          createdAt: { seconds: Date.now() / 1000 },
          authorEmail: 'offline@user.com',
        };
        const existingPosts = JSON.parse(localStorage.getItem('demo_blog_posts') || '[]');
        localStorage.setItem('demo_blog_posts', JSON.stringify([newPost, ...existingPosts]));
        alert("Saved locally!");
        router.push("/blog");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black text-white pt-20 pb-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-400">Checking authentication...</p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <main className="min-h-screen bg-black text-white pt-20 pb-24">
      <div className="container mx-auto px-6">
        
        {/* Navigation */}
        <div className="mb-12">
          <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-8">Create New Post</h1>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title"
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-6 py-4 text-xl focus:outline-none focus:border-white/30 transition-colors"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter short description"
                  rows={3}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-white/30 transition-colors resize-none"
                  required
                />
              </div>

              {/* Keywords */}
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Keywords</label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="design, tech, tutorial (comma separated)"
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              {/* Featured Image */}
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Featured Image</label>
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className={`w-full h-64 border-2 border-dashed ${imagePreview ? 'border-transparent' : 'border-zinc-800'} rounded-2xl flex flex-col items-center justify-center bg-zinc-900 transition-colors group-hover:border-zinc-700 overflow-hidden`}>
                    {imagePreview ? (
                      <Image 
                        src={imagePreview} 
                        alt="Preview" 
                        fill 
                        className="object-cover" 
                      />
                    ) : (
                      <>
                        <ImageIcon className="w-12 h-12 text-zinc-700 mb-4" />
                        <span className="text-zinc-500 font-medium">Click or drag image to upload</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Content Editor */}
              <div className="space-y-4">
                <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Content</label>
                <div className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden">
                  {/* Toolbar */}
                  <div className="flex items-center gap-2 p-4 border-b border-white/10 overflow-x-auto">
                    <button type="button" onClick={() => addHeading(1)} className="p-2 hover:bg-white/10 rounded transition-colors" title="Heading 1">
                      <Heading1 className="w-5 h-5" />
                    </button>
                    <button type="button" onClick={() => addHeading(2)} className="p-2 hover:bg-white/10 rounded transition-colors" title="Heading 2">
                      <Heading2 className="w-5 h-5" />
                    </button>
                    <button type="button" onClick={() => addHeading(3)} className="p-2 hover:bg-white/10 rounded transition-colors" title="Heading 3">
                      <Heading3 className="w-5 h-5" />
                    </button>
                    <button type="button" onClick={() => addHeading(4)} className="p-2 hover:bg-white/10 rounded transition-colors" title="Heading 4">
                      <Heading4 className="w-5 h-5" />
                    </button>
                    <button type="button" onClick={() => addHeading(5)} className="p-2 hover:bg-white/10 rounded transition-colors" title="Heading 5">
                      <Heading5 className="w-5 h-5" />
                    </button>
                    <div className="w-px h-6 bg-white/10 mx-2" />
                    <button type="button" onClick={() => addLink()} className="p-2 hover:bg-white/10 rounded transition-colors" title="Link">
                      <LinkIcon className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Editable Area */}
                  <div
                    ref={contentRef}
                    contentEditable
                    className="w-full min-h-[400px] p-6 focus:outline-none max-w-none text-white [&>div]:text-white [&>p]:text-white [&>span]:text-white [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:mb-4 [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mb-3 [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mb-2 [&>h4]:text-xl [&>h4]:font-bold [&>h4]:mb-2 [&>h5]:text-lg [&>h5]:font-bold [&>h5]:mb-2 [&>p]:mb-4 [&>a]:text-blue-400 [&>a]:underline"
                    onInput={() => {}} // Optional: sync with state if needed
                  />
                </div>
              </div>

              {/* SEO Settings */}
              <div className="border border-white/10 rounded-2xl overflow-hidden bg-zinc-900/50">
                <button
                  type="button"
                  onClick={() => setIsSeoOpen(!isSeoOpen)}
                  className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-zinc-400" />
                    <span className="text-lg font-bold uppercase tracking-widest">SEO Settings</span>
                  </div>
                  {isSeoOpen ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
                </button>

                {isSeoOpen && (
                  <div className="p-6 border-t border-white/10 space-y-6">
                    <p className="text-zinc-400 text-sm mb-4">
                      Configure how this post appears in search engine results. If left blank, default values from the post details will be used.
                    </p>
                    
                    {/* SEO Title */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Meta Title</label>
                      <input
                        type="text"
                        value={seoTitle}
                        onChange={(e) => setSeoTitle(e.target.value)}
                        placeholder={title || "Enter meta title"}
                        className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/30 transition-colors"
                      />
                      <p className="text-xs text-zinc-500 text-right">{seoTitle.length} / 60 characters</p>
                    </div>

                    {/* SEO Description */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Meta Description</label>
                      <textarea
                        value={seoDescription}
                        onChange={(e) => setSeoDescription(e.target.value)}
                        placeholder={description || "Enter meta description"}
                        rows={3}
                        className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/30 transition-colors resize-none"
                      />
                      <p className="text-xs text-zinc-500 text-right">{seoDescription.length} / 160 characters</p>
                    </div>

                    {/* SEO Keywords */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Meta Keywords</label>
                      <input
                        type="text"
                        value={seoKeywords}
                        onChange={(e) => setSeoKeywords(e.target.value)}
                        placeholder={keywords || "Enter meta keywords"}
                        className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Publish Post</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
