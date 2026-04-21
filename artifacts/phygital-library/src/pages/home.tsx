import { motion, useScroll, useTransform, animate } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  BookOpen,
  MapPin,
  RefreshCw,
  Smartphone,
  Sparkles,
  Users,
  ArrowRight,
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
  const [, setLocation] = useLocation();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [joinRole, setJoinRole] = useState("student");

  const openJoin = (role: string) => {
    setJoinRole(role);
    setJoinDialogOpen(true);
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("We'll be in touch — welcome to the Network.");
    setJoinDialogOpen(false);
    if (joinRole === "student") {
      setLocation("/student");
    } else {
      setLocation("/colleges");
    }
  };

  return (
    <div className="flex flex-col w-full bg-background selection:bg-amber-500/30">
      <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Join PSLN</DialogTitle>
            <DialogDescription>
              Enter your details to join the network or sign in to your account.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleJoinSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Alex Sharma" required className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="alex@example.com" required className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">I am a...</Label>
              <Select value={joinRole} onValueChange={setJoinRole}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="college">College Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-full mt-4">
              Continue
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      
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
              <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl md:text-7xl lg:text-[85px] font-serif font-medium leading-[1.05] tracking-tight mb-8 mt-4">
                Knowledge should <br className="hidden md:block" />
                be <span className="italic font-light text-amber-400">accessible</span>, <br className="hidden md:block" />
                not owned.
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-300 max-w-xl font-light leading-relaxed mb-10 border-l-2 border-amber-500/50 pl-6">
                Discover, borrow, and pick up textbooks at local campus hubs. A seamless network bridging digital convenience with physical books.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Link href="/marketplace" className="h-14 px-8 rounded-full bg-amber-500 text-slate-950 hover:bg-amber-400 text-base font-medium transition-all hover:scale-105 inline-flex items-center justify-center">
                  Explore Network <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link href="/colleges" className="h-14 px-8 rounded-full border border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-50 backdrop-blur-md text-base transition-all inline-flex items-center justify-center">
                  For Colleges
                </Link>
              </motion.div>
            </motion.div>

            {/* Stat Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="lg:col-span-4 hidden lg:flex flex-col gap-6"
            >
              <div className="relative rounded-2xl border border-amber-500/20 bg-slate-900/40 backdrop-blur-xl p-6 overflow-hidden">
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-amber-500/20 blur-2xl" />
                <p className="text-xs uppercase tracking-[0.2em] text-amber-400/80 mb-3">Trusted by</p>
                <p className="font-serif text-4xl text-slate-50 mb-1"><Counter from={0} to={50} suffix="+" /></p>
                <p className="text-sm text-slate-400">Campuses across India</p>
              </div>
              <div className="relative rounded-2xl border border-slate-700/40 bg-slate-900/40 backdrop-blur-xl p-6 overflow-hidden">
                <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-blue-500/20 blur-2xl" />
                <p className="text-xs uppercase tracking-[0.2em] text-blue-300/80 mb-3">Books in circulation</p>
                <p className="font-serif text-4xl text-slate-50 mb-1"><Counter from={0} to={120} suffix="k" /></p>
                <p className="text-sm text-slate-400">And growing every semester</p>
              </div>
              <div className="relative rounded-2xl border border-slate-700/40 bg-slate-900/40 backdrop-blur-xl p-6 overflow-hidden">
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-400/80 mb-3">Average savings</p>
                <p className="font-serif text-4xl text-slate-50 mb-1"><Counter from={0} to={12} prefix="₹" suffix="k+" /></p>
                <p className="text-sm text-slate-400">Per student, per year</p>
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

      {/* The Solution — Three Pillars */}
      <section className="py-32 relative bg-slate-950 text-slate-50 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.12]">
          <img src={constellation} alt="" className="w-full h-full object-cover mix-blend-screen" />
        </div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-end"
          >
            <motion.div variants={fadeInUp} className="lg:col-span-7">
              <p className="text-xs uppercase tracking-[0.25em] text-amber-400/80 mb-5">The Solution</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.05] tracking-tight">
                One network. <span className="italic font-light text-amber-400">Three</span> pillars.
              </h2>
            </motion.div>
            <motion.p variants={fadeInUp} className="lg:col-span-5 text-lg text-slate-400 font-light leading-relaxed lg:pl-8 lg:border-l border-slate-800">
              We weave together a polished mobile app, real campus pickup points, and a shared inter-college library — so any book is always within reach.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
            {[
              {
                step: "01",
                title: "Digital App",
                desc: "Search, reserve, and manage your borrows from your phone — anywhere on campus, anytime.",
                Icon: Smartphone,
                accent: "amber",
                tag: "iOS · Android · Web",
              },
              {
                step: "02",
                title: "Physical Hubs",
                desc: "Compact, beautifully-lit pickup points inside every partner college. Scan a QR, walk out with your book.",
                Icon: MapPin,
                accent: "blue",
                tag: "On-campus · 24×7",
              },
              {
                step: "03",
                title: "Shared Network",
                desc: "Inventory pools across partner colleges. The catalog you have access to is bigger than any single library.",
                Icon: RefreshCw,
                accent: "emerald",
                tag: "Inter-college routing",
              },
            ].map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <div className="relative h-full rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-8 lg:p-10 overflow-hidden transition-all duration-500 hover:border-slate-700 hover:-translate-y-1">
                  <div
                    className={`absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-40 transition-opacity duration-500 group-hover:opacity-70 ${
                      p.accent === "amber" ? "bg-amber-500/30" : p.accent === "blue" ? "bg-blue-500/30" : "bg-emerald-500/30"
                    }`}
                  />
                  <div className="relative flex items-start justify-between mb-10">
                    <div
                      className={`w-14 h-14 rounded-2xl border flex items-center justify-center backdrop-blur-md ${
                        p.accent === "amber"
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                          : p.accent === "blue"
                          ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                          : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      }`}
                    >
                      <p.Icon className="w-6 h-6" />
                    </div>
                    <span className="font-serif text-sm text-slate-500 tracking-widest">{p.step}</span>
                  </div>
                  <h3 className="relative font-serif text-2xl text-slate-50 mb-4">{p.title}</h3>
                  <p className="relative text-slate-400 leading-relaxed mb-8">{p.desc}</p>
                  <div className="relative pt-6 border-t border-slate-800">
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{p.tag}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — Editorial Flow */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-end"
          >
            <motion.div variants={fadeInUp} className="lg:col-span-7">
              <p className="text-xs uppercase tracking-[0.25em] text-amber-600 mb-5">How It Works</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.05] tracking-tight">
                A book in your hands, in <span className="italic font-light text-amber-600">four steps.</span>
              </h2>
            </motion.div>
            <motion.p variants={fadeInUp} className="lg:col-span-5 text-lg text-muted-foreground font-light leading-relaxed lg:pl-8 lg:border-l border-border">
              From a quiet evening search to walking up to a hub and scanning a QR — the whole journey takes minutes, not days.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { num: "01", title: "Search", desc: "Find any textbook by title, author, or ISBN across the entire network.", Icon: Sparkles },
              { num: "02", title: "Borrow or Buy", desc: "Reserve for a semester or purchase outright. Choose what fits your need.", Icon: BookOpen },
              { num: "03", title: "Smart Routing", desc: "We route the book from the nearest hub holding the right copy, to you.", Icon: RefreshCw },
              { num: "04", title: "Pickup at Hub", desc: "Walk in, scan the QR on the shelf, walk out. No queues, no librarian.", Icon: MapPin },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <div className="relative h-full p-8 rounded-2xl border border-border/60 bg-card/70 backdrop-blur-xl shadow-[0_4px_30px_-12px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(245,158,11,0.25)] hover:border-amber-500/30">
                  <div className="flex items-center justify-between mb-10">
                    <span className="font-serif text-5xl font-light text-amber-600/30 group-hover:text-amber-600/60 transition-colors">{step.num}</span>
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-500">
                      <step.Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10 items-center justify-center">
                    <div className="w-8 h-[1px] bg-gradient-to-r from-amber-500/40 to-transparent" />
                    <ArrowRight className="w-3 h-3 text-amber-500/60 -ml-1" />
                  </div>
                )}
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
              <Button onClick={() => openJoin("student")} size="lg" className="h-16 px-10 rounded-full bg-slate-50 text-slate-950 hover:bg-slate-200 text-lg font-medium shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all hover:scale-105">
                Join as Student
              </Button>
              <Button onClick={() => openJoin("college")} size="lg" variant="outline" className="h-16 px-10 rounded-full border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-50 backdrop-blur-md text-lg transition-all hover:scale-105">
                Partner as College
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
