import { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Building2, CheckCircle2, Handshake, MapPin, ScanLine, ShieldCheck, Users, Zap, MessageSquare, ChevronDown, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/home/Container";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const PAGE_TITLE = "Partner with Neev | Campus library hubs & textbook network";
const PAGE_DESCRIPTION =
  "Partner colleges run Neev study hubs with zero upfront capex: MoU-led pilots, upgraded library space, desk operations, and one app for borrowing, peer-to-peer exchanges, and retail pickup across India.";

const viewportOnce = { once: true, margin: "-20px", amount: 0.1 } as const;

const PILOT_STEPS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Handshake,
    title: "MoU and success criteria",
    body: "Single-hub pilot, roles, data handling, and what a green light means before adding capacity.",
  },
  {
    icon: Building2,
    title: "Space upgrade and desk design",
    body: "Shelving, signage, and handoff zone co-built with facilities and library leadership.",
  },
  {
    icon: MapPin,
    title: "Go live in the app",
    body: "Your hub appears in routing. Students see stock, membership, and pickup slots like at other nodes.",
  },
  {
    icon: ScanLine,
    title: "Operate and review",
    body: "Staff workflows for intake, pickup, and exceptions, then a joint review before expanding the footprint.",
  },
];

function useCollegesSeo() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = PAGE_TITLE;

    const headNodes: HTMLElement[] = [];
    const appendMeta = (attrs: Record<string, string>) => {
      const el = document.createElement("meta");
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      el.setAttribute("data-neev-page", "colleges");
      document.head.appendChild(el);
      headNodes.push(el);
    };

    appendMeta({ name: "description", content: PAGE_DESCRIPTION });
    appendMeta({ property: "og:title", content: PAGE_TITLE });
    appendMeta({ property: "og:description", content: PAGE_DESCRIPTION });
    appendMeta({ property: "og:type", content: "website" });

    const path = "/colleges";
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    if (origin) {
      appendMeta({ property: "og:url", content: `${origin}${path}` });
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: origin ? `${origin}${path}` : undefined,
      isPartOf: {
        "@type": "WebSite",
        name: "Neev",
        description: "B2B2C library network for affordable textbooks and campus study hubs.",
      },
      about: {
        "@type": "EducationalOrganization",
        name: "Neev partner college library hub program",
        description: PAGE_DESCRIPTION,
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-neev-page", "colleges");
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    headNodes.push(script);

    return () => {
      document.title = previousTitle;
      headNodes.forEach((n) => n.remove());
    };
  }, []);
}

export default function Colleges() {
  useCollegesSeo();
  const reduceMotion = useReducedMotion();
  const [partnerDialogOpen, setPartnerDialogOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const { scrollYProgress: flowProgress } = useScroll({
    target: flowRef,
    offset: ["start center", "end center"]
  });

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

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thanks. We will reach out within two business days.");
    setPartnerDialogOpen(false);
  };

  return (
    <>
      <Dialog open={partnerDialogOpen} onOpenChange={setPartnerDialogOpen}>
        <DialogContent className="w-[calc(100%-32px)] sm:w-full max-h-[min(90vh,760px)] max-w-[440px] gap-0 overflow-y-auto rounded-none p-0">
          <div className="px-6 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-11">
            <DialogHeader className="space-y-3 text-left">
              <p className="caption-scale font-bold uppercase tracking-[0.22em] text-[#64748B]">
                Partner colleges
              </p>
              <DialogTitle className="font-[var(--font-display)] h3-scale font-extrabold leading-tight tracking-tight text-foreground sm:text-[1.65rem]">
                Pilot a hub with Neev
              </DialogTitle>
              <DialogDescription className="body-scale leading-relaxed text-[#64748B]">
                Share a few details. Our partnerships team typically responds within two business days.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handlePartnerSubmit} className="mt-8 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="collegeName" className="text-foreground small-scale">
                  Institution name
                </Label>
                <Input
                  id="collegeName"
                  name="institution"
                  placeholder="City Institute of Technology"
                  required
                  autoComplete="organization"
                  className="h-11 rounded-none border-border bg-background focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactName" className="text-foreground small-scale">
                  Your name
                </Label>
                <Input
                  id="contactName"
                  name="name"
                  placeholder="Dr. Ananya Rao"
                  required
                  autoComplete="name"
                  className="h-11 rounded-none border-border bg-background focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-foreground small-scale">
                  Job role / title
                </Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  placeholder="Library Director"
                  required
                  autoComplete="organization-title"
                  className="h-11 rounded-none border-border bg-background focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground small-scale">
                  Work email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@college.edu"
                  required
                  autoComplete="email"
                  className="h-11 rounded-none border-border bg-background focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city" className="text-foreground small-scale">
                  City and state
                </Label>
                <Input
                  id="city"
                  name="cityState"
                  placeholder="Bengaluru, Karnataka"
                  required
                  autoComplete="address-level2"
                  className="h-11 rounded-none border-border bg-background focus-visible:ring-primary"
                />
              </div>
              <Button type="submit" className="mt-2 h-11 w-full rounded-none font-bold small-scale">
                Submit
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
            <source src="/90933-629483642.mp4" type="video/mp4" />
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
        <section id="hero-content" ref={heroRef} className="relative py-20 md:py-32 bg-white">
          <Container className="relative z-10 px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

              {/* Left Column: Typography & CTA */}
              <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-2xl">
                <motion.div variants={fadeUp}>
                  <div className="inline-flex items-center gap-2 rounded-none border border-blue-100 bg-blue-50 px-4 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-primary shadow-sm mb-8">
                    <span>Institutional Partnerships</span>
                  </div>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  className="mt-4 text-balance font-[var(--font-display)] hero-title font-bold text-slate-900"
                >
                  Upgrade library space into a <span className="text-primary">Neev study hub.</span>
                </motion.h1>

                <motion.p variants={fadeUp} className="mt-6 body-scale text-slate-600 max-w-xl">
                  Start with zero upfront capex. We align on space, traffic, and operations, then scale when your institution is ready.
                </motion.p>

                <motion.div variants={stagger} className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <motion.div variants={fadeUp} className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      onClick={() => setPartnerDialogOpen(true)}
                      className="magnetic-btn flex w-full items-center justify-center gap-2 rounded-none bg-primary px-10 h-16 small-scale font-bold text-white shadow-md transition-all hover:bg-blue-700 hover:-translate-y-0.5"
                    >
                      Schedule a Conversation <ArrowRight className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                className="relative block mt-12 lg:mt-0 h-[450px] sm:h-[550px] w-full perspective-1000"
                style={{ y: yParallax, opacity: opacityParallax }}
              >
                <div className="absolute top-[10%] right-[10%] left-[10%] lg:left-auto w-auto lg:w-[380px] h-auto lg:h-[450px] overflow-hidden rounded-none border border-slate-200 bg-white shadow-2xl">
                  <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Pilot Checklist</p>
                    <p className="mt-1 h3-scale font-bold text-slate-900">Go-live alignment</p>
                  </div>
                  <ul className="divide-y divide-slate-100 bg-white">
                    {[
                      "Space audit: shelving & flow",
                      "Traffic & term calendar",
                      "Inventory & handoff rules",
                      "MoU scope & success gates",
                    ].map((line, i) => (
                      <li key={i} className="flex gap-4 px-6 py-4 items-center">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                        <span className="small-scale text-slate-600 font-medium">{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        <section className="py-24 bg-white border-y border-slate-100 overflow-hidden">
          <Container>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.18,
                  },
                },
              }}
            >
              {/* Center Heading */}
              <motion.div
                variants={fadeUp}
                className="max-w-4xl mx-auto text-center mb-20"
              >
                <div className="inline-flex items-center gap-2 rounded-none border border-blue-100 bg-blue-50 px-4 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-primary shadow-sm mb-8">
                  Why Partner
                </div>


                <motion.h2
                  variants={fadeUp}
                  className="mt-8 font-[var(--font-display)] text-slate-900"
                >
                  <h2 className="h2-scale">
                    Turn Library Foot Traffic Into Student Engagement
                  </h2>
                </motion.h2>

                <p className="text-[1.05rem] md:text-[1.12rem] leading-[1.9] text-slate-600 max-w-2xl mx-auto mt-10">
                  Neev helps libraries transform unused areas into modern discovery and
                  pickup hubs with streamlined desk workflows and accountable handoffs.
                </p>
              </motion.div>

              {/* Reveal Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                {[
                  {
                    accent: "bg-primary",
                    icon: StarIcon,
                    title: "Physical experience",
                    body: "Refresh underused stacks and desk workflows so the library feels current.",
                  },
                  {
                    accent: "bg-primary",
                    icon: Users,
                    title: "Modern student flow",
                    body: "App-based discovery and desk handoff match retail expectations.",
                  },
                  {
                    accent: "bg-primary",
                    icon: ShieldCheck,
                    title: "Traceable handoffs",
                    body: "Desk-assisted pickup ensures condition and accountability stay visible.",
                  },
                ].map((item, index) => (
                  <motion.article
                    key={item.title}
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 80,
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.7,
                          ease: [0.22, 1, 0.36, 1],
                          delay: index * 0.1,
                        },
                      },
                    }}
                    className="group relative bg-white border border-slate-200 px-8 py-10 md:py-12 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                  >
                    {/* Glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Accent */}
                    <div
                      className={`mb-8 h-[3px] w-14 ${item.accent}`}
                      aria-hidden
                    />

                    {/* Icon */}
                    <div className="mb-6 flex h-12 w-12 items-center justify-center text-slate-700">
                      <item.icon className="h-5 w-5" strokeWidth={1.6} />
                    </div>

                    {/* Title */}
                    <h3 className="text-[1.2rem] md:text-[1.3rem] font-bold tracking-[-0.03em] text-slate-900 mb-5 leading-snug">
                      {item.title}
                    </h3>

                    {/* Body */}
                    <p className="text-[0.93rem] md:text-[0.98rem] uppercase tracking-[0.12em] leading-[1.9] text-slate-500">
                      {item.body}
                    </p>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </Container>
        </section>

        <section className="relative overflow-hidden bg-[#FAFAFA] py-20 md:py-32">
          <Container>
            {/* TOP HEADER */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mx-auto max-w-5xl text-center"
            >
              <motion.div variants={fadeUp}>
                <div className="inline-flex items-center gap-2 rounded-none border border-blue-100 bg-blue-50 px-4 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-primary shadow-sm mb-8">
                  Pilot Process
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-8 font-[var(--font-display)] text-slate-900"
              >
                <h2 className="h2-scale"> From MoU to first desk day.</h2>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="mx-auto mt-8 max-w-3xl body-scale text-slate-600"
              >
                Legal scope, physical upgrade, training,
                and launch operations aligned into one
                structured institutional rollout.
              </motion.p>
            </motion.div>

            {/* FLOW SECTION */}
            <div ref={flowRef} className="relative mx-auto mt-20 md:mt-28 max-w-7xl">
              {/* Mobile background line */}
              <div className="absolute left-[60px] top-0 h-full w-px bg-slate-100 lg:hidden" />

              {/* Mobile progress line */}
              <motion.div
                className="absolute left-[60px] top-0 h-full w-px bg-primary lg:hidden z-10"
                style={{
                  scaleY: flowProgress,
                  originY: 0
                }}
              />

              {/* FLOW LINES CONTAINER */}
              <div className="absolute left-0 top-[60px] hidden w-full lg:block">
                {/* BG LINE */}
                <div className="h-[2px] w-full bg-slate-200" />

                {/* ANIMATED FLOW LINE */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: hoveredIdx !== null ? (hoveredIdx * 0.25 + 0.125) : 1
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="absolute left-0 top-0 h-[2px] w-full origin-left bg-primary"
                />
              </div>

              <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">

                {PILOT_STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  const isHovered = hoveredIdx === idx;
                  const isPast = hoveredIdx !== null && idx < hoveredIdx;

                  return (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.7,
                        delay: idx * 0.08,
                      }}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      className="relative flex flex-col lg:items-center"
                    >

                      {/* CONNECTOR DOT */}
                      <motion.div
                        animate={{
                          backgroundColor: (isHovered || isPast || hoveredIdx === null) ? "var(--primary)" : "#E2E8F0",
                          scale: isHovered ? 1.2 : 1
                        }}
                        className="absolute left-1/2 top-[52px] z-20 hidden h-4 w-4 -translate-x-1/2 rounded-none border-2 border-white bg-slate-200 shadow-md lg:block"
                      />

                      {/* STEP NUMBER */}
                      <motion.div
                        animate={{
                          borderColor:
                            (isHovered || isPast || hoveredIdx === null)
                              ? "var(--primary)"
                              : "#E2E8F0",
                          backgroundColor: isHovered ? "var(--primary)" : "#FFFFFF",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        className="
    relative
    z-30
    mx-0
    lg:mx-auto
    flex
    h-[70px]
    w-[70px]
    lg:h-[92px]
    lg:w-[92px]
    items-center
    justify-center
    rounded-none
    border-[3px]
    border-slate-200
    bg-white
    shadow-md
    ml-[20px]
    lg:ml-auto
  "
                      >
                        <span
                          className={`
      text-[24px]
      lg:text-[34px]
      font-black
      tracking-[-0.05em]
      transition-colors
      duration-300
      ${isHovered ? "text-white" : "text-primary"}
    `}
                        >
                          {(idx + 1).toString().padStart(2, "0")}
                        </span>
                      </motion.div>

                      {/* CARD */}
                      <motion.div
                        animate={{
                          y: isHovered ? -12 : 0,
                          borderColor: isHovered ? "var(--primary)" : "#E2E8F0",
                          backgroundColor: isHovered ? "var(--primary)" : "#FFFFFF"
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 18,
                        }}
                        className={`
                          group
                          relative
                          mt-6 lg:mt-10
                          flex
                          flex-1
                          flex-col
                          overflow-hidden
                          rounded-none
                          border
                          p-8
                          shadow-sm
                          transition-shadow
                          duration-500
                          ml-[40px] lg:ml-0
                          ${isHovered ? "shadow-2xl" : "hover:shadow-md"}
                        `}
                      >

                        {/* ICON */}
                        <div
                          className={`
                            mb-6
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-none
                            transition-all
                            duration-500
                          `}
                        >
                          <Icon className="h-7 w-7" strokeWidth={1.5} />
                        </div>
                        {/* TITLE */}
                        <h3
                          className={`
                            mt-4
                            h3-scale
                            font-[var(--font-display)]
                            font-bold
                            transition-colors
                            duration-500
                            ${isHovered ? "text-white" : "text-slate-900"}
                          `}
                        >
                          {step.title}
                        </h3>

                        {/* BODY */}
                        <p
                          className={`
                            mt-5
                            body-scale
                            transition-colors
                            duration-500
                            ${isHovered ? "text-white/80" : "text-slate-600"}
                          `}
                        >
                          {step.body}
                        </p>

                        {/* GLOW */}
                        <div className={`absolute bottom-0 right-0 h-32 w-32 rounded-full bg-white/10 blur-3xl opacity-0 transition-opacity duration-500 ${isHovered ? "opacity-100" : ""}`} />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Container>
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
                Ready to talk about one pilot hub?
              </h2>
              <p className="body-scale text-white/80 mb-12 max-w-2xl mx-auto">
                We walk through space, staffing, and timelines, and only scale when your institution is comfortable.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Button
                  size="lg"
                  onClick={() => setPartnerDialogOpen(true)}
                  className="bg-white text-primary hover:bg-slate-50 h-16 px-10 rounded-none font-bold small-scale transition-all hover:-translate-y-1 shadow-xl"
                >
                  Schedule a Conversation
                  <span>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 bg-white/10 text-white hover:bg-white/20 h-16 px-10 rounded-none font-bold small-scale backdrop-blur-md transition-all hover:-translate-y-1"
                  >
                    Learn More About Neev
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
