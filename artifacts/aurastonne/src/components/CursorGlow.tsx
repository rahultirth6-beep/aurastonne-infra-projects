import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[200px] h-[200px] rounded-full pointer-events-none z-[9999]"
      style={{
        background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0) 70%)",
        x: mousePosition.x - 100,
        y: mousePosition.y - 100,
      }}
      animate={{
        x: mousePosition.x - 100,
        y: mousePosition.y - 100,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    />
  );
}
