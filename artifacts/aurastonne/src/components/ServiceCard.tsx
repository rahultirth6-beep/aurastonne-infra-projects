import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

interface ServiceCardProps {
  title: string;
  image: string;
  index: number;
}

export function ServiceCard({ title, image, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [25, -25]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-25, 25]);
  
  const boxShadowX = useTransform(mouseXSpring, [-0.5, 0.5], [20, -20]);
  const boxShadowY = useTransform(mouseYSpring, [-0.5, 0.5], [20, -20]);
  const boxShadow = useMotionTemplate`${boxShadowX}px ${boxShadowY}px 40px rgba(0,0,0,0.4)`;

  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mX = e.clientX - rect.left;
    const mY = e.clientY - rect.top;
    
    setMousePos({ x: mX, y: mY });
    x.set(mX / width - 0.5);
    y.set(mY / height - 0.5);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="perspective-1000 w-full h-[400px]"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          rotateX, 
          rotateY,
          boxShadow: isHovered ? boxShadow : '0px 10px 30px rgba(0,0,0,0.1)'
        }}
        className="w-full h-full relative preserve-3d cursor-pointer group rounded-xl overflow-hidden border border-white/10"
      >
        <div className="absolute inset-0 w-full h-full bg-card/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
        
        {/* Specular Highlight */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-40 transition-opacity duration-300 mix-blend-overlay"
          style={{
            background: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.4), transparent 80%)`,
            opacity: isHovered ? 1 : 0
          }}
        />

        <img 
          src={image} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent z-20" />
        
        <motion.div 
          className="absolute inset-x-0 bottom-0 p-8 z-30 transform-gpu preserve-3d"
          animate={{ z: isHovered ? 80 : 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="w-12 h-1 bg-primary mb-4 transform origin-left transition-transform duration-500 group-hover:scale-x-150" />
          <h3 className="text-2xl font-serif font-bold text-foreground drop-shadow-md">
            {title}
          </h3>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
