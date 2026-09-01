import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ParticleField() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; duration: number; delay: number; size: number; opacity: number }>>([]);

  useEffect(() => {
    // Generate 30 particles
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      duration: 10 + Math.random() * 20, // 10-30s
      delay: Math.random() * -20, // random start time
      size: 1 + Math.random() * 2, // 1-3px
      opacity: 0.2 + Math.random() * 0.2, // 0.2-0.4
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#d4af37]"
          style={{
            left: `${p.x}vw`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            top: `${p.y}vh`,
          }}
          animate={{
            y: ["0vh", "-100vh"],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
