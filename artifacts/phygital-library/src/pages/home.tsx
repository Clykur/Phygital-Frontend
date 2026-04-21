import { motion, useScroll, useTransform, animate } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  MapPin,
  RefreshCw,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  ArrowRight,
  Library,
  GraduationCap
} from "lucide-react";
import libraryDusk from "@/assets/images/library-dusk.png";
import booksGlow from "@/assets/images/books-glow.png";
import constellation from "@/assets/images/constellation.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

function Counter({ from, to, suffix = "", prefix = "", duration = 2 }: { from: number, to: number, suffix?: string, prefix?: string, duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView && nodeRef.current) {
      const node = nodeRef.current;
      const controls = animate(from, to, {
        duration: duration,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = prefix + Math.round(value).toLocaleString() + suffix;
        }
      });
      return () => controls.stop();
    }
  }, [from, to, inView, duration, prefix, suffix]);

  return <span ref={nodeRef}>{prefix}{from}{suffix}</span>;
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="flex flex-col w-full bg-background selection:bg-amber-500/30">
      
      {/* Editorial Hero */}
      <section className="relative min-h-[100dvh] flex items-center pt-24 overflow-hidden bg-slate-950 text-slate-50">
        {/* Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/50 to-transparent z-10" />
          <img src={libraryDusk} alt="Modern Library at Dusk" className="w-full h-full object-cover" />
        </motion.div>

        {/* Ambient Glows */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-10">
          <div className="absolute top-[-10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-amber-500/20 blur-[120px] mix-blend-screen animate-pulse" />
          <div className="absolute top-[40%] right-[0%] w-[40%] h-[60%] rounded-full bg-blue-500/10 blur-[150px] mix-blend-screen" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div 
              initial="hidden" animate="visible" variants={staggerContainer}
              className="lg:col-span-8 flex flex-col items-start"
            >
              <motion.div variants={fadeInUp} className="mb-8">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-medium tracking-wide uppercase">
                  <Sparkles className="w-3 h-3" />
                  The Next Generation Library
                </span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl md:text-7xl lg:text-[85px] font-serif font-medium leading-[1.05] tracking-tight mb-8">
                Knowledge should <br className="hidden md:block" />
                be <span className="italic font-light text-amber-400">accessible</span>, <br className="hidden md:block" />
                not owned.
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-300 max-w-xl font-light leading-relaxed mb-10 border-l-2 border-amber-500/50 pl-6">
                Discover, borrow, and pick up textbooks at local campus hubs. A seamless network bridging digital convenience with physical books.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-14 px-8 rounded-full bg-amber-500 text-slate-950 hover:bg-amber-400 text-base font-medium transition-all hover:scale-105">
                  Explore Network <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-50 backdrop-blur-md text-base transition-all">
                  For Colleges
                </Button>
              </motion.div>
            </motion.div>

            {/* Glass Card Overlay */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="lg:col-span-4 hidden lg:block"
            >
              <div className="glass-card rounded-2xl p-6 bg-slate-900/40 border-slate-700/50 relative overflow-hidden transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />
                <div className="flex items-center gap-4 mb-6 border-b border-slate-700/50 pb-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-amber-400 uppercase tracking-wide font-medium mb-1">Nearest Hub</p>
                    <p className="text-base font-serif text-slate-50">Engineering Block A</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-slate-800/50 rounded-xl p-3">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-slate-400" />
                      <span className="text-sm text-slate-200">Algorithms</span>
                    </div>
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs">Ready</Badge>
                  </div>
                  <div className="flex justify-between items-center bg-slate-800/50 rounded-xl p-3">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-slate-400" />
                      <span className="text-sm text-slate-200">Physics 101</span>
                    </div>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs">Reserved</Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Shelf Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      </section>

      {/* The Problem — Editorial Split */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
              className="lg:col-span-5 lg:col-start-2 relative"
            >
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-2xl">
                <img src={booksGlow} alt="Stack of books" className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700" />
                <div className="absolute inset-0 border border-foreground/10 mix-blend-overlay" />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-background p-6 rounded-full border border-border flex flex-col justify-center items-center shadow-xl">
                <span className="text-5xl font-serif font-bold text-amber-600 mb-1">
                  <Counter from={0} to={85} suffix="%" />
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest text-center">Books discarded after 1 year</span>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
              className="lg:col-span-5 lg:col-start-8 flex flex-col justify-center"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-medium leading-tight mb-8">
                Education is evolving, but access to textbooks remains stuck in the past.
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed font-light">
                  Textbooks are prohibitively expensive and often left unused after a single semester. Selling them back is a hassle, leading to wasted money and environmental resources.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed font-light">
                  Meanwhile, physical libraries are underutilized. Outdated inventory and inefficient tracking systems make it hard to provide students with the resources they actually need.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* The Solution — Network Diagram */}
      <section className="py-32 relative bg-slate-950 text-slate-50 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={constellation} alt="" className="w-full h-full object-cover mix-blend-screen" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6">The Phygital Solution</h2>
            <p className="text-xl text-slate-400 font-light">Bridging the gap between digital discovery and physical access.</p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto h-auto min-h-[400px] flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0">
            {/* SVG Connecting Lines (Visible on MD+) */}
            <svg className="absolute inset-0 w-full h-full hidden md:block pointer-events-none" style={{ zIndex: 0 }}>
               <motion.path 
                 d="M 150 200 C 300 200, 300 100, 450 100" 
                 fill="none" 
                 stroke="url(#gradient-line)" 
                 strokeWidth="2"
                 strokeDasharray="4 4"
                 initial={{ pathLength: 0, opacity: 0 }}
                 whileInView={{ pathLength: 1, opacity: 1 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 1.5, ease: "easeInOut" }}
               />
               <motion.path 
                 d="M 150 200 C 300 200, 300 300, 450 300" 
                 fill="none" 
                 stroke="url(#gradient-line)" 
                 strokeWidth="2"
                 strokeDasharray="4 4"
                 initial={{ pathLength: 0, opacity: 0 }}
                 whileInView={{ pathLength: 1, opacity: 1 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
               />
               <defs>
                 <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
                   <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
                   <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                 </linearGradient>
               </defs>
            </svg>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="relative z-10 w-full md:w-64 text-center">
              <div className="w-24 h-24 mx-auto bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(245,158,11,0.15)] backdrop-blur-md">
                <Smartphone className="w-10 h-10 text-amber-400" />
              </div>
              <h3 className="text-xl font-serif font-medium mb-3">Digital App</h3>
              <p className="text-slate-400 text-sm">Discover, reserve, and manage inventory from anywhere.</p>
            </motion.div>

            <div className="flex flex-col gap-12 w-full md:w-64 relative z-10">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.2 }} className="text-center">
                <div className="w-20 h-20 mx-auto bg-blue-500/10 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md">
                  <MapPin className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-serif font-medium mb-2">Physical Hubs</h3>
                <p className="text-slate-400 text-sm">Pickup points on campus.</p>
              </motion.div>
              
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.4 }} className="text-center">
                <div className="w-20 h-20 mx-auto bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md">
                  <RefreshCw className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-lg font-serif font-medium mb-2">Shared Network</h3>
                <p className="text-slate-400 text-sm">Pooled college resources.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — Connected Flow */}
      <section className="py-32 bg-muted/30 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
            className="mb-20"
          >
            <h2 className="text-4xl font-serif font-medium">How it flows.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Horizontal Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-border via-primary/50 to-border -translate-y-1/2 z-0" />
            
            {[
              { num: "01", title: "Search", desc: "Find the textbook you need on our app." },
              { num: "02", title: "Reserve", desc: "Lock it in for the semester or buy it." },
              { num: "03", title: "Route", desc: "Algorithm routes it to your nearest hub." },
              { num: "04", title: "Pickup", desc: "Scan QR code to collect instantly." },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.15 } } }}
                className="relative z-10"
              >
                <div className="glass-card bg-card/80 p-8 rounded-xl h-full flex flex-col">
                  <span className="text-4xl font-serif font-light text-muted-foreground/30 mb-6">{step.num}</span>
                  <h3 className="text-xl font-medium mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bento */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
            className="mb-16"
          >
            <h2 className="text-4xl font-serif font-medium">Built for scale.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="md:col-span-2 glass-card p-8 rounded-2xl bg-card flex flex-col justify-end min-h-[300px] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                <RefreshCw className="w-24 h-24 text-primary" />
              </div>
              <h3 className="text-2xl font-serif font-medium mb-3 relative z-10">Live Inventory Synced Across Campuses</h3>
              <p className="text-muted-foreground max-w-md relative z-10">See real-time availability of books across all connected network hubs instantly.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.1 }} className="md:col-span-1 glass-card p-8 rounded-2xl bg-card flex flex-col justify-end min-h-[300px]">
              <Smartphone className="w-8 h-8 text-amber-600 mb-6" />
              <h3 className="text-xl font-serif font-medium mb-3">QR Scanning</h3>
              <p className="text-muted-foreground text-sm">Instant pickup and drop-off with a simple app scan.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.2 }} className="md:col-span-1 glass-card p-8 rounded-2xl bg-card flex flex-col justify-end min-h-[300px]">
              <Users className="w-8 h-8 text-blue-600 mb-6" />
              <h3 className="text-xl font-serif font-medium mb-3">P2P Marketplace</h3>
              <p className="text-muted-foreground text-sm">Buy or sell directly with peers safely.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.3 }} className="md:col-span-2 glass-card p-8 rounded-2xl bg-slate-900 text-slate-50 flex flex-col justify-end min-h-[300px] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10" />
              <img src={libraryDusk} className="absolute inset-0 w-full h-full object-cover opacity-40 z-0 mix-blend-luminosity" alt="" />
              <h3 className="text-2xl font-serif font-medium mb-3 relative z-20">Smart Routing Engine</h3>
              <p className="text-slate-300 max-w-md relative z-20">Our algorithm automatically finds the nearest available copy and reserves it for your pickup window.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-32 bg-slate-950 text-slate-50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h3 className="text-6xl md:text-7xl font-serif font-light text-amber-500 mb-4">
                <Counter from={0} to={12} prefix="₹" suffix="k+" />
              </h3>
              <p className="text-slate-400 font-medium tracking-wide uppercase text-sm">Savings per student</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.1 }}>
              <h3 className="text-6xl md:text-7xl font-serif font-light text-blue-400 mb-4">
                <Counter from={0} to={50} suffix="+" />
              </h3>
              <p className="text-slate-400 font-medium tracking-wide uppercase text-sm">Campuses Connected</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.2 }}>
              <h3 className="text-6xl md:text-7xl font-serif font-light text-emerald-400 mb-4">
                <Counter from={0} to={80} suffix="%" />
              </h3>
              <p className="text-slate-400 font-medium tracking-wide uppercase text-sm">Resource Reuse Rate</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 relative bg-slate-950 text-slate-50 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-5xl md:text-7xl font-serif font-medium mb-8 leading-tight tracking-tight">
              Ready to open <br /> <span className="italic text-amber-400">the next chapter?</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
              <Button size="lg" className="h-16 px-10 rounded-full bg-slate-50 text-slate-950 hover:bg-slate-200 text-lg font-medium shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all hover:scale-105">
                Join as Student
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-10 rounded-full border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-50 backdrop-blur-md text-lg transition-all hover:scale-105">
                Partner as College
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
