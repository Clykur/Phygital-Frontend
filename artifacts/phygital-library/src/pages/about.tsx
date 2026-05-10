import { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BookOpen, MapPin, MessageSquare, Network, Users, Sparkles, Zap, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/home/Container";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import type { LucideIcon } from "lucide-react";

const PAGE_TITLE = "About Neev | Campus library network and affordable textbooks";
const PAGE_DESCRIPTION =
  "Neev connects partner college libraries into one network: study hubs for borrowing, peer exchanges, and retail pickup so students spend less on textbooks without relying on shipping-only marketplaces.";

const viewportOnce = { once: true, margin: "-20px", amount: 0.1 } as const;

const CORE_STEPS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: BookOpen,
    title: "Discovery",
    body: "Search titles, nearby hubs, and peer listings from one connected system.",
  },
  {
    icon: Network,
    title: "Routing",
    body: "Find the nearest available copy before expanding fulfillment paths.",
  },
  {
    icon: MapPin,
    title: "Pickup Hubs",
    body: "Collect books through trusted staffed campus desks and study hubs.",
  },
  {
    icon: Users,
    title: "Peer & Retail",
    body: "Exchange or purchase books with traceable desk-assisted handoff.",
  },
];

const VALUES = [
  {
    accent: "bg-primary",
    title: "Access over ownership",
    body: "Borrowing and reuse should be viable for a semester without forcing a full retail purchase every time.",
    color: "bg-primary"
  },
  {
    accent: "bg-primary",
    title: "Reuse, not waste",
    body: "Longer book life across readers cuts spend and clutter versus single-use buying patterns.",
    color: "bg-primary"
  },
  {
    accent: "bg-primary",
    title: "Fast, reliable desk paths",
    body: "Search to pickup should feel obvious: clear status, predictable hours, and staff-visible handoffs.",
    color: "bg-primary"
  },
  {
    accent: "bg-primary",
    title: "Peers with guardrails",
    body: "Student listings work best when the hub helps verify pickup and settle fees responsibly.",
    color: "bg-primary"
  },
];

function useAboutSeo() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = PAGE_TITLE;

    const headNodes: HTMLElement[] = [];
    const appendMeta = (attrs: Record<string, string>) => {
      const el = document.createElement("meta");
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      el.setAttribute("data-neev-page", "about");
      document.head.appendChild(el);
      headNodes.push(el);
    };

    appendMeta({ name: "description", content: PAGE_DESCRIPTION });
    appendMeta({ property: "og:title", content: PAGE_TITLE });
    appendMeta({ property: "og:description", content: PAGE_DESCRIPTION });
    appendMeta({ property: "og:type", content: "website" });

    const path = "/about";
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    if (origin) {
      appendMeta({ property: "og:url", content: `${origin}${path}` });
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: origin ? `${origin}${path}` : undefined,
      mainEntity: {
        "@type": "Organization",
        name: "Neev",
        description: PAGE_DESCRIPTION,
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-neev-page", "about");
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    headNodes.push(script);

    return () => {
      document.title = previousTitle;
      headNodes.forEach((n) => n.remove());
    };
  }, []);
}

export default function About() {
  useAboutSeo();
  const reduceMotion = useReducedMotion();
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeValueIndex, setActiveValueIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const infraRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: infraProgress } = useScroll({
    target: infraRef,
    offset: ["start center", "end center"]
  });

  const { scrollYProgress: valuesScrollY } = useScroll({
    target: valuesRef,
    offset: ["start start", "end end"]
  });

  const activeCardValue = useTransform(valuesScrollY, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 3]);

  useEffect(() => {
    return activeCardValue.on("change", (latest) => {
      setActiveValueIndex(Math.floor(latest));
    });
  }, [activeCardValue]);

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.8], [1, 0]);



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

  const card = "bento-card border border-blue-100 bg-white p-6 md:p-8 rounded-none transition-all hover:shadow-lg hover:-translate-y-1";

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thanks. We will get back to you shortly.");
    setContactDialogOpen(false);
  };

  return (
    <>
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="w-[calc(100%-32px)] sm:w-full max-h-[min(90vh,720px)] max-w-[440px] gap-0 overflow-y-auto rounded-none p-0">
          <div className="px-6 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-11">
            <DialogHeader className="space-y-3 text-left">
              <p className="text-xs tracking-[0.2em] font-bold uppercase text-[#64748B]">Get in touch</p>
              <DialogTitle className="font-[var(--font-display)] text-xl md:text-2xl font-extrabold leading-tight tracking-tight text-foreground">
                Contact Neev
              </DialogTitle>
              <DialogDescription className="text-base md:text-lg leading-relaxed text-[#64748B]">
                We typically reply within one to two business days.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleContactSubmit} className="mt-8 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contactName" className="text-foreground text-xs tracking-[0.2em]">
                  Name
                </Label>
                <Input
                  id="contactName"
                  name="name"
                  placeholder="Your name"
                  required
                  autoComplete="name"
                  className="h-11 rounded-none border-border bg-background focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail" className="text-foreground text-xs tracking-[0.2em]">
                  Email
                </Label>
                <Input
                  id="contactEmail"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="h-11 rounded-none border-border bg-background focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactMessage" className="text-foreground text-xs tracking-[0.2em]">
                  Message
                </Label>
                <Textarea
                  id="contactMessage"
                  name="message"
                  placeholder="How can we help?"
                  rows={4}
                  required
                  className="min-h-[7.5rem] resize-none rounded-none border-border bg-background focus-visible:ring-primary"
                />
              </div>
              <Button type="submit" className="mt-2 h-11 w-full rounded-none font-bold text-sm md:text-base">
                Send message
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <div className="w-full bg-[#FAFAFA] font-sans selection:bg-primary/20 selection:text-primary">
        {/* 1. HERO VIDEO SECTION */}
        <section id="hero-video" className="relative h-[100dvh] w-full overflow-hidden bg-slate-900">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/12993317-hd_1920_1080_30fps.mp4" type="video/mp4" />
          </video>
          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 10 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Scroll to explore</span>
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </section>

        {/* 2. HERO CONTENT SECTION */}
        <section id="hero-content" ref={heroRef} className="relative py-20 md:py-36 bg-white overflow-hidden">
          {/* Subtle Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl pointer-events-none opacity-40">
            <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
            <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-primary/10 blur-[120px] rounded-full" />
          </div>

          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div variants={stagger} initial="hidden" animate="visible">
                <motion.div variants={fadeUp}>
                  <div className="inline-flex items-center gap-2 rounded-none border border-blue-100 bg-blue-50 px-4 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-primary shadow-sm mb-8">
                    <span>Redefining Campus Libraries</span>
                  </div>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  className="text-balance font-[var(--font-display)] hero-title font-bold text-slate-900"
                >
                  {"Affordable textbooks through ".split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{
                        opacity: 1,
                        y: [40, -15, 0],
                      }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.08,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="inline-block mr-[0.25em]"
                    >
                      {word}
                    </motion.span>
                  ))}
                  {"partner study hubs.".split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{
                        opacity: 1,
                        y: [40, -15, 0],
                      }}
                      transition={{
                        duration: 0.8,
                        delay: 0.32 + (i * 0.08),
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="text-primary italic inline-block mr-[0.25em]"
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="mt-8 body-scale text-slate-600 max-w-2xl mx-auto leading-relaxed"
                >
                  Neev builds the physical and software layer so borrowing, peer exchanges, and retail pickup stay local, traceable, and grounded in campus life.
                </motion.p>

                <motion.div variants={stagger} className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-6">
                  <motion.div variants={fadeUp} className="w-full sm:w-auto">
                    <Link href="/marketplace" className="magnetic-btn flex w-full items-center justify-center gap-2 rounded-none bg-primary px-12 h-16 text-base md:text-lg font-bold text-white shadow-xl transition-all hover:bg-blue-700 hover:-translate-y-1">
                      Browse Marketplace <ArrowRight className="h-5 w-5" />
                    </Link>
                  </motion.div>
                  <motion.div variants={fadeUp} className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      onClick={() => setContactDialogOpen(true)}
                      className="magnetic-btn flex w-full items-center justify-center gap-2 rounded-none border-2 border-slate-200 bg-transparent px-12 h-16 text-base md:text-lg font-bold text-slate-900 transition-all hover:bg-slate-50 hover:-translate-y-1"
                    >
                      <MessageSquare className="h-5 w-5" />
                      Contact Us
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </Container>
        </section>

        <section className="overflow-hidden border-y border-slate-100 bg-white py-24">
          <Container>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                {/* Left Side */}
                <motion.div
                  variants={fadeUp}
                  className="mt-2"
                >
                  <div className="inline-flex items-center gap-2 rounded-none border border-blue-100 bg-blue-50 px-4 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-primary shadow-sm mb-8">
                    Our Mission
                  </div>

                  <motion.div
                    variants={fadeUp}
                    className="mt-8 font-[var(--font-display)] text-slate-900"
                  >
                    <h2 className="h2-scale">
                      Lower out of pocket spend, longer book life.
                    </h2>
                  </motion.div>
                </motion.div>

                {/* Right Side */}
                <motion.div variants={fadeUp} className="max-w-2xl">
                  <p className="text-lg md:text-xl leading-[1.9] text-slate-600">
                    Neev is not a university. We partner with colleges to run
                    upgraded library-adjacent hubs and software so discovery,
                    routing, and desk handoff live in one place.
                  </p>

                  <p className="mt-8 text-lg md:text-xl leading-[1.9] text-slate-600">
                    The goal is predictable access and reuse without forcing every
                    transaction into the same shape. Students get affordable access,
                    campuses reduce waste, and local study hubs become part of the
                    academic infrastructure.
                  </p>
                </motion.div>

              </div>
            </motion.div>
          </Container>
        </section>

        <section
          ref={infraRef}
          className="relative overflow-hidden bg-[#FAFAFA] py-20 md:py-24"
        >
          <Container>
            {/* HEADER */}
            <div className="mx-auto mb-16 md:mb-20 max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
              >
                <div className="inline-flex items-center gap-2 rounded-none border border-blue-100 bg-blue-50 px-4 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-primary shadow-sm mb-8">
                  Core Infrastructure
                </div>

                <motion.div
                  variants={fadeUp}
                  className="mt-6 font-[var(--font-display)] text-slate-900"
                >
                  <h2 className="h2-scale">
                    Hubs, routing, and peer flows in one network.
                  </h2>
                </motion.div>

                <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-8 text-slate-600">
                  Each partner site acts as a physical node connecting
                  discovery, routing, pickup, and peer exchange together.
                </p>
              </motion.div>
            </div>

            {/* TIMELINE */}
            <div className="relative mx-auto max-w-5xl">

              {/* background line */}
              <div className="absolute left-5 top-0 h-full w-px bg-slate-200 md:left-1/2 md:-translate-x-1/2" />

              {/* progress line */}
              <motion.div
                className="absolute left-5 top-0 z-10 w-[2px] bg-primary md:left-1/2 md:-translate-x-1/2"
                style={{
                  scaleY: infraProgress,
                  originY: 0,
                  height: "100%",
                }}
              />

              <div className="space-y-10 md:space-y-14">
                {CORE_STEPS.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    viewport={{ once: true, margin: "-40px" }}
                    className={`
              relative
              flex
              w-full
              ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"}
            `}
                  >

                    {/* node */}
                    <div className="absolute left-5 top-8 z-20 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white bg-primary shadow-md md:block md:left-1/2" />

                    {/* CARD */}
                    <div
                      className={`
                group
                relative
                w-full
                md:w-[44%]
                overflow-hidden
                border
                border-slate-200
                bg-white
                p-6
                md:p-8
                shadow-sm
                transition-all
                duration-500
                hover:-translate-y-1
                hover:shadow-xl

                ml-12
                md:ml-0
              `}
                    >
                      {/* glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      <div className="relative z-10">

                        {/* icon */}
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-none">
                          <step.icon className="h-7 w-7 text-primary" />
                        </div>

                        {/* title */}
                        <h3 className="font-[var(--font-display)] text-xl md:text-2xl font-bold tracking-tight text-slate-900">
                          {step.title}
                        </h3>

                        {/* body */}
                        <p className="mt-4 text-base md:text-lg leading-relaxed text-slate-600">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section ref={valuesRef} className="relative h-[400vh] bg-white">
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
            {/* Blurred Radial Backgrounds */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative w-full max-w-4xl px-6">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                >
                  <div className="inline-flex items-center gap-2 rounded-none border border-blue-100 bg-blue-50 px-4 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-primary shadow-sm mb-8">
                    Our Values
                  </div>
                  <motion.div
                    variants={fadeUp}
                    className="mt-8 font-[var(--font-display)] text-slate-900"
                  >
                    <h2 className="h2-scale">
                      What guides the product.
                    </h2>
                  </motion.div>
                </motion.div>
              </div>

              <div className="relative h-[380px] w-full max-w-2xl mx-auto">
                {VALUES.map((card, index) => (
                  <motion.div
                    key={card.title}
                    className="absolute inset-0 bg-white rounded-none border border-slate-100 p-8 md:p-14 shadow-2xl flex flex-col justify-center"
                    initial={false}
                    animate={{
                      scale: activeValueIndex === index ? 1 : 0.94,
                      opacity: activeValueIndex === index ? 1 : 0,
                      y: activeValueIndex === index ? 0 : 40,
                      rotateX: activeValueIndex === index ? 0 : -5,
                    }}
                    style={{
                      zIndex: activeValueIndex === index ? 20 : 10,
                      pointerEvents: activeValueIndex === index ? "auto" : "none",
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <div className={`w-20 h-1.5 rounded-full mb-10 ${card.color}`} />

                    <h3 className="font-[var(--font-display)] text-xl md:text-2xl font-bold text-slate-900 tracking-tight mb-6">
                      {card.title}
                    </h3>

                    <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                      {card.body}
                    </p>

                    {/* Progress Indicator inside card */}
                    <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 flex gap-2">
                      {VALUES.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 rounded-full transition-all duration-300 ${activeValueIndex === i ? "w-8 bg-primary" : "w-1.5 bg-slate-200"
                            }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-primary py-24 md:py-32">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none" />

          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              className="relative z-10 max-w-4xl mx-auto text-center"
            >
              <h2 className="font-[var(--font-display)] h1-scale text-white mb-8">
                Want to collaborate?
              </h2>
              <p className="text-base md:text-lg text-white/80 mb-12 max-w-2xl mx-auto">
                Reach out for partnerships, campus questions, or reader support. Colleges can also start on the pilot path below.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Button
                  size="lg"
                  onClick={() => setContactDialogOpen(true)}
                  className="bg-white text-primary hover:bg-slate-50 h-16 px-10 rounded-none font-bold text-sm md:text-base transition-all hover:-translate-y-1 shadow-xl"
                >
                  Contact Us
                  <span>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>
                <Link href="/colleges">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 bg-white/10 text-white hover:bg-white/20 h-16 px-10 rounded-none font-bold text-sm md:text-base backdrop-blur-md transition-all hover:-translate-y-1"
                  >
                    Partner with Neev
                  </Button>
                </Link>
              </div>
            </motion.div>
          </Container>
        </section>
      </div>
    </>
  );
}
