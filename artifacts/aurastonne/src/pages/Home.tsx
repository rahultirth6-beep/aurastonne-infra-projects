import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { FloatingSocials } from "@/components/FloatingSocials";
import { NumberCounter } from "@/components/NumberCounter";
import { ServiceCard } from "@/components/ServiceCard";
import { ArrowRight, MapPin, CheckCircle2, ChevronDown, Send, User, Phone, Building2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleField } from "@/components/ParticleField";
import { CursorGlow } from "@/components/CursorGlow";
import { MandalaRing, JaaliDivider, CornerOrnament } from "@/components/IndianPattern";

const SERVICES = [
  { title: "Interiors", image: "/images/interior-lobby.jpg" },
  { title: "Cobblestone", image: "/images/service-cobblestone.png" },
  { title: "Wall Cladding", image: "/images/service-wall-cladding.png" },
  { title: "Paver Blocks", image: "/images/service-paver-blocks.png" },
  { title: "Cement Tiles", image: "/images/service-cement-tiles.png" },
  { title: "Ceramic Tiles", image: "/images/service-ceramic-tiles.png" },
  { title: "Garden Benches", image: "/images/service-bench-2.jpg" },
  { title: "Hardscape", image: "/images/service-hardscape.png" },
  { title: "Surface Preparation", image: "/images/service-surface-prep.png" },
  { title: "Stamp Concrete", image: "/images/service-stamp-concrete.png" },
  { title: "Artificial Grass", image: "/images/service-artificial-grass.png" },
  { title: "Vinyl Flooring", image: "/images/service-vinyl-flooring.png" },
  { title: "Tiling Installation", image: "/images/service-tiling-installation.jpg" },
  { title: "Epoxy Flooring", image: "/images/service-epoxy-flooring.jpg" },
  { title: "Furniture Works", image: "/images/furniture-living-room.jpg" },
  { title: "Kitchen Carpentry", image: "/images/kitchen-carpentry-modular.jpg" },
];

function StatCard({ value, label, suffix }: { value: number; label: string; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-10, 10]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
     if (!ref.current) return;
     const rect = ref.current.getBoundingClientRect();
     x.set((e.clientX - rect.left) / rect.width - 0.5);
     y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  
  const handleMouseLeave = () => { x.set(0); y.set(0); };
  
  return (
    <div className="perspective-1000 relative">
      <motion.div 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className="relative py-12 flex flex-col items-center justify-center transform-gpu preserve-3d bg-card rounded-2xl border-4 border-double border-primary/20 shadow-xl transition-all duration-300 hover:bg-card/90 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <MandalaRing className="w-full h-full text-primary" />
        </div>
        <CornerOrnament className="absolute top-2 left-2 w-8 h-8 text-primary/50" />
        <CornerOrnament className="absolute top-2 right-2 w-8 h-8 text-primary/50 rotate-90" />
        <CornerOrnament className="absolute bottom-2 right-2 w-8 h-8 text-primary/50 rotate-180" />
        <CornerOrnament className="absolute bottom-2 left-2 w-8 h-8 text-primary/50 -rotate-90" />

        <div className="absolute inset-0 bg-primary/10 blur-[60px] rounded-full scale-50 opacity-40 z-0 animate-[pulse_2s_ease-in-out_infinite]" />
        <div className="relative z-10 transform-gpu preserve-3d text-primary" style={{ transform: "translateZ(30px)" }}>
          <NumberCounter value={value} label={label} suffix={suffix} />
        </div>
      </motion.div>
    </div>
  );
}

const GALLERY_CATEGORIES = {
  Interior: [
    { src: "/images/interior-lobby.jpg", label: "Luxury Lobby" },
    { src: "/images/interior-living-room.jpg", label: "Living Room" },
    { src: "/images/furniture-living-room.jpg", label: "Custom Living Room Furniture" },
    { src: "/images/interior-bedroom.jpg", label: "Master Bedroom" },
    { src: "/images/furniture-bedroom-wardrobe.jpg", label: "Bespoke Wardrobe & Bedroom Furniture" },
    { src: "/images/interior-flat-living.jpg", label: "Flat Living Room" },
    { src: "/images/interior-flat-dining.jpg", label: "Flat Dining Area" },
    { src: "/images/interior-kitchen.jpg", label: "Modular Kitchen" },
    { src: "/images/interior-kitchen-modular.jpg", label: "Kitchen — L-Shape" },
    { src: "/images/interior-kitchen-parallel.jpg", label: "Kitchen — Parallel" },
    { src: "/images/kitchen-carpentry-modular.jpg", label: "Custom Kitchen Carpentry" },
    { src: "/images/kitchen-carpentry-detail.jpg", label: "Kitchen Joinery & Storage Details" },
    { src: "/images/furniture-commercial-fitout.jpg", label: "Commercial Furniture Fit-out" },
    { src: "/images/work-vinyl-flooring.jpg", label: "Vinyl Flooring" },
    { src: "/images/work-epoxy-flooring.jpg", label: "Epoxy Flooring" },
  ],
  Exterior: [
    { src: "/images/work-wall-cladding.jpg", label: "Wall Cladding" },
    { src: "/images/work-cobblestone-installation.jpg", label: "Cobblestone Installation" },
    { src: "/images/service-cobblestone-real.jpg", label: "Cobblestone Paving" },
    { src: "/images/work-paver-installation.jpg", label: "Paver Block Installation" },
    { src: "/images/work-paver-blocks.jpg", label: "Paver Blocks" },
    { src: "/images/work-hardscape.jpg", label: "Hardscape" },
    { src: "/images/work-stamp-concrete.jpg", label: "Stamp Concrete" },
    { src: "/images/work-artificial-grass.jpg", label: "Artificial Grass" },
    { src: "/images/service-bench-1.jpg", label: "Garden Bench — Modern" },
    { src: "/images/service-bench-2.jpg", label: "Garden Bench — Classic" },
  ],
  "Turnkey Projects": [
    { src: "/images/service-surface-prep.png", label: "Surface Preparation" },
    { src: "/images/work-tiling-installation-2.jpg", label: "Tile Installation" },
    { src: "/images/service-tiling-installation.jpg", label: "Ceramic Tile Laying" },
    { src: "/images/service-cement-tiles.png", label: "Cement Tiles" },
    { src: "/images/service-wall-cladding.png", label: "Wall Cladding Finish" },
    { src: "/images/work-stamp-concrete.jpg", label: "Stamp Concrete" },
    { src: "/images/service-epoxy-flooring.jpg", label: "Epoxy Flooring" },
    { src: "/images/service-hardscape.png", label: "Hardscape Project" },
    { src: "/images/interior-lobby.jpg", label: "Lobby Turnkey" },
    { src: "/images/interior-flat-living.jpg", label: "Flat Turnkey Interior" },
  ],
} as const;

type GalleryTab = keyof typeof GALLERY_CATEGORIES;

function OurWorkGallery() {
  const [activeTab, setActiveTab] = useState<GalleryTab>("Interior");
  const tabs = Object.keys(GALLERY_CATEGORIES) as GalleryTab[];
  const items = GALLERY_CATEGORIES[activeTab];

  return (
    <section className="py-32 relative bg-background" id="our-work">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-4">Our Work</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-10">
            A glimpse of the craftsmanship we bring to every project across India.
          </p>

          {/* Tab Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {tabs.map(tab => (
              <button
                key={tab}
                data-testid={`tab-${tab}`}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium tracking-wide border transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30"
                    : "bg-transparent text-muted-foreground border-white/15 hover:border-primary/50 hover:text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ scale: 1.03, zIndex: 10 }}
              className="relative overflow-hidden rounded-2xl group cursor-pointer shadow-lg border border-primary/20 aspect-square"
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                src={item.src}
                alt={item.label}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-0 inset-x-0 p-4 z-10"
              >
                <div className="w-6 h-0.5 bg-primary mb-1.5" />
                <p className="text-white font-serif font-semibold text-base drop-shadow-lg">{item.label}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const SERVICE_NAMES = SERVICES.map(s => s.title);

function QuoteForm() {
  const [form, setForm] = useState({ name: "", phone: "", city: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Aurastonne Infra Projects!%0A%0AI would like to request a quote.%0A%0AName: ${form.name}%0APhone: ${form.phone}%0ACity: ${form.city}%0AService Required: ${form.service}%0AMessage: ${form.message || "N/A"}`;
    window.open(`https://wa.me/919619067679?text=${text}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section className="py-32 relative overflow-hidden perspective-1000" id="quote">
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.webp"
          className="w-full h-full object-cover opacity-10 filter grayscale sepia"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/60" />
        <MandalaRing className="absolute -bottom-40 -left-40 w-[600px] h-[600px] text-primary opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-4">Request a Quote</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Tell us about your project and we will get back to you promptly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotateX: 15 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", stiffness: 90, damping: 20 }}
          className="relative max-w-2xl mx-auto bg-card/90 backdrop-blur-xl border-2 border-primary/20 p-10 md:p-14 rounded-3xl shadow-2xl overflow-hidden"
        >
          <CornerOrnament className="absolute top-3 left-3 w-10 h-10 text-primary/30" />
          <CornerOrnament className="absolute top-3 right-3 w-10 h-10 text-primary/30 rotate-90" />
          <CornerOrnament className="absolute bottom-3 right-3 w-10 h-10 text-primary/30 rotate-180" />
          <CornerOrnament className="absolute bottom-3 left-3 w-10 h-10 text-primary/30 -rotate-90" />

          <motion.div
            className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent skew-x-12"
            animate={{ x: ["-150%", "250%"] }}
            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          />

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative z-10 text-center py-10"
            >
              <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-3">Redirecting to WhatsApp</h3>
              <p className="text-muted-foreground text-lg mb-8">Your enquiry details have been filled in. Just hit send on WhatsApp!</p>
              <Button
                onClick={() => setSubmitted(false)}
                variant="outline"
                className="rounded-full border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Submit Another Enquiry
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" /> Full Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    data-testid="input-name"
                    className="w-full bg-background border border-primary/20 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" /> Phone Number
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 XXXXX XXXXX"
                    data-testid="input-phone"
                    className="w-full bg-background border border-primary/20 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" /> City
                  </label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    placeholder="Your city"
                    data-testid="input-city"
                    className="w-full bg-background border border-primary/20 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary" /> Service Required
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    data-testid="select-service"
                    className="w-full bg-background border border-primary/20 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-background">Select a service</option>
                    {SERVICE_NAMES.map(s => (
                      <option key={s} value={s} className="bg-background">{s}</option>
                    ))}
                    <option value="Multiple Services" className="bg-background">Multiple Services</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" /> Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your project briefly..."
                  data-testid="input-message"
                  className="w-full bg-background border border-primary/20 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                data-testid="button-submit-quote"
                className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg font-semibold shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
              >
                <Send className="w-5 h-5" />
                Send Enquiry via WhatsApp
              </Button>
              <p className="text-center text-xs text-muted-foreground/60">
                Clicking the button will open WhatsApp with your details pre-filled.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const navBorderOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  // Hero Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 30 });
  
  const heroRotateX = useTransform(smoothMouseY, [-500, 500], [8, -8]);
  const heroRotateY = useTransform(smoothMouseX, [-500, 500], [-8, 8]);
  
  const layer1X = useTransform(smoothMouseX, v => v * 0.02);
  const layer1Y = useTransform(smoothMouseY, v => v * 0.02);
  const layer2X = useTransform(smoothMouseX, v => v * 0.05);
  const layer2Y = useTransform(smoothMouseY, v => v * 0.05);
  const layer3X = useTransform(smoothMouseX, v => v * 0.08);
  const layer3Y = useTransform(smoothMouseY, v => v * 0.08);
  
  const textShadowX = useTransform(smoothMouseX, v => v * -0.015);
  const textShadowY = useTransform(smoothMouseY, v => v * -0.015);
  const textShadow = useMotionTemplate`${textShadowX}px ${textShadowY}px 25px rgba(0,0,0,0.8)`;

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  
  const handleHeroMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div ref={containerRef} className="bg-background min-h-screen text-foreground overflow-hidden selection:bg-primary selection:text-primary-foreground relative font-sans">
      <ParticleField />
      <CursorGlow />
      <FloatingSocials />

      {/* Navigation */}
      <motion.nav 
        style={{ borderBottomColor: useMotionTemplate`rgba(212, 175, 55, ${navBorderOpacity})` }}
        className="fixed top-0 inset-x-0 z-50 py-6 px-8 flex justify-between items-center bg-background/90 backdrop-blur-md border-b border-transparent transition-colors"
      >
        <div className="flex items-center gap-3 font-serif text-2xl font-bold tracking-wider text-foreground">
          AURASTONNE
          <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C12 2 15 8 19 10C19 10 14 12 12 18C12 18 10 12 5 10C5 10 9 8 12 2Z" />
          </svg>
        </div>
        <Button
          variant="outline"
          onClick={() => document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" })}
          className="rounded-full border-primary/50 hover:border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 relative overflow-hidden group"
          data-testid="button-get-quote-nav"
        >
          <span className="relative z-10">Get a Quote</span>
          <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
        </Button>
      </motion.nav>

      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden perspective-1000"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
      >
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          {/* Layer 1 - Deep Blob */}
          <motion.div 
            style={{ x: layer1X, y: layer1Y }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[100px] mix-blend-screen pointer-events-none"
          />

          {/* Layer 2 - Noise */}
          <motion.div 
            style={{ x: layer2X, y: layer2Y }}
            className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC45IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIiBvcGFjaXR5PSIwLjI1Ii8+PC9zdmc+')] bg-repeat"
          />

          {/* Layer 3 - Accent Grid */}
          <motion.div 
            style={{ x: layer3X, y: layer3Y }}
            className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgNDBMNDAgMEg0TDAgMzZaIiBmaWxsPSIjZDRhZjM3IiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')]"
          />

          <img 
            src="/images/hero-bg.webp" 
            alt="Courtyard" 
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center relative z-[-1] sepia-[0.3]"
          />
          <div className="absolute inset-0 bg-background/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

          {/* Indian Heritage Enhancements */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -right-40 w-[600px] h-[600px] opacity-[0.08] pointer-events-none text-primary"
          >
            <MandalaRing className="w-full h-full" />
          </motion.div>
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -left-20 w-[400px] h-[400px] opacity-[0.05] pointer-events-none text-primary"
          >
            <MandalaRing className="w-full h-full" />
          </motion.div>
        </motion.div>

        <motion.div 
          style={{ rotateX: heroRotateX, rotateY: heroRotateY }}
          animate={{ y: [-2, 2] }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 4, ease: "easeInOut" }}
          className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center mt-20 transform-gpu preserve-3d"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-background/50 backdrop-blur-md mb-8 transform-gpu"
            style={{ transform: "translateZ(30px)" }}
          >
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium tracking-wide text-primary">Based in Mumbai, Serving Pan-India</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{ textShadow }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-foreground leading-[1.1] mb-6 transform-gpu"
          >
            Built to <span className="text-primary italic">Last.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="max-w-2xl text-lg md:text-2xl text-muted-foreground font-light mb-12 transform-gpu"
            style={{ transform: "translateZ(40px)" }}
          >
            Premium civil and infrastructure craftsmanship. 
            The weight of stone and concrete meets modern design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="transform-gpu preserve-3d"
            style={{ transform: "translateZ(50px)" }}
          >
            <Button
              size="lg"
              onClick={() => document.getElementById("our-work")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="button-explore-work"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg group relative overflow-hidden preserve-3d shadow-xl shadow-primary/20"
            >
              <span className="relative z-10 flex items-center">
                Explore Our Work
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 inset-x-0 z-20">
          <JaaliDivider />
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce z-20"
        >
          <ChevronDown className="w-8 h-8 text-primary" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative z-20 bg-background border-t border-primary/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <StatCard value={8} label="Years of Excellence" suffix="+" />
            <StatCard value={100} label="Projects Completed" suffix="+" />
            <StatCard value={10} label="Cities Covered" suffix="+" />
          </div>
        </div>
      </section>

      <JaaliDivider />

      {/* About Section */}
      <section className="py-32 relative overflow-hidden perspective-1000">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center preserve-3d relative p-8">
            <CornerOrnament className="absolute top-0 left-0 w-12 h-12 text-primary/40" />
            <CornerOrnament className="absolute bottom-0 right-0 w-12 h-12 text-primary/40 rotate-180" />

            <motion.h2 
              initial={{ opacity: 0, rotateX: 30 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring" }}
              className="text-4xl md:text-6xl font-serif font-bold mb-8 transform-gpu"
            >
              The Foundation of <br/> Modern Infrastructure
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground leading-relaxed mb-12"
            >
              For nearly a decade, Aurastonne Infra Projects has been the silent force behind 
              India's most enduring spaces. We work with materials that are ancient, enduring, 
              and beautiful. From intimate courtyards to massive commercial hardscapes, our 
              commitment remains unchanged: crafting with intention.
            </motion.p>
            <div className="grid sm:grid-cols-2 gap-6 text-left max-w-2xl mx-auto perspective-1000">
              {["Master Craftsmanship", "Premium Materials", "Pan-India Execution", "Timely Delivery"].map((trait, i) => (
                <motion.div 
                  key={trait}
                  initial={{ opacity: 0, rotateY: 90 }}
                  whileInView={{ opacity: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.15), duration: 0.8, type: "spring" }}
                  className="flex items-center gap-3 bg-card p-4 rounded-lg border border-primary/20 transform-gpu backface-hidden shadow-lg"
                >
                  <CheckCircle2 className="text-primary w-6 h-6 flex-shrink-0" />
                  <span className="font-medium text-lg text-card-foreground">{trait}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <JaaliDivider />

      {/* Services Section */}
      <section className="py-32 bg-card/50 relative perspective-1000">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, rotateX: 20 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center transform-gpu preserve-3d"
          >
            <div className="text-primary tracking-widest text-sm mb-4">◆ ◆ ◆</div>
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6">Our Expertise</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
            <svg className="w-8 h-8 mx-auto text-primary" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 22C12 22 17 16 19 12C21 8 16 4 12 4C8 4 3 8 5 12C7 16 12 22 12 22Z" />
            </svg>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
            {SERVICES.map((service, index) => (
              <ServiceCard 
                key={service.title} 
                title={service.title} 
                image={service.image} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </section>

      <JaaliDivider />

      {/* Our Work Gallery */}
      <OurWorkGallery />

      <JaaliDivider />

      {/* Quote Request Form */}
      <QuoteForm />

      <JaaliDivider className="bg-black" />

      {/* Simple Footer */}
      <footer className="py-16 bg-black text-white/60 text-center relative z-20 overflow-hidden">
        <MandalaRing className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] text-primary opacity-5 pointer-events-none" />
        
        <p className="font-serif tracking-widest text-2xl mb-6 text-primary drop-shadow-md">AURASTONNE INFRA PROJECTS</p>
        
        <div className="flex justify-center items-center gap-4 mb-8">
          <div className="w-1.5 h-1.5 rotate-45 bg-primary/40"></div>
          <div className="w-1.5 h-1.5 rotate-45 bg-primary/40"></div>
          <div className="w-1.5 h-1.5 rotate-45 bg-primary/40"></div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-4 text-sm text-white/70">
          <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
          <span>Vasai East, Palghar, Maharashtra — 401208</span>
        </div>
        <div className="flex items-center justify-center gap-2 mb-4 text-sm text-white/70">
          <Phone className="w-4 h-4 text-primary flex-shrink-0" />
          <a href="https://wa.me/919619067679" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200">+91 96190 67679</a>
        </div>
        <div className="flex items-center justify-center gap-2 mb-6 text-sm text-white/70">
          <MessageSquare className="w-4 h-4 text-primary flex-shrink-0" />
          <a href="mailto:aurastonne@outlook.com" className="hover:text-primary transition-colors duration-200">aurastonne@outlook.com</a>
        </div>
        <p className="text-sm">© {new Date().getFullYear()} Aurastonne Infra Projects. All rights reserved.</p>
        <p className="text-xs mt-2 text-primary/60 italic">Crafted with pride in India</p>
      </footer>
    </div>
  );
}
