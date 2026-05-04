import { motion, useScroll, useTransform, animate } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

import { useEffect, useRef, useState } from "react";
import { apiFetch } from "@/lib/api";
import {
  MapPin,
  RefreshCw,
  Smartphone,
  Users,
  ArrowRight,
  Wallet,
  Search,
  Zap,
  Recycle,
} from "lucide-react";
import libraryDusk from "@/assets/images/library-dusk.png";
import booksGlow from "@/assets/images/books-glow.png";
import constellation from "@/assets/images/constellation.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};



function Counter({
  from,
  to,
  suffix = "",
  prefix = "",
  duration = 2,
  className,
}: {
  from: number;
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
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
    if (!inView || !nodeRef.current) return;
    const node = nodeRef.current;
    const controls = animate(from, to, {
      duration: duration,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = prefix + Math.round(value).toLocaleString() + suffix;
      }
    });
    return () => controls.stop();
  }, [from, to, inView, duration, prefix, suffix]);

  return (
    <span ref={nodeRef} className={className}>
      {prefix}
      {from}
      {suffix}
    </span>
  );
}

export default function Home() {
  const [, setLocation] = useLocation();
  const catalogTeaser = useQuery({
    queryKey: ["home", "catalog-teaser"],
    queryFn: async () => {
      const [b, h, p] = await Promise.all([
        apiFetch<{ books: { id: string }[] }>("/api/catalog/books"),
        apiFetch<{ hubs: { id: string }[] }>("/api/catalog/hubs"),
        apiFetch<{ listings: { id: string }[] }>("/api/p2p/listings"),
      ]);
      return {
        books: b.books.length,
        hubs: h.hubs.length,
        listings: p.listings.length,
      };
    },
    staleTime: 60_000,
  });
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
              <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl md:text-7xl lg:text-[85px] font-serif font-medium leading-[1.05] tracking-tight mb-8 mt-4">
                Stop spending ₹10,000+ <br className="hidden md:block" />
                every semester <br className="hidden md:block" />
                on <span className="italic font-light text-amber-400">textbooks.</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-300 max-w-xl font-light leading-relaxed mb-10 border-l-2 border-amber-500/50 pl-6">
                Borrow what you need, when you need it - right on campus. Find, reserve, and pick up textbooks from nearby campus hubs in minutes.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col flex-wrap gap-4 sm:flex-row">
              </motion.div>
              {/* {catalogTeaser.data && (
                <motion.p
                  variants={fadeInUp}
                  className="mt-8 max-w-xl text-sm leading-relaxed text-slate-400"
                >
                  <span className="text-slate-300">Live network: </span>
                  <Link
                    href="/library"
                    className="text-amber-300/95 underline-offset-4 hover:text-amber-200 hover:underline"
                  >
                    {catalogTeaser.data.books} titles
                  </Link>
                  <span className="text-slate-500"> · </span>
                  <Link
                    href="/library"
                    className="text-amber-300/95 underline-offset-4 hover:text-amber-200 hover:underline"
                  >
                    {catalogTeaser.data.hubs} hubs
                  </Link>
                  <span className="text-slate-500"> · </span>
                  <Link
                    href="/marketplace"
                    className="text-amber-300/95 underline-offset-4 hover:text-amber-200 hover:underline"
                  >
                    {catalogTeaser.data.listings} peer listings
                  </Link>
                  <span className="text-slate-500"> no sign-in to browse.</span>
                </motion.p>
              )} */}
            </motion.div>
          </div>
        </div>

        {/* Shelf Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      </section>

      {/* Value Proposition */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <motion.h2 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
              className="text-4xl md:text-5xl font-serif font-medium text-slate-900 leading-tight"
            >
              Save money. Skip the hassle.
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-4xl mx-auto">
            {[
              { icon: Wallet, text: "Save up to ₹12,000 per semester" },
              { icon: Search, text: "No more searching across libraries" },
              { icon: Zap, text: "Get books near you, instantly" },
              { icon: Recycle, text: "Help reuse books instead of buying new" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-medium text-slate-700">{item.text}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-slate-900 leading-tight">Get your textbook in under 5 minutes - here’s how:</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Step 1: Discover */}
            <div className="flex flex-col items-center p-8 border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-600 mb-6">
                <Smartphone className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-3">1. Search Instantly</h3>
              <p className="text-slate-600 leading-relaxed">
                Search for your textbook across all nearby campuses instantly.
              </p>
            </div>
            {/* Step 2: Borrow */}
            <div className="flex flex-col items-center p-8 border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-sky-100 text-sky-600 mb-6">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-3">2. Reserve & Pick Up</h3>
              <p className="text-slate-600 leading-relaxed">
                Reserve the closest available copy and pick your campus hub.
              </p>
            </div>
            {/* Step 3: Return */}
            <div className="flex flex-col items-center p-8 border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-6">
                <RefreshCw className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-3">3. Return Anywhere</h3>
              <p className="text-slate-600 leading-relaxed">
                Return it at any hub - no stress, no deadlines pressure.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* The Solution — bespoke atelier layout */}
      <section className="relative py-28 md:py-40 overflow-hidden bg-[#06060a] text-[#ebe8e2]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-[0.14]">
            <img src={constellation} alt="" className="h-full w-full object-cover mix-blend-screen" />
          </div>
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_10%_0%,rgba(201,162,39,0.14),transparent_55%),radial-gradient(ellipse_70%_50%_at_95%_60%,rgba(96,165,250,0.09),transparent_50%)]"
            aria-hidden
          />
          <div
            className="absolute inset-0 opacity-[0.4] bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[length:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]"
            aria-hidden
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-20 flex flex-col gap-10 lg:mb-28 lg:flex-row lg:items-end lg:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-12 bg-gradient-to-r from-[#c9a227] to-transparent" />
                <span className="text-[10px] font-medium uppercase tracking-[0.45em] text-[#c9a227]/90">
                  The solution
                </span>
              </div>
              <h2 className="font-serif text-[2.125rem] font-light leading-[1.12] tracking-[-0.02em] sm:text-5xl md:text-[3.25rem]">
                One system that connects
                <span className="mt-3 block font-serif text-[#c9a227] italic">
                  all campus books into a single, searchable network.
                </span>
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md border-l border-[#c9a227]/25 pl-6 text-[15px] leading-[1.75] text-[#9a968c] lg:max-w-sm lg:border-l-0 lg:border-r lg:pl-0 lg:pr-8 lg:text-right"
            >
              Phygital Library treats the app, the hub shelf, and the inter-campus catalog as one orchestrated layer so that
              availability, routing, and pickup stay in sync.
            </motion.p>
          </div>

          <div className="relative grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-4">
            <div className="pointer-events-none absolute left-1/2 top-[18%] hidden h-[64%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#c9a227]/35 to-transparent lg:block" />

            {[
              {
                step: "I",
                title: "Search & Reserve Instantly",
                subtitle: "Reserve from anywhere",
                body: "Search once across the union catalog. Hold, renew, and see live ETAs without calling a desk.",
                Icon: Smartphone,
                span: "lg:col-span-4 lg:row-span-1 lg:translate-y-8",
                glow: "from-amber-500/25",
                rim: "from-amber-400/50 via-amber-500/10 to-transparent",
              },
              {
                step: "II",
                title: "Easy Pickup Points on Campus",
                subtitle: "Physical custody, refined",
                body: "Human-scale pickup rooms with calibrated lighting and QR handoff so that dignity is maintained in the last meter.",
                Icon: MapPin,
                span: "lg:col-span-4 lg:-translate-y-4",
                glow: "from-sky-400/20",
                rim: "from-sky-300/40 via-sky-500/10 to-transparent",
              },
              {
                step: "III",
                title: "Shared Books Across Campuses",
                subtitle: "Many shelves, one ledger",
                body: "Pooling stock across partner campuses expands what any single library could ever hold alone.",
                Icon: RefreshCw,
                span: "lg:col-span-4 lg:translate-y-6",
                glow: "from-emerald-400/18",
                rim: "from-emerald-300/45 via-emerald-500/10 to-transparent",
              },
            ].map((p, i) => (
              <motion.article
                key={p.step}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.75, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative ${p.span}`}
              >
                <div
                  className={`rounded-[2px] bg-gradient-to-br ${p.rim} p-px shadow-[0_32px_64px_-32px_rgba(0,0,0,0.85)]`}
                >
                  <div className="relative overflow-hidden rounded-[1px] border border-white/[0.06] bg-[#0a0a0f]/95 p-8 backdrop-blur-md md:p-9">
                  <div
                    className={`pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-gradient-to-br ${p.glow} to-transparent blur-3xl transition-transform duration-700 group-hover:scale-110`}
                  />
                  <div className="relative flex items-start justify-between gap-6">
                    <div>
                      <p className="font-serif text-xs tracking-[0.35em] text-[#6b6860]">{p.step}</p>
                      <h3 className="mt-4 font-serif text-2xl font-normal tracking-tight text-[#f4f1ea] md:text-[1.65rem]">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.28em] text-[#c9a227]/80">
                        {p.subtitle}
                      </p>
                    </div>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-[#c9a227] transition-colors duration-500 group-hover:border-[#c9a227]/35 group-hover:text-[#e8d48b]">
                      <p.Icon className="h-5 w-5" strokeWidth={1.25} />
                    </div>
                  </div>
                  <p className="relative mt-8 text-[14px] leading-[1.75] text-[#9a968c]">{p.body}</p>
                  <div className="relative mt-10 flex items-center gap-2 border-t border-white/[0.06] pt-6">
                    <span className="h-1 w-1 rounded-full bg-[#c9a227]" />
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#6b6860]">Phygital Library stack</span>
                  </div>
                  </div>
                </div>
              </motion.article>
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

      {/* Impact — same language as hero metrics & runway */}
      {/* Impact */}
      <section className="relative border-y border-white/[0.06] bg-[#050505] text-[#f4f1ea] py-24 sm:py-32">
        <div
          className="pointer-events-none absolute inset-0 opacity-35 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(212,175,55,0.08),transparent),radial-gradient(ellipse_50%_35%_at_100%_100%,rgba(56,189,248,0.05),transparent)]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-white leading-tight">
              Making a tangible difference.
            </h2>
            <p className="mt-6 text-lg text-slate-400">
              Our network isn't just about convenience; it's about creating sustainable, cost-effective access to knowledge for every student.
            </p>
          </motion.div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="rounded-2xl bg-white/5 p-8 text-center"
            >
              <p className="font-serif text-6xl font-medium text-sky-400">
                <Counter from={0} to={12000} prefix="₹" />+
              </p>
              <p className="mt-4 text-lg text-slate-300">Saved by students per semester</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="rounded-2xl bg-white/5 p-8 text-center"
            >
              <p className="font-serif text-6xl font-medium text-amber-400">
                <Counter from={0} to={80} suffix="%" />
              </p>
              <p className="mt-4 text-lg text-slate-300">Of network books reused instead of wasted</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA — aligned with hero actions */}
      <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#050505] text-[#f4f1ea]">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[min(90vw,42rem)] w-[min(90vw,42rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.12)_0%,transparent_65%)] blur-3xl"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center lg:px-12 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-amber-400/90">
              Join the network
            </p>
            <h2 className="mt-6 font-serif text-[2.35rem] font-light leading-[1.08] tracking-[-0.03em] sm:text-5xl md:text-6xl">
              Start saving on textbooks today.
            </h2>
            <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-slate-400">
              Find books near you, list your own, or partner with us to bring Phygital Library to your campus.
            </p>
            <div className="mt-12 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center sm:gap-5">
              <Button
                asChild
                size="lg"
                className="h-14 rounded-lg border-0 bg-amber-500 px-10 text-base font-medium text-slate-950 shadow-[0_0_0_1px_rgba(251,191,36,0.35)] transition-all hover:scale-[1.02] hover:bg-amber-400"
              >
                <Link href="/sign-in?as=student">Find Books Near Me</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 rounded-lg border border-white/20 bg-transparent px-10 text-base font-medium text-slate-50 transition-all hover:scale-[1.02] hover:border-amber-400/50 hover:bg-white/[0.04]"
              >
                <Link href="/sign-in">List a Book</Link>
              </Button>
            </div>
            <div className="mt-6">
              <Button asChild variant="link" size="lg" className="h-14 rounded-lg px-8 text-slate-400 hover:text-amber-400">
                <Link href="/colleges">Partner Your Campus</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>


    </div>
  );
}