import { SiWhatsapp, SiInstagram, SiFacebook } from "react-icons/si";
import { motion } from "framer-motion";

export function FloatingSocials() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      <motion.a
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.95 }}
        href="https://facebook.com/aurastonne"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center text-foreground shadow-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors duration-300"
        aria-label="Facebook"
      >
        <SiFacebook className="w-5 h-5" />
      </motion.a>
      
      <motion.a
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.95 }}
        href="https://instagram.com/aurastonne"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center text-foreground shadow-lg hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-colors duration-300"
        aria-label="Instagram"
      >
        <SiInstagram className="w-5 h-5" />
      </motion.a>

      <motion.a
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.95 }}
        href="https://wa.me/919619067679"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-xl hover:bg-[#1ebe5d] transition-colors duration-300 relative"
        aria-label="WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
        <SiWhatsapp className="w-7 h-7" />
      </motion.a>
    </div>
  );
}
