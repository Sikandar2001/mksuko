"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Plus, Minus, Smartphone } from "lucide-react";

const faqs = [
  {
    question: "What Types Of Services Do You Offer?",
    answer: "We offer a comprehensive range of digital services including branding, web design, development, and digital marketing strategies tailored to your business needs."
  },
  {
    question: "How Do We Get Started On A Project?",
    answer: "Simply reach out to us through our contact form or email. We'll schedule an initial consultation to discuss your goals and requirements."
  },
  {
    question: "How Long Does It Take To Complete A Project?",
    answer: "Project timelines vary depending on complexity and scope. Typically, a standard website takes 4-8 weeks, while larger platforms may take longer."
  },
  {
    question: "What Is The Cost Of Your Services?",
    answer: "Our pricing is project-based and depends on your specific requirements. We provide detailed quotes after our initial consultation."
  }
];

const ContactInfoCard = ({ icon: Icon, title, content }: { icon: any, title: string, content: React.ReactNode }) => (
  <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-8 flex items-center gap-6">
    <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shrink-0">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">{title}</h3>
      <div className="text-lg text-white font-medium">{content}</div>
    </div>
  </div>
);

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-black text-white pt-12 pb-24">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-lime-400 text-sm font-bold tracking-[0.2em] uppercase mb-4 block"
          >
            Get In Touch
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-7xl md:text-9xl font-bold tracking-tighter"
          >
            CON<span className="italic font-serif font-light">TACT</span>
          </motion.h1>
        </div>

        {/* Contact Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-32">
          {/* Left Column: Form */}
          <motion.form 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-400">Name</label>
              <input 
                type="text" 
                placeholder="e. g. John Doe" 
                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-lime-400 transition-colors placeholder:text-zinc-600"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-400">Email Address</label>
              <input 
                type="email" 
                placeholder="e. g. johndoe@email.com" 
                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-lime-400 transition-colors placeholder:text-zinc-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-400">Phone Number</label>
              <input 
                type="tel" 
                placeholder="(123) - 456 - 789" 
                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-lime-400 transition-colors placeholder:text-zinc-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-400">Your Message</label>
              <textarea 
                rows={6}
                placeholder="Write Your Message Here" 
                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-lime-400 transition-colors placeholder:text-zinc-600 resize-none"
              />
            </div>

            <button className="bg-white text-black text-sm font-bold tracking-widest uppercase px-10 py-4 rounded-full hover:bg-lime-400 transition-colors">
              Submit
            </button>
          </motion.form>

          {/* Right Column: Info Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 flex flex-col justify-center"
          >
            <ContactInfoCard 
              icon={Mail} 
              title="Email" 
              content="mksuko@gmail.com" 
            />
            <ContactInfoCard 
              icon={MapPin} 
              title="Location" 
              content={
                <div className="leading-relaxed">
                  Greater Noida
                </div>
              } 
            />
            <ContactInfoCard 
              icon={Smartphone} 
              title="Phone" 
              content="+91-8542898438, 8576898438" 
            />
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-lime-400 text-sm font-bold tracking-[0.2em] uppercase mb-4 block"
            >
              Questions & Answers
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold tracking-tighter mb-8"
            >
              FAQs
            </motion.h2>
            <p className="text-zinc-400 text-lg max-w-lg mx-auto leading-relaxed">
              Below are answers to some common questions about our services, processes, and what you can expect when working with us.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-zinc-900/30 border border-white/5 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-xl font-medium pr-8">{faq.question}</span>
                  {openFaq === index ? (
                    <Minus className="w-6 h-6 text-zinc-400 shrink-0" />
                  ) : (
                    <Plus className="w-6 h-6 text-zinc-400 shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-zinc-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
