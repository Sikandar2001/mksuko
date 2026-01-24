import { services } from "@/lib/services";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return services.map((service) => ({
    id: service.id,
  }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = services.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-6">
        <Link 
          href="/services" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4"/>
          Back to Services
        </Link>

        {/* Header Section: Title & Description */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
            <div className="space-y-6 lg:w-2/3">
                <span className="text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase">Services</span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9]">
                    {service.title}
                </h1>
            </div>
            <div className="lg:w-1/3 pt-2 lg:pt-12">
                 <p className="text-xl text-zinc-400 leading-relaxed">
                    {service.description}
                 </p>
            </div>
        </div>

        {/* Hero Image */}
        <div className={`relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden mb-32 ${service.bgColor || 'bg-zinc-900'}`}>
             <Image 
                src={service.src} 
                alt={service.title} 
                fill 
                className="object-cover"
                priority
                unoptimized
             />
        </div>

        {/* Sub-services Content */}
        {service.subServices && (
            <div className="max-w-4xl mx-auto space-y-24">
                {service.subServices.map((sub, index) => (
                    <div key={index} className="space-y-6 border-t border-white/10 pt-12">
                        <h3 className="text-4xl md:text-5xl font-bold tracking-tight">{sub.title}</h3>
                        <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">{sub.description}</p>
                    </div>
                ))}
            </div>
        )}
        
        {/* CTA */}
         <div className="mt-32 flex justify-center">
              <Link 
                href="/contact"
                className="px-10 py-4 rounded-full bg-white text-black text-lg font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors"
              >
                Start a Project
              </Link>
        </div>

      </div>
    </main>
  );
}
