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
    // Initialize particles across the header area for true flocking
    const initialParticles: Particle[] = [];
    
    for (let i = 0; i < 40; i++) {
      initialParticles.push({
        id: i,
        x: 200 + Math.random() * 600,
        y: 50 + Math.random() * 200,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: 8 + Math.random() * 8,
        color: Math.random() > 0.6 ? 'coral' : 'navy',
        opacity: 0.2 + Math.random() * 0.3,
      });
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
          {particles.map((particle, index) => {
            // Create sweeping flight patterns across the hero space
            const time = particle.id * 0.1;
            const flockPhase = particle.id * 0.2;
            
            // Create leaders that initiate direction changes
            const isLeader = particle.id % 10 === 0;
            const leaderStrength = isLeader ? 1.3 : 1.0;
            
            // Large sweeping movements across the hero area
            const sweepRadius = 180 * leaderStrength;
            const sweepX = Math.sin(time + flockPhase) * sweepRadius;
            const sweepY = Math.cos(time + flockPhase * 0.7) * (sweepRadius * 0.6);
            
            // Secondary orbital movement for flocking behavior
            const orbitRadius = 40 + (particle.id % 5) * 8;
            const orbitX = Math.sin(time * 1.5 + flockPhase) * orbitRadius;
            const orbitY = Math.cos(time * 1.2 + flockPhase) * (orbitRadius * 0.7);
            
            // Combine movements for natural flying pattern
            const flightX = sweepX + orbitX * 0.6;
            const flightY = sweepY + orbitY * 0.8;
            
            return (
              <motion.div
                key={particle.id}
                className={`absolute rounded-full ${
                  particle.color === 'coral' ? 'bg-coral' : 'bg-navy'
                } ${isLeader ? 'ring-1 ring-white/10' : ''}`}
                style={{
                  width: particle.size,
                  height: particle.size,
                  opacity: particle.opacity,
                }}
                animate={{
                  x: [
                    particle.x,
                    particle.x + flightX * 0.3,
                    particle.x + flightX * 0.7,
                    particle.x + flightX * 1.0,
                    particle.x + flightX * 0.8,
                    particle.x + flightX * 0.4,
                    particle.x,
                  ],
                  y: [
                    particle.y,
                    particle.y + flightY * 0.4,
                    particle.y + flightY * 0.8,
                    particle.y + flightY * 1.0,
                    particle.y + flightY * 0.6,
                    particle.y + flightY * 0.2,
                    particle.y,
                  ],
                }}
                transition={{
                  duration: 8 + (particle.id % 6),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: particle.id * 0.08,
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
