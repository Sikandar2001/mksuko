"use client";

import { motion } from "framer-motion";
import { 
  Waves, 
  Disc, 
  Triangle, 
  Globe, 
  Mountain, 
  Target, 
  Cpu, 
  Zap 
} from "lucide-react";

const clients = [
  { name: "Dune", icon: Waves },
  { name: "Invert", icon: Disc },
  { name: "Penta", icon: Triangle },
  { name: "Terra", icon: Globe },
  { name: "ICEBERG", icon: Mountain },
  { name: "PinPoint", icon: Target },
  { name: "Hitech", icon: Cpu },
  { name: "Proline", icon: Zap },
];

export default function Clients() {
  return (
    <section className="py-12 bg-black relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="h-40 flex flex-col items-center justify-center bg-zinc-900/30 border border-white/5 rounded-2xl group hover:bg-zinc-900/60 hover:border-white/10 transition-all duration-300 cursor-pointer"
            >
              <client.icon className="w-6 h-6 text-white mb-3 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
              <span className="text-white font-medium text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                {client.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
