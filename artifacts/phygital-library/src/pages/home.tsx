import { motion, useScroll, useTransform, animate } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";
import { apiFetch } from "@/lib/api";
import {
  MapPin,
  RefreshCw,
  Smartphone,
  Users,
  ArrowRight,
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

const HERO_LIVE_METRICS = [
  {
    idx: "01",
    kicker: "Trusted by",
    note: "Campuses across India",
    from: 0,
    to: 50,
    suffix: "+",
    prefix: "",
    kickerClass: "text-amber-400",
    delay: 0.1,
  },
  {
    idx: "02",
    kicker: "Books in circulation",
    note: "And growing every semester",
    from: 0,
    to: 120,
    suffix: "k",
    prefix: "",
    kickerClass: "text-sky-400",
    delay: 0.18,
  },
  {
    idx: "03",
    kicker: "Average savings",
    note: "Per student, per year",
    from: 0,
    to: 12,
    suffix: "k+",
    prefix: "₹",
    kickerClass: "text-emerald-400",
    delay: 0.26,
  },
] as const;

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
                Knowledge should <br className="hidden md:block" />
                be <span className="italic font-light text-amber-400">accessible</span>, <br className="hidden md:block" />
                not owned.
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-300 max-w-xl font-light leading-relaxed mb-10 border-l-2 border-amber-500/50 pl-6">
                Discover, borrow, and pick up textbooks at local campus hubs. A seamless network bridging digital convenience with physical books.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col flex-wrap gap-4 sm:flex-row">
                <Link href="/marketplace" className="h-14 px-8 rounded-full bg-amber-500 text-slate-950 hover:bg-amber-400 text-base font-medium transition-all hover:scale-105 inline-flex items-center justify-center">
                  Explore Network <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link href="/library" className="h-14 px-8 rounded-full border border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-50 backdrop-blur-md text-base transition-all inline-flex items-center justify-center">
                  Browse catalog
                </Link>
                <Link href="/colleges" className="h-14 px-8 rounded-full border border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-50 backdrop-blur-md text-base transition-all inline-flex items-center justify-center">
                  For Colleges
                </Link>
              </motion.div>
              {catalogTeaser.data && (
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
                  <span className="text-slate-500"> — no sign-in to browse.</span>
                </motion.p>
              )}
            </motion.div>

            {/* Hero metrics — minimal stack, high contrast, no decoration noise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] as const }}
              className="lg:col-span-4 w-full lg:self-center"
            >
              {/* Mobile: simple vertical list */}
              <div className="mt-14 divide-y divide-white/10 border-t border-white/15 lg:hidden">
                {HERO_LIVE_METRICS.map((row) => (
                  <div key={row.kicker} className="py-9 first:pt-0 last:pb-0">
                    <p className="font-mono text-[11px] tabular-nums tracking-wider text-slate-400">
                      {row.idx}
                    </p>
                    <p
                      className={`mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] ${row.kickerClass}`}
                    >
                      {row.kicker}
                    </p>
                    <Counter
                      from={row.from}
                      to={row.to}
                      prefix={row.prefix}
                      suffix={row.suffix}
                      className="mt-3 block font-serif text-5xl font-light tabular-nums tracking-tight text-slate-50"
                    />
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-300">
                      {row.note}
                    </p>
                  </div>
                ))}
              </div>

              {/* Desktop: one hairline + calm typography */}
              <div className="mt-4 hidden flex-col gap-12 border-l border-white/20 pl-8 lg:flex">
                {HERO_LIVE_METRICS.map((row) => (
                  <motion.div
                    key={row.kicker}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.65,
                      delay: 0.5 + row.delay,
                      ease: [0.16, 1, 0.3, 1] as const,
                    }}
                  >
                    <p className="font-mono text-[11px] tabular-nums tracking-wider text-slate-400">
                      {row.idx}
                    </p>
                    <p
                      className={`mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] ${row.kickerClass}`}
                    >
                      {row.kicker}
                    </p>
                    <Counter
                      from={row.from}
                      to={row.to}
                      prefix={row.prefix}
                      suffix={row.suffix}
                      className="mt-3 block font-serif text-5xl xl:text-6xl font-light tabular-nums tracking-tight text-slate-50"
                    />
                    <p className="mt-3 max-w-[17rem] text-sm leading-relaxed text-slate-300">
                      {row.note}
                    </p>
                  </motion.div>
                ))}
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
                One nervous system
                <span className="mt-3 block font-serif text-[#c9a227] italic">
                  for digital, physical, and networked books.
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
                title: "Glass interface",
                subtitle: "Reserve from anywhere",
                body: "Search once across the union catalog. Hold, renew, and see live ETAs without calling a desk.",
                Icon: Smartphone,
                span: "lg:col-span-4 lg:row-span-1 lg:translate-y-8",
                glow: "from-amber-500/25",
                rim: "from-amber-400/50 via-amber-500/10 to-transparent",
              },
              {
                step: "II",
                title: "Curated hubs",
                subtitle: "Physical custody, refined",
                body: "Human-scale pickup rooms with calibrated lighting and QR handoff so that dignity is maintained in the last meter.",
                Icon: MapPin,
                span: "lg:col-span-4 lg:-translate-y-4",
                glow: "from-sky-400/20",
                rim: "from-sky-300/40 via-sky-500/10 to-transparent",
              },
              {
                step: "III",
                title: "Mesh inventory",
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

      {/* How it works — full-bleed runway, zero cards */}
      <section className="relative bg-[#050505] text-[#f4f1ea]">
        <div
          className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,175,55,0.15),transparent),radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(56,189,248,0.06),transparent)]"
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-7xl border-b border-white/[0.08] px-6 py-20 lg:px-12 lg:py-28">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] as const }}
              className="max-w-3xl"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-amber-400/90">
                How it works
              </p>
              <h2 className="mt-5 font-serif text-[2.25rem] font-light leading-[1.08] tracking-[-0.03em] sm:text-5xl md:text-[3.35rem]">
                Four beats.
                <span className="mt-1 block font-serif italic text-amber-400/95">One straight line to the shelf.</span>
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] as const }}
              className="max-w-md text-[15px] leading-[1.75] text-slate-400"
            >
              Nothing boxed in modals or hidden states so that just the path your book takes from search to handoff.
            </motion.p>
          </div>

          <div
            className="mt-14 flex gap-1 lg:mt-20"
            aria-hidden
          >
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-px flex-1 bg-gradient-to-r from-amber-500/50 via-amber-500/20 to-transparent opacity-50" />
            ))}
          </div>
        </div>

        {(
          [
            {
              mark: "01",
              title: "Discover",
              desc: "Title, author, or ISBN, one search spans every participating shelf.",
              bar: "from-amber-400 to-amber-600/20",
            },
            {
              mark: "02",
              title: "Commit",
              desc: "Borrow for the term or buy outright; pricing and return windows stay transparent.",
              bar: "from-sky-400 to-sky-600/20",
            },
            {
              mark: "03",
              title: "Route",
              desc: "The mesh picks the nearest copy with a valid hold window and stages it to your hub.",
              bar: "from-emerald-400 to-emerald-600/20",
            },
            {
              mark: "04",
              title: "Release",
              desc: "Scan, collect, leave. The ledger closes the moment the QR clears.",
              bar: "from-amber-400 via-fuchsia-400/80 to-transparent",
            },
          ] as const
        ).map((step, i) => (
          <motion.div
            key={step.mark}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative border-b border-white/[0.06]"
          >
            <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-14 sm:py-16 lg:grid-cols-12 lg:items-start lg:gap-10 lg:px-12 lg:py-20">
              <div className="flex gap-5 lg:col-span-2 lg:flex-col lg:gap-4">
                <div
                  className={`h-full min-h-[3.5rem] w-px shrink-0 bg-gradient-to-b ${step.bar} lg:min-h-[4.5rem]`}
                  aria-hidden
                />
                <span className="font-mono text-[11px] font-medium tabular-nums tracking-[0.35em] text-slate-500">
                  {step.mark}
                </span>
              </div>

              <div className="lg:col-span-4">
                <h3 className="font-serif text-[1.85rem] font-light tracking-[-0.02em] sm:text-3xl lg:text-[2.125rem] lg:leading-[1.12]">
                  {step.title}
                </h3>
              </div>

              <p className="text-base leading-[1.8] text-slate-400 sm:text-[17px] lg:col-span-6 lg:pt-1">
                {step.desc}
              </p>
            </div>

          </motion.div>
        ))}
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
      <section className="relative border-y border-white/[0.06] bg-[#050505] text-[#f4f1ea]">
        <div
          className="pointer-events-none absolute inset-0 opacity-35 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(212,175,55,0.08),transparent),radial-gradient(ellipse_50%_35%_at_100%_100%,rgba(56,189,248,0.05),transparent)]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
          <p className="pt-16 text-[10px] font-semibold uppercase tracking-[0.45em] text-amber-400/85 lg:pt-20">
            Impact
          </p>
          <div className="mt-6 grid grid-cols-1 divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0 md:divide-white/10">
            {(
              [
                {
                  bar: "from-amber-400 to-amber-700/10",
                  label: "Savings per student",
                  counter: (
                    <Counter
                      from={0}
                      to={12}
                      prefix="₹"
                      suffix="k+"
                      className="font-serif text-5xl font-light tabular-nums tracking-tight text-slate-50 sm:text-6xl lg:text-7xl"
                    />
                  ),
                  delay: 0,
                },
                {
                  bar: "from-sky-400 to-sky-700/10",
                  label: "Campuses Connected",
                  counter: (
                    <Counter
                      from={0}
                      to={50}
                      suffix="+"
                      className="font-serif text-5xl font-light tabular-nums tracking-tight text-slate-50 sm:text-6xl lg:text-7xl"
                    />
                  ),
                  delay: 0.08,
                },
                {
                  bar: "from-emerald-400 to-emerald-700/10",
                  label: "Resource Reuse Rate",
                  counter: (
                    <Counter
                      from={0}
                      to={80}
                      suffix="%"
                      className="font-serif text-5xl font-light tabular-nums tracking-tight text-slate-50 sm:text-6xl lg:text-7xl"
                    />
                  ),
                  delay: 0.16,
                },
              ] as const
            ).map((row) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.65, delay: row.delay, ease: [0.16, 1, 0.3, 1] as const }}
                className="flex gap-6 py-14 md:py-16 md:pl-10 md:pr-8 lg:pl-12 lg:pr-10"
              >
                <div
                  className={`w-px shrink-0 self-stretch bg-gradient-to-b ${row.bar} opacity-90`}
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  {row.counter}
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    {row.label}
                  </p>
                </div>
              </motion.div>
            ))}
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
              Ready to open
              <span className="mt-2 block font-serif italic text-amber-400">the next chapter?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-slate-400">
              Students save on books; colleges keep shelves alive. Pick the path that fits you.
            </p>
            <div className="mt-12 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center sm:gap-5">
              <Button
                onClick={() => setLocation("/sign-in")}
                size="lg"
                className="h-14 rounded-full border-0 bg-amber-500 px-10 text-base font-medium text-slate-950 shadow-[0_0_0_1px_rgba(251,191,36,0.35)] transition-all hover:scale-[1.02] hover:bg-amber-400"
              >
                Join as Student
              </Button>
              <Button
                onClick={() => setLocation("/sign-in")}
                size="lg"
                variant="outline"
                className="h-14 rounded-full border border-white/20 bg-transparent px-10 text-base font-medium text-slate-50 transition-all hover:scale-[1.02] hover:border-amber-400/50 hover:bg-white/[0.04]"
              >
                Partner as College
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
