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

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = services.find((s) => s.id === params.id);

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-green-400 font-mono text-lg">({service.id})</span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                {service.title}
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed">
              {service.description}
            </p>

            <div className="pt-8">
              <Link 
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-black transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Start Project
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className={`relative aspect-[4/3] w-full rounded-2xl overflow-hidden ${service.bgColor}`}>
             <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="relative w-full h-full shadow-2xl">
                   <Image 
                    src={service.src} 
                    alt={service.title} 
                    fill 
                    className="object-cover rounded-lg"
                    priority
                   />
                </div>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
