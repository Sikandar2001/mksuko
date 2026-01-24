import Hero from "@/components/Hero";
import About from "@/components/About";
import Works from "@/components/Works";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import Blog from "@/components/Blog";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <About />
      <Works />
      <Clients />
      <Services />
      <Blog />
    </main>
  );
}
