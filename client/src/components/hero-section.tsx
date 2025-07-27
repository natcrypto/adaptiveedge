import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

export default function HeroSection() {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    // Initialize particles in clusters for more natural flocking
    const initialParticles: Particle[] = [];
    
    // Create 3 clusters
    for (let cluster = 0; cluster < 3; cluster++) {
      const clusterX = 250 + cluster * 200;
      const clusterY = 200 + cluster * 50;
      
      for (let i = 0; i < 7; i++) {
        initialParticles.push({
          id: cluster * 7 + i,
          x: clusterX + (Math.random() - 0.5) * 100,
          y: clusterY + (Math.random() - 0.5) * 80,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: 4 + Math.random() * 3,
          color: Math.random() > 0.5 ? 'coral' : 'navy',
          opacity: 0.15 + Math.random() * 0.25,
        });
      }
    }
    
    setParticles(initialParticles);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 gradient-bg opacity-10"></div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-navy mb-6 leading-tight">
            Helping organisations{" "}
            <span className="text-shimmer">thrive</span> in complexity
          </h1>
          <p className="text-xl md:text-2xl text-warm-gray mb-8 max-w-3xl mx-auto leading-relaxed">
            Through strategy, design, and AI, we unlock collective intelligence
            and build adaptive capacity that drives purposeful innovation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("services")}
              className="bg-coral text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-opacity-90 transition-all duration-300"
            >
              Explore Our Approach
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("about")}
              className="border-2 border-navy text-navy px-8 py-4 rounded-full text-lg font-medium hover:bg-navy hover:text-white transition-all duration-300"
            >
              Learn Our Story
            </motion.button>
          </div>
        </motion.div>

        {/* Murmuration Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
          {particles.map((particle) => {
            // Create flocking movement based on neighboring particles
            const cluster = Math.floor(particle.id / 7);
            const baseAngle = cluster * (Math.PI * 2 / 3);
            const timeOffset = particle.id * 0.3;
            
            return (
              <motion.div
                key={particle.id}
                className={`absolute rounded-full ${
                  particle.color === 'coral' ? 'bg-coral' : 'bg-navy'
                }`}
                style={{
                  width: particle.size,
                  height: particle.size,
                  opacity: particle.opacity,
                }}
                animate={{
                  x: [
                    particle.x,
                    particle.x + Math.sin(baseAngle + timeOffset) * 60 + Math.sin(timeOffset * 0.5) * 30,
                    particle.x + Math.sin(baseAngle + timeOffset + Math.PI / 3) * 80 + Math.cos(timeOffset * 0.3) * 25,
                    particle.x + Math.sin(baseAngle + timeOffset + Math.PI / 2) * 50 + Math.sin(timeOffset * 0.7) * 35,
                    particle.x,
                  ],
                  y: [
                    particle.y,
                    particle.y + Math.cos(baseAngle + timeOffset) * 40 + Math.cos(timeOffset * 0.6) * 20,
                    particle.y + Math.cos(baseAngle + timeOffset + Math.PI / 3) * 60 + Math.sin(timeOffset * 0.4) * 15,
                    particle.y + Math.cos(baseAngle + timeOffset + Math.PI / 2) * 35 + Math.cos(timeOffset * 0.8) * 25,
                    particle.y,
                  ],
                }}
                transition={{
                  duration: 12 + cluster * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: particle.id * 0.15,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => scrollToSection("about")}
      >
        <ChevronDown className="text-warm-gray" size={32} />
      </motion.div>
    </section>
  );
}
