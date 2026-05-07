import { Link } from "wouter";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, BookOpen, Zap, Sparkles, Network, ShieldCheck, CheckCircle2
} from "lucide-react";
import { Container } from "@/components/home/Container";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useRef } from "react";
import { ImageCarousel } from "@/components/home/ImageCarousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const viewportOnce = { once: true, margin: "-80px", amount: 0.2 } as const;

const SHOWCASE_BOOKS = [
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop",
];

export default function Home() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const lotusRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: lotusProgress } = useScroll({
    target: lotusRef,
    offset: ["start end", "end start"]
  });

  const leftX = useTransform(lotusProgress, [0.1, 0.45], [0, -420]);
  const rightX = useTransform(lotusProgress, [0.1, 0.45], [0, 420]);
  const leftRotate = useTransform(lotusProgress, [0.1, 0.45], [0, -5]);
  const rightRotate = useTransform(lotusProgress, [0.1, 0.45], [0, 5]);
  const centerScale = useTransform(lotusProgress, [0.1, 0.45], [0.8, 1]);
  const centerOpacity = useTransform(lotusProgress, [0.1, 0.3], [0, 1]);
  const outerOpacity = useTransform(lotusProgress, [0.1, 0.35], [0, 1]);
  const mobileY = useTransform(lotusProgress, [0.1, 0.4], [60, 0]);
  const mobileOpacity = useTransform(lotusProgress, [0.1, 0.3], [0, 1]);

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const HERO_BG_IMAGES = [
    { src: "/images/hero-library.png", alt: "Premium Futuristic Library" },
    { src: "/images/community-hub.png", alt: "Collaborative Student Hub" },
    { src: "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2000&auto=format&fit=crop", alt: "Academic Success" },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 30 },
    visible: {
      opacity: 1, y: 0,
      transition: reduceMotion ? { duration: 0 } : { type: "spring" as const, stiffness: 300, damping: 25, mass: 0.8 },
    },
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.08, delayChildren: reduceMotion ? 0 : 0.1 } },
  };

  return (
    <div className="w-full bg-[#FAFAFA] font-sans selection:bg-primary/20 selection:text-primary">

      {/* 1. HERO SECTION */}
      <section id="hero" ref={heroRef} className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-primary">
        {/* Background Image Carousel */}
        <div className="absolute inset-0 z-0">
          <ImageCarousel
            images={HERO_BG_IMAGES}
            full
            minimal
            autoAdvanceMs={6000}
            className="opacity-100"
          />
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-[1px]" />
        </div>

        <Container className="relative z-10 px-4 py-16 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

            {/* Left Column: Typography & CTA */}
            <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-2xl">
              <motion.div variants={fadeUp}>
                <div className="inline-flex items-center gap-2 rounded-none border border-white/20 bg-white/10 px-4 py-1.5 caption-scale font-semibold text-blue-200 backdrop-blur-md shadow-sm">
                  <Zap className="h-3.5 w-3.5 fill-primary text-primary" />
                  <span>The Futuristic Reading Platform</span>
                </div>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-8 text-balance font-[var(--font-display)] hero-title text-white"
              >
                Intelligent libraries for the <span className="text-blue-400">modern mind.</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-6 body-scale text-slate-200 max-w-xl">
                Neeve upgrades campus spaces into premium discovery hubs. Experience seamless physical borrowing powered by smart routing and community intelligence.
              </motion.p>

              <motion.div variants={stagger} className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <motion.div variants={fadeUp} className="w-full sm:w-auto">
                  <Link href="/sign-in" className="magnetic-btn flex w-full items-center justify-center gap-2 rounded-none bg-primary px-6 py-3 small-scale font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:-translate-y-0.5">
                    Explore Network <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
                <motion.div variants={fadeUp} className="w-full sm:w-auto">
                  <Link href="/colleges" className="magnetic-btn flex w-full items-center justify-center gap-2 rounded-none border border-white/20 bg-white/10 backdrop-blur-md px-6 py-3 small-scale font-semibold text-white shadow-sm transition-all hover:border-white/30 hover:bg-white/20 hover:-translate-y-0.5">
                    Partner With Us
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-12 flex items-center gap-6 border-t border-white/10 pt-8">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-7 w-7 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="small-scale">
                    <p className="font-semibold text-white">12k+</p>
                    <p className="caption-scale text-slate-300">Active Readers</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="font-semibold text-white small-scale">Verified</p>
                    <p className="caption-scale text-slate-300">Campus Hubs</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Floating Visuals */}
            <motion.div
              className="relative hidden lg:block h-[600px] w-full perspective-1000"
              style={{ y: yParallax, opacity: opacityParallax }}
            >
              {/* Decorative Book Stack */}
              <motion.div
                animate={{ y: [0, -10, 0], rotateX: [10, 11, 10], rotateY: [-15, -13, -15] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[10%] right-[10%] w-[280px] h-[400px] rounded-none shadow-lg overflow-hidden border border-white/50 bg-white"
              >
                <img src={SHOWCASE_BOOKS[0]} alt="Book Cover" className="w-full h-full object-cover opacity-95" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent" />
              </motion.div>

              {/* Floating UI Card 1 */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[50%] -left-[10%] bento-card p-3 flex items-center gap-2.5 w-[180px] z-20"
              >
                <div className="h-8 w-8 rounded-none bg-blue-50 flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Available Now</p>
                  <p className="small-scale font-bold text-slate-900 leading-none">12,450+ Titles</p>
                </div>
              </motion.div>

              {/* Floating UI Card 2 */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-[20%] right-[5%] bento-card p-3 flex items-center gap-2.5 w-[160px] z-20"
              >
                <div className="h-8 w-8 rounded-none bg-emerald-50 flex items-center justify-center">
                  <Network className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Hub Network</p>
                  <p className="small-scale font-bold text-slate-900 leading-none">Connected</p>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </Container>
      </section>

      {/* FLOATING FEATURE CARDS */}
      <section className="relative overflow-hidden py-16 bg-[#FAFAFA]">
        <Container>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col items-center"
          >
            {/* Heading */}
            <motion.div
              variants={fadeUp}
              className="max-w-5xl mx-auto text-center mb-16"
            >
              <h2 className="
          font-[var(--font-display)]
          h1-scale
          text-slate-900
        ">
                Find the knowledge path
                <br />
                that aligns with your ambition.
              </h2>

              <p className="mt-6 body-scale text-slate-500 max-w-2xl mx-auto">
                Discover curated libraries, intelligent recommendations,
                and premium campus reading experiences.
              </p>
            </motion.div>

            {/* LOTUS BLOOM CARDS */}
            <div ref={lotusRef} className="w-full mt-8 md:mt-0">
              {/* DESKTOP BLOOM VIEW */}
              <div className="hidden md:flex relative items-center justify-center w-full min-h-[500px] overflow-hidden">

                {/* LEFT CARD */}
                <motion.div
                  style={{
                    x: leftX,
                    rotate: leftRotate,
                    opacity: outerOpacity,
                  }}
                  transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -15,
                    rotate: -12,
                    scale: 1.03,
                  }}
                  className="
        absolute
        w-[240px]
        h-[380px]
        rounded-none
        overflow-hidden
        border border-blue-50
        shadow-md
        bg-white
        z-10
      "
                >
                  <img
                    src={SHOWCASE_BOOKS[4]}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="rounded-none bg-white/90 backdrop-blur-xl p-5">
                      <h3 className="h3-scale text-slate-900 mb-2.5">
                        The Explorers
                      </h3>

                      <p className="body-scale text-slate-600">
                        Discover curated libraries and premium reading spaces.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* CENTER CARD */}
                <motion.div
                  style={{
                    scale: centerScale,
                    opacity: centerOpacity,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -20,
                    scale: 1.05,
                  }}
                  className="
        absolute
        w-[280px]
        h-[460px]
        rounded-none
        overflow-hidden
        border border-blue-50
        shadow-lg
        bg-white
        z-30
      "
                >
                  <img
                    src={SHOWCASE_BOOKS[5]}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="rounded-none bg-white/90 backdrop-blur-xl p-6">
                      <h3 className="h3-scale text-slate-900 mb-3">
                        The Knowledge Builder
                      </h3>

                      <p className="body-scale text-slate-600">
                        Intelligent discovery, reading analytics,
                        and seamless library management.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* RIGHT CARD */}
                <motion.div
                  style={{
                    x: rightX,
                    rotate: rightRotate,
                    opacity: outerOpacity,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -15,
                    rotate: -12,
                    scale: 1.03,
                  }}
                  className="
        absolute
        w-[240px]
        h-[380px]
        rounded-none
        overflow-hidden
        border border-blue-50
        shadow-md
        bg-white
        z-10
      "
                >
                  <img
                    src={SHOWCASE_BOOKS[6]}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="rounded-none bg-white/90 backdrop-blur-xl p-5">
                      <h3 className="h3-scale text-slate-900 mb-2.5">
                        The Readers
                      </h3>

                      <p className="body-scale text-slate-600">
                        Build habits, share highlights,
                        and grow your reading network.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* MOBILE CAROUSEL VIEW */}
              <div className="block md:hidden w-full px-4">
                <Carousel
                  opts={{
                    align: "center",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {/* CARD 1 */}
                    <CarouselItem className="pl-2 basis-[85%]">
                      <motion.div
                        style={{ y: mobileY, opacity: mobileOpacity }}
                        className="relative h-[420px] rounded-none overflow-hidden border border-blue-50 shadow-md bg-white"
                      >
                        <img
                          src={SHOWCASE_BOOKS[4]}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="rounded-none bg-white/90 backdrop-blur-xl p-5">
                            <h3 className="h3-scale text-slate-900 mb-2.5">The Explorers</h3>
                            <p className="body-scale text-slate-600">Discover curated libraries and premium reading spaces.</p>
                          </div>
                        </div>
                      </motion.div>
                    </CarouselItem>

                    {/* CARD 2 */}
                    <CarouselItem className="pl-2 basis-[85%]">
                      <motion.div
                        style={{ y: mobileY, opacity: mobileOpacity }}
                        className="relative h-[420px] rounded-none overflow-hidden border border-blue-50 shadow-md bg-white"
                      >
                        <img
                          src={SHOWCASE_BOOKS[5]}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <div className="rounded-none bg-white/90 backdrop-blur-xl p-6">
                            <h3 className="h3-scale text-slate-900 mb-3">The Knowledge Builder</h3>
                            <p className="body-scale text-slate-600">Intelligent discovery, reading analytics, and seamless library management.</p>
                          </div>
                        </div>
                      </motion.div>
                    </CarouselItem>

                    {/* CARD 3 */}
                    <CarouselItem className="pl-2 basis-[85%]">
                      <motion.div
                        style={{ y: mobileY, opacity: mobileOpacity }}
                        className="relative h-[420px] rounded-none overflow-hidden border border-blue-50 shadow-md bg-white"
                      >
                        <img
                          src={SHOWCASE_BOOKS[6]}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="rounded-none bg-white/90 backdrop-blur-xl p-5">
                            <h3 className="h3-scale text-slate-900 mb-2.5">The Readers</h3>
                            <p className="body-scale text-slate-600">Build habits, share highlights, and grow your reading network.</p>
                          </div>
                        </div>
                      </motion.div>
                    </CarouselItem>
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* 3. ANIMATED BOOK SHOWCASE */}
      <section className="py-16 overflow-hidden bg-white border-y border-slate-100">
        <motion.div
          variants={fadeUp}
          className="max-w-5xl mx-auto text-center mb-16"
        >
          <h2 className="
          font-[var(--font-display)]
          h1-scale
          text-slate-900
        ">
            Curated Premium Selection</h2>
        </motion.div>

        {/* Infinite Scroll Container */}
        <div className="relative w-full flex overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

          <motion.div
            className="flex gap-8 px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
            style={{ width: "fit-content" }}
          >
            {/* Duplicate list for seamless looping */}
            {[...SHOWCASE_BOOKS, ...SHOWCASE_BOOKS, ...SHOWCASE_BOOKS].map((src, idx) => (
              <div
                key={idx}
                className="group relative w-[160px] h-[230px] shrink-0 rounded-none overflow-hidden shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer"
              >
                <img src={src} alt="Book Mockup" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-semibold small-scale truncate">Premium Title</p>
                  <p className="text-white/80 caption-scale">Available at 3 Hubs</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PREMIUM STORYTELLING SECTION */}
      <section className="py-16 md:py-20 bg-[#FAFAFA] overflow-hidden">
        <Container>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >

            {/* HERO HEADING */}
            <motion.div
              variants={fadeUp}
              className="max-w-5xl mx-auto text-center mb-16"
            >
              <h2 className="
          font-[var(--font-display)]
          h1-scale
          text-slate-900
        ">
                Transform reading into an ecosystem that lives beyond books.
              </h2>
            </motion.div>

            {/* FEATURE GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

              {/* LEFT COLUMN */}
              <motion.div
                variants={fadeUp}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-[2px] w-16 bg-emerald-300" />
                    <span className="small-scale font-bold uppercase tracking-widest text-slate-500">
                      Smart Discovery
                    </span>
                  </div>

                  <h3 className="h3-scale text-slate-900 mb-5">
                    Smart Discovery
                  </h3>

                  <p className="body-scale text-slate-500">
                    Discover books, research material,
                    and community insights naturally through
                    intelligent campus-driven recommendations.
                  </p>
                </div>

                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="
              relative
              overflow-hidden
              rounded-none
              shadow-sm
            "
                >
                  <img
                    src="/images/smart-discovery.png"
                    alt=""
                    className="w-full h-[240px] md:h-[320px] object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </motion.div>
              </motion.div>

              {/* CENTER COLUMN */}
              <motion.div
                variants={fadeUp}
                className="flex flex-col space-y-6 lg:pt-16"
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="
              order-2
              lg:order-1
              relative
              overflow-hidden
              rounded-none
              shadow-md
            "
                >
                  <img
                    src="/images/community-hub.png"
                    alt=""
                    className="w-full h-[220px] md:h-[280px] object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </motion.div>

                <div className="order-1 lg:order-2">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-[2px] w-16 bg-orange-200" />
                    <span className="small-scale font-bold uppercase tracking-widest text-slate-500">
                      Community Driven
                    </span>
                  </div>

                  <h3 className="h3-scale text-slate-900 mb-5">
                    Collaborative Knowledge
                  </h3>

                  <p className="body-scale text-slate-500">
                    Join reading communities, campus discussions,
                    and peer-powered discovery experiences that
                    make learning feel alive.
                  </p>
                </div>
              </motion.div>

              {/* RIGHT COLUMN */}
              <motion.div
                variants={fadeUp}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-[2px] w-16 bg-blue-200" />
                    <span className="small-scale font-bold uppercase tracking-widest text-slate-500">
                      Physical + Digital
                    </span>
                  </div>

                  <h3 className="h3-scale text-slate-900 mb-5">
                    Real Campus Experience
                  </h3>

                  <p className="body-scale text-slate-500">
                    Seamlessly connect online discovery
                    with trusted physical library hubs and
                    premium student pickup experiences.
                  </p>
                </div>

                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="
              relative
              overflow-hidden
              rounded-none
              shadow-sm
            "
                >
                  <img
                    src="/images/hero-library.png"
                    alt=""
                    className="w-full h-[240px] md:h-[320px] object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </motion.div>
              </motion.div>
            </div>

            {/* PREMIUM LIBRARY STORY SECTION */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="
    relative
    mt-12
    md:mt-24
    overflow-hidden
  "
            >
              {/* BACKGROUND */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* MAIN BLUE GLOW */}
                <div
                  className="
        absolute
        left-1/2
        top-1/2
        h-[500px]
        w-[500px]
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-primary/5
        blur-[100px]
      "
                />

                {/* SMALL GLOWS */}
                <div
                  className="
        absolute
        left-[15%]
        top-[20%]
        h-32
        w-32
        rounded-full
        bg-primary/5
        blur-[70px]
      "
                />

                <div
                  className="
        absolute
        right-[10%]
        bottom-[10%]
        h-40
        w-40
        rounded-full
        bg-primary/5
        blur-[80px]
      "
                />
              </div>

              <div
                className="
      relative
      mx-auto
      flex
      max-w-7xl
      flex-col
      items-center
    "
              >
                {/* TOP LABEL */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="
        mb-6
        inline-flex
        items-center
        gap-2
        rounded-none
        border
        border-primary/10
        bg-primary/5
        px-4
        py-1.5
        caption-scale
        font-semibold
        uppercase
        tracking-widest
        text-primary
      "
                >
                  <div className="h-1.5 w-1.5 rounded-none bg-primary" />
                  Smart Campus Ecosystem
                </motion.div>

                {/* HEADING */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="
        max-w-5xl
        text-center
      "
                >
                  <h2
                    className="font-[var(--font-display)] h1-scale text-slate-900"
                  >
                    Designed for the
                    <span className="text-primary"> next generation </span>
                    of campus libraries.
                  </h2>

                  <p
                    className="
          mx-auto
          mt-6
          max-w-2xl
          body-scale
          text-slate-600
        "
                  >
                    Neeve combines intelligent discovery,
                    peer-to-peer exchange, digital tracking,
                    and modern library infrastructure into one
                    seamless premium platform.
                  </p>
                </motion.div>

                {/* CENTER VISUAL */}
                <div
                  className="
        relative
        mt-12
        md:mt-24
        flex
        items-center
        justify-center
        min-h-[420px]
        md:min-h-[600px]
      "
                >
                  {/* LEFT FLOATING CARD */}
                  <motion.div
                    animate={{
                      y: [0, -12, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 5,
                    }}
                    className="
          absolute
          left-[-140px]
          top-[80px]
          hidden
          rounded-none
          border
          border-white/50
          bg-white/90
          p-5
          shadow-md
          backdrop-blur-xl
          lg:block
        "
                  >
                    <p className="small-scale font-medium text-slate-500">
                      Active Library Hubs
                    </p>

                    <div className="mt-4 flex items-end gap-2">
                      <h4 className="h1-scale text-slate-900">
                        120+
                      </h4>

                      <span className="mb-2 small-scale text-primary">
                        Connected
                      </span>
                    </div>

                    <div className="mt-4 flex gap-1.5">
                      <div className="h-1.5 w-12 rounded-none bg-primary" />
                      <div className="h-1.5 w-6 rounded-none bg-primary/20" />
                    </div>
                  </motion.div>

                  {/* MAIN IMAGE CONTAINER */}
                  <motion.div
                    whileHover={{
                      y: -8,
                      rotate: -1.5,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    className="
          relative
          overflow-hidden
          rounded-md
          border
          border-white/60
          bg-white
          shadow-[0_40px_120px_rgba(37,99,235,0.18)]
        "
                  >
                    {/* LIGHT REFLECTION */}
                    <div
                      className="
            absolute
            inset-0
            z-20
            bg-gradient-to-b
            from-white/20
            via-transparent
            to-transparent
            pointer-events-none
          "
                    />

                    {/* IMAGE */}
                    <img
                      src="/images/book-collection.png"
                      alt="Premium Library Books"
                      className="
            h-[380px]
            w-[320px]
            md:h-[540px]
            md:w-[440px]
            object-cover
          "
                    />

                    {/* BOTTOM OVERLAY */}
                    <div
                      className="
            absolute
            inset-x-0
            bottom-0
            z-10
            bg-gradient-to-t
            from-black/70
            via-black/20
            to-transparent
            p-4
            md:p-8
          "
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-none
                bg-primary
                shadow-sm
              "
                        >
                          <BookOpen className="h-5 w-5 text-white" />
                        </div>

                        <div>
                          <p className="small-scale text-white/70">
                            Intelligent Discovery
                          </p>

                          <h4 className="mt-1 h3-scale text-white">
                            Premium Campus Experience
                          </h4>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* RIGHT FLOATING CARD */}
                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                    }}
                    className="
          absolute
          right-[-150px]
          bottom-[70px]
          hidden
          rounded-none
          border
          border-white/50
          bg-slate-950
          p-5
          text-white
          shadow-xl
          lg:block
        "
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-none
              bg-primary
            "
                      >
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>

                      <div>
                        <p className="small-scale text-white/60">
                          AI Recommendations
                        </p>

                        <h4 className="mt-1 h3-scale">
                          Smart Discovery
                        </h4>
                      </div>
                    </div>

                    <div className="mt-5 space-y-2.5">
                      <div className="h-1.5 w-32 rounded-none bg-white/10">
                        <div className="h-1.5 w-24 rounded-none bg-primary" />
                      </div>

                      <div className="h-1.5 w-24 rounded-none bg-white/10" />
                    </div>
                  </motion.div>
                </div>

                {/* BOTTOM MINI FEATURES */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="
        mt-16
        grid
        w-full
        max-w-5xl
        grid-cols-1
        gap-5
        md:grid-cols-3
      "
                >
                  {[
                    {
                      title: "Intelligent Discovery",
                      desc: "AI-powered search across connected campus libraries.",
                    },
                    {
                      title: "Seamless Borrowing",
                      desc: "Modern cross-campus book exchange and tracking.",
                    },
                    {
                      title: "Community Learning",
                      desc: "Shared insights, highlights, and collaborative reading.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="
            rounded-none
            border
            border-primary/10
            bg-white/80
            p-6
            shadow-sm
            backdrop-blur-xl
          "
                    >
                      <h4 className="h3-scale text-slate-900">
                        {item.title}
                      </h4>

                      <p className="mt-3 small-scale text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.section>
          </motion.div>
        </Container>
      </section>

      {/* PREMIUM PRICING SECTION */}
      <section className="relative overflow-hidden py-20 bg-[#FAFAFA]">

        {/* Ambient Glow */}
        <div className="
    absolute
    top-0
    left-1/2
    -translate-x-1/2
    w-[700px]
    h-[400px]
    bg-primary/5
    blur-[120px]
    rounded-full
    pointer-events-none
  " />

        <Container className="relative z-10">

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >

            {/* Heading */}
            <motion.div
              variants={fadeUp}
              className="max-w-4xl mx-auto text-center mb-16"
            >
              <div className="
          inline-flex
          items-center
          gap-2
          rounded-none
          border
          border-primary/10
          bg-primary/5
          px-4
          py-1.5
          caption-scale
          font-semibold
          uppercase
          tracking-widest
          text-primary
          mb-6
        ">
                <div className="h-2 w-2 rounded-none bg-primary" />
                Pricing
              </div>

              <h2 className="
          font-[var(--font-display)]
          h1-scale
          text-slate-900
        ">
                Membership and purchase paths
              </h2>

              <p className="
          mt-8
          max-w-3xl
          mx-auto
          body-scale
          text-slate-500
        ">
                Premium membership for predictable access.
                Flexible retail and peer-to-peer exchange
                when ownership matters more.
              </p>
            </motion.div>

            {/* Pricing Grid */}
            <div className="
        grid
        grid-cols-1
        lg:grid-cols-2
        rounded-none
        overflow-hidden
        border
        border-slate-200/60
        bg-white
        shadow-md
      ">

              {/* LEFT PLAN */}
              <motion.div
                variants={fadeUp}
                className="
            relative
            overflow-hidden
            p-8
            md:p-10
            border-b
            lg:border-b-0
            lg:border-r
            border-slate-200
          "
              >

                {/* Glow */}
                <div className="
            absolute
            top-0
            right-0
            w-72
            h-72
            bg-primary/5
            blur-[100px]
            rounded-full
          " />

                <div className="relative z-10">

                  <div className="
              inline-flex
              rounded-none
              bg-blue-50
              px-3
              py-1
              caption-scale
              font-bold
              uppercase
              tracking-widest
              text-primary
            ">
                    Premium Membership
                  </div>

                  <div className="mt-10 flex items-end gap-2">
                    <span className="
                h1-scale
                text-slate-900
              ">
                      ₹199
                    </span>

                    <span className="
                small-scale
                text-slate-500
                mb-2
              ">
                      /month
                    </span>
                  </div>

                  <div className="
              mt-3
              inline-flex
              rounded-none
              border
              border-slate-200
              px-3
              py-1
              small-scale
              font-medium
              text-slate-500
            ">
                    or ₹999 / year
                  </div>

                  <p className="
              mt-6
              small-scale
              text-slate-600
              max-w-md
            ">
                    Borrow from premium inventory,
                    unlock intelligent recommendations,
                    and access the peer-to-peer lane
                    with priority routing.
                  </p>

                  {/* Features */}
                  <div className="mt-10 space-y-5">

                    {[
                      "Unlimited smart discovery",
                      "Priority campus routing",
                      "Extended borrowing windows",
                      "Premium community access",
                    ].map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-4"
                      >
                        <div className="
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-none
                    bg-primary/10
                  ">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>

                        <span className="text-slate-600 small-scale font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href="/sign-in"
                    className="
                mt-10
                inline-flex
                items-center
                gap-2
                rounded-none
                bg-primary
                px-6
                py-3
                small-scale
                font-semibold
                text-white
                shadow-md
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-blue-700
              "
                  >
                    Start Membership
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                </div>
              </motion.div>

              {/* RIGHT PLAN */}
              <motion.div
                variants={fadeUp}
                className="
            relative
            overflow-hidden
            p-8
            md:p-10
            bg-gradient-to-b
            from-white
            to-slate-50
          "
              >

                <div className="relative z-10">

                  <div className="
              inline-flex
              rounded-none
              bg-orange-50
              px-3
              py-1
              caption-scale
              font-bold
              uppercase
              tracking-widest
              text-orange-600
            ">
                    Retail & Peer-to-Peer
                  </div>

                  <h3 className="
              mt-10
              h3-scale
              text-slate-900
            ">
                    Pay per title.
                    <br />
                    No subscription.
                  </h3>

                  <p className="
              mt-6
              small-scale
              text-slate-600
              max-w-md
            ">
                    Buy, exchange, or resell books directly.
                    Keep transactions local, secure,
                    and connected to trusted campus hubs.
                  </p>

                  {/* Visual Stats */}
                  <div className="
              mt-12
              grid
              grid-cols-2
              gap-5
            ">

                    {[
                      {
                        value: "0%",
                        label: "Forced Lock-in",
                      },
                      {
                        value: "24h",
                        label: "Avg Transfer Time",
                      },
                      {
                        value: "100%",
                        label: "Verified Exchanges",
                      },
                      {
                        value: "50+",
                        label: "Connected Hubs",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="
                    rounded-none
                    border
                    border-slate-200/60
                    bg-white
                    p-5
                  "
                      >
                        <div className="
                    h2-scale
                    text-slate-900
                  ">
                          {item.value}
                        </div>

                        <div className="
                    mt-2
                    small-scale
                    text-slate-500
                  ">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Secondary CTA */}
                  <Link
                    href="/marketplace"
                    className="
                mt-10
                inline-flex
                items-center
                gap-2
                rounded-md
                border
                border-slate-200
                bg-white
                px-6
                py-3
                small-scale
                font-semibold
                text-slate-900
                transition-all
                duration-300
                hover:border-slate-300
                hover:bg-slate-50
              "
                  >
                    Explore Marketplace
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                </div>
              </motion.div>
            </div>

          </motion.div>
        </Container>
      </section>
      {/* PREMIUM FAQ SECTION */}
      <section className="relative overflow-hidden bg-[#FAFAFA] py-16 md:py-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8"
        >
          {/* Heading */}
          <motion.div
            variants={fadeUp}
            className="max-w-5xl mx-auto text-center mb-16"
          >
            <h2 className="
          font-[var(--font-display)]
          h1-scale
          text-slate-900
        ">
              Frequently Asked Questions
            </h2>

            <p
              className="
      mx-auto mt-4 max-w-2xl
      body-scale text-slate-500
    "
            >
              Everything you need to know about the Neeve ecosystem,
              campus hubs, premium memberships, and smart discovery.
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            variants={fadeUp}
            className="mx-auto w-full max-w-5xl"
          >
            <Accordion
              type="single"
              collapsible
              className="border-t border-slate-200"
            >
              {[
                {
                  q: "Is Neeve a college or a university?",
                  a: "Neeve is a technology and logistics ecosystem designed to modernize access to books and knowledge through connected campus hubs.",
                },
                {
                  q: "What happens if a book isn't available nearby?",
                  a: "Our routing engine intelligently searches connected hubs and partner inventory to locate and transfer books efficiently.",
                },
                {
                  q: "How do campus hubs work?",
                  a: "Partner colleges provide trusted pickup spaces where students can borrow, exchange, reserve, and return books seamlessly.",
                },
                {
                  q: "Can students exchange books directly?",
                  a: "Yes. Neeve supports secure peer-to-peer exchanges through verified campus networks and managed handoff systems.",
                },
                {
                  q: "What does Premium membership include?",
                  a: "Premium unlocks advanced analytics, extended borrowing periods, priority discovery access, and curated reading experiences.",
                },
              ].map((item, i) => (
                <AccordionItem
                  key={String(i)}
                  value={`item-${i}`}
                  className="border-b border-slate-200"
                >
                  <AccordionTrigger
                    className="
            group
            px-0 py-4
            transition-all duration-300
            hover:no-underline
            md:py-5
          "
                  >
                    <div className="flex w-full items-center justify-between gap-4">
                      <h3
                        className="
                text-left
                h3-scale
                text-slate-900
                transition-colors duration-300
                group-hover:text-primary
              "
                      >
                        {item.q}
                      </h3>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent
                    className="
            pb-5 pr-8
            small-scale text-slate-500
            md:pb-6 md:pr-16
          "
                  >
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </section>

      {/* PREMIUM FINAL CTA */}
      <section className="relative overflow-hidden py-16 md:py-20 bg-[#07111F]">

        {/* Ambient Background */}
        <div className="
    absolute
    inset-0
    bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.22)_0%,transparent_45%)]
  " />

        <div className="
    absolute
    top-0
    left-1/2
    -translate-x-1/2
    w-[900px]
    h-[500px]
    bg-blue-500/20
    blur-[140px]
    rounded-full
    pointer-events-none
  " />

        <div className="
    absolute
    bottom-0
    right-0
    w-[500px]
    h-[500px]
    bg-cyan-400/10
    blur-[120px]
    rounded-full
    pointer-events-none
  " />

        {/* Noise Texture */}
        <div className="
    absolute
    inset-0
    opacity-[0.03]
    mix-blend-soft-light
    bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgMjAwIDIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSdub2lzZUZpbHRlcic+PGZlVHVyYnVsZW5jZSB0eXBlPSdmcmFjdGFsTm9pc2UnIGJhc2VGcmVxdWVuY3k9JzAuNjUnIG51bU9jdGF2ZXM9JzMnIHN0aXRjaFRpbGVzPSdzdGl0Y2gnLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWx0ZXI9J3VybCgjbm9pc2VGaWx0ZXIpJy8+PC9zdmc+')]
  " />

        <Container className="relative z-10">

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="max-w-6xl mx-auto text-center"
          >

            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              className="
          inline-flex
          items-center
          gap-2
          rounded-none
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          px-4
          py-1.5
          small-scale
          font-semibold
          tracking-wide
          text-blue-100
          mb-8
        "
            >
              <div className="h-2 w-2 rounded-none bg-blue-400 animate-pulse" />
              Trusted by modern student communities
            </motion.div>
            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              className="
    mx-auto
    max-w-4xl
    font-[var(--font-display)]
    hero-title
    text-white
  "
            >
              Upgrade the way students
              <br className="hidden md:block" />
              discover and share books.
            </motion.h2>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              className="
          mt-6
          max-w-2xl
          mx-auto
          small-scale
          text-slate-300
        "
            >
              Join the premium campus reading ecosystem built
              for faster access, lower semester costs,
              and intelligent discovery across connected libraries.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={stagger}
              className="
          mt-10
          flex
          flex-col
          sm:flex-row
          items-center
          justify-center
          gap-4
        "
            >

              {/* Primary */}
              <motion.div variants={fadeUp}>
                <Link
                  href="/sign-in"
                  className="
              group
              inline-flex
              items-center
              gap-2
              rounded-none
              bg-white
              px-6
              py-3
              small-scale
              font-bold
              text-slate-900
              shadow-lg
              transition-all
              duration-300
              hover:scale-105
              hover:bg-blue-50
            "
                >
                  Get Started Free

                  <div className="
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded-none
              bg-slate-900
              text-white
              transition-transform
              duration-300
              group-hover:translate-x-1
            ">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </motion.div>

              {/* Secondary */}
              <motion.div variants={fadeUp}>
                <Link
                  href="/about"
                  className="
              inline-flex
              items-center
              gap-2
              rounded-none
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              px-6
              py-3
              small-scale
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-white/10
            "
                >
                  Explore Ecosystem
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

    </div>
  );
}
