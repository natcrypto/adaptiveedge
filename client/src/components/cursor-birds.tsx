import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface CursorBird {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  opacity: number;
}

export default function CursorBirds() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [birds, setBirds] = useState<CursorBird[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isNearButton, setIsNearButton] = useState(false);

  useEffect(() => {
    // Initialize cursor birds
    const initialBirds: CursorBird[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: 0,
      y: 0,
      size: 5 + Math.random() * 4,
      color: Math.random() > 0.5 ? 'coral' : 'navy',
      delay: i * 0.1,
      opacity: 0.4 + Math.random() * 0.3,
    }));
    setBirds(initialBirds);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      // Check if cursor is near interactive elements
      const target = e.target as HTMLElement;
      const isButton = target.tagName === 'BUTTON' || target.closest('button');
      const isLink = target.tagName === 'A' || target.closest('a');
      setIsNearButton(Boolean(isButton || isLink));
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsNearButton(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 hidden lg:block">
      {birds.map((bird) => {
        // Create flocking behavior around cursor with bird-like movement
        const time = Date.now() * 0.002;
        const birdPhase = bird.id * 0.8;
        
        // Create scattered formation around cursor with dynamic behavior
        const baseRadius = isNearButton ? 50 : 35;
        const formationRadius = baseRadius + bird.id * (isNearButton ? 12 : 8);
        const formationAngle = (bird.id / birds.length) * Math.PI * 2;
        const rotationSpeed = isNearButton ? 0.8 : 0.5;
        const formationX = Math.cos(formationAngle + time * rotationSpeed) * formationRadius;
        const formationY = Math.sin(formationAngle + time * (rotationSpeed * 0.7)) * (formationRadius * 0.6);
        
        // Add individual bird movement with excited fluttering when near buttons
        const flutterIntensity = isNearButton ? 6 : 4;
        const flutterSpeed = isNearButton ? 4 : 3;
        const flutterX = Math.sin(time * flutterSpeed + birdPhase) * flutterIntensity;
        const flutterY = Math.cos(time * (flutterSpeed + 1) + birdPhase) * (flutterIntensity * 0.7);
        
        // Combine formation and flutter for realistic bird movement
        const targetX = mousePosition.x + formationX + flutterX;
        const targetY = mousePosition.y + formationY + flutterY;
        
        return (
          <motion.div
            key={bird.id}
            className={`absolute rounded-full ${
              bird.color === 'coral' ? 'bg-coral' : 'bg-navy'
            } shadow-sm`}
            style={{
              width: bird.size,
              height: bird.size,
              opacity: bird.opacity,
            }}
            animate={{
              x: targetX - bird.size / 2,
              y: targetY - bird.size / 2,
              scale: [1, 1.1, 1],
            }}
            transition={{
              x: {
                type: "spring",
                damping: 15 + bird.id,
                stiffness: 120 - bird.id * 5,
                mass: 0.3 + bird.id * 0.05,
              },
              y: {
                type: "spring",
                damping: 12 + bird.id,
                stiffness: 110 - bird.id * 4,
                mass: 0.3 + bird.id * 0.05,
              },
              scale: {
                duration: 1.5 + bird.id * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: bird.id * 0.1,
              },
            }}
          />
        );
      })}
    </div>
  );
}