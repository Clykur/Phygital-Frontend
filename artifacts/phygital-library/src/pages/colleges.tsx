import { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Building2, CheckCircle2, Handshake, MapPin, ScanLine, ShieldCheck, Sparkles, Users, Zap, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/home/Container";
import { Section } from "@/components/home/Section";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ImageCarousel } from "@/components/home/ImageCarousel";

const PAGE_TITLE = "Partner with Neeve | Campus library hubs & textbook network";
const PAGE_DESCRIPTION =
  "Partner colleges run Neeve study hubs with zero upfront capex: MoU-led pilots, upgraded library space, desk operations, and one app for borrowing, peer-to-peer exchanges, and retail pickup across India.";

const viewportOnce = { once: true, margin: "-80px", amount: 0.2 } as const;

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
      el.setAttribute("data-neeve-page", "colleges");
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
        name: "Neeve",
        description: "B2B2C library network for affordable textbooks and campus study hubs.",
      },
      about: {
        "@type": "EducationalOrganization",
        name: "Neeve partner college library hub program",
        description: PAGE_DESCRIPTION,
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-neeve-page", "colleges");
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
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const HERO_BG_IMAGES = [
    { src: "/images/community-hub.png", alt: "Collaborative Student Hub" },
    { src: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2000&auto=format&fit=crop", alt: "Academic Excellence" },
    { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop", alt: "Student Collaboration" },
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
              <p className="caption-scale font-semibold uppercase tracking-[0.22em] text-[#64748B]">
                Partner colleges
              </p>
              <DialogTitle className="font-[var(--font-display)] h3-scale font-extrabold leading-tight tracking-tight text-foreground sm:text-[1.65rem]">
                Pilot a hub with Neeve
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
              <Button type="submit" className="mt-2 h-11 w-full rounded-none font-semibold small-scale">
                Submit
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <div className="w-full bg-[#FAFAFA] font-sans selection:bg-primary/20 selection:text-primary">
        {/* 1. HERO SECTION */}
        <section id="hero" ref={heroRef} className="relative min-h-[90dvh] flex flex-col justify-center overflow-hidden bg-primary">
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
                    <Building2 className="h-3.5 w-3.5 fill-primary text-primary" />
                    <span>Institutional Partnerships</span>
                  </div>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  className="mt-8 text-balance font-[var(--font-display)] hero-title text-white"
                >
                  Upgrade library space into a <span className="text-blue-400">Neeve study hub.</span>
                </motion.h1>

                <motion.p variants={fadeUp} className="mt-6 body-scale text-slate-200 max-w-xl">
                  Start with zero upfront capex. We align on space, traffic, and operations, then scale when your institution is ready.
                </motion.p>

                <motion.div variants={stagger} className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                  <motion.div variants={fadeUp} className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      onClick={() => setPartnerDialogOpen(true)}
                      className="magnetic-btn flex w-full items-center justify-center gap-2 rounded-none bg-primary px-8 py-4 small-scale font-bold text-white shadow-md transition-all hover:bg-blue-700 hover:-translate-y-0.5 h-auto"
                    >
                      Schedule a Conversation <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Right Column: Floating Visuals */}
              <motion.div
                className="relative hidden lg:block h-[500px] w-full perspective-1000"
                style={{ y: yParallax, opacity: opacityParallax }}
              >
                <div className="absolute top-[10%] right-[10%] w-[380px] h-[450px] overflow-hidden rounded-none border border-white/20 bg-white shadow-2xl">
                  <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-5">
                    <p className="caption-scale font-bold uppercase tracking-wider text-slate-500">Pilot Checklist</p>
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
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                        <span className="small-scale text-slate-600 font-medium">{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-[10%] -left-[5%] bento-card p-4 flex items-center gap-3 w-[220px] z-20"
                >
                  <div className="h-10 w-10 rounded-none bg-emerald-50 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="caption-scale font-bold text-slate-500 uppercase tracking-wider">Zero Capex</p>
                    <p className="small-scale font-bold text-slate-900 leading-none">Instant Activation</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </Container>
        </section>

        <section className="py-20 bg-white border-y border-slate-100">
          <Container>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border border-slate-200 bg-slate-50/50 p-8 md:p-12 rounded-none relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="lg:col-span-5 relative z-10">
                  <div className="inline-flex items-center gap-2 rounded-none bg-blue-50 px-4 py-1.5 caption-scale font-bold uppercase tracking-widest text-primary mb-6">
                    Why Partner
                  </div>
                  <motion.h2
                    variants={fadeUp}
                    className="font-[var(--font-display)] h1-scale text-slate-900 text-balance mb-6"
                  >
                    Foot traffic, underused space, a modern desk experience.
                  </motion.h2>
                  <motion.p variants={fadeUp} className="body-scale text-slate-600 leading-relaxed">
                    Neeve is infrastructure. We help you turn library adjacency into a staffed hub for discovery, pickup, and accountable
                    peer exchanges, without a large capital project on day one.
                  </motion.p>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
                  {[
                    {
                      accent: "bg-primary",
                      icon: Sparkles,
                      title: "Physical experience",
                      body: "Refresh underused stacks and desk workflows so the library feels current.",
                    },
                    {
                      accent: "bg-emerald-500",
                      icon: Users,
                      title: "Modern student flow",
                      body: "App-based discovery and desk handoff match retail expectations.",
                    },
                    {
                      accent: "bg-orange-400",
                      icon: ShieldCheck,
                      title: "Traceable handoffs",
                      body: "Desk-assisted pickup ensures condition and accountability stay visible.",
                    },
                  ].map((item) => (
                    <motion.article key={item.title} variants={fadeUp} className="bg-white p-6 rounded-none border border-slate-100 shadow-sm transition-all hover:shadow-md">
                      <div className={`mb-6 h-1 w-12 rounded-none ${item.accent}`} aria-hidden />
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-none bg-slate-50 text-slate-600">
                        <item.icon className="h-5 w-5" strokeWidth={1.5} />
                      </div>
                      <h3 className="small-scale font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="caption-scale text-slate-500 leading-relaxed">{item.body}</p>
                    </motion.article>
                  ))}
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        <section className="py-24 bg-[#FAFAFA]">
          <Container>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="overflow-hidden rounded-none border border-slate-200 bg-white shadow-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-slate-100 bg-slate-50/50 p-8 md:p-12">
                <div className="lg:col-span-5">
                  <div className="inline-flex items-center gap-2 rounded-none bg-blue-50 px-4 py-1.5 caption-scale font-bold uppercase tracking-widest text-primary mb-6">
                    Pilot Process
                  </div>
                  <h2 className="font-[var(--font-display)] h1-scale text-slate-900 text-balance">
                    From MoU to first desk day.
                  </h2>
                </div>
                <div className="flex flex-col justify-center lg:col-span-7">
                  <p className="body-scale text-slate-600 leading-relaxed">
                    Legal scope, physical upgrade, training, then a controlled launch. Your gates for scale stay explicit from kickoff through
                    review.
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {PILOT_STEPS.map((step, idx) => {
                    const Icon = step.icon;
                    return (
                      <motion.div
                        key={step.title}
                        variants={fadeUp}
                        className="relative group"
                      >
                        <div className="mb-6 flex items-center gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-none border border-slate-200 bg-white text-lg font-bold tabular-nums text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                            {(idx + 1).toString().padStart(2, "0")}
                          </div>
                          <div className="h-px flex-1 bg-slate-100 hidden lg:block group-last:hidden" />
                        </div>
                        <div className="p-6 rounded-none border border-slate-100 bg-[#F8FAFC] transition-all hover:shadow-md hover:-translate-y-1">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="flex h-8 w-8 items-center justify-center rounded-none bg-white border border-slate-200 text-primary">
                              <Icon className="h-4 w-4" strokeWidth={1.5} />
                            </span>
                            <p className="caption-scale font-bold uppercase tracking-wider text-slate-400">Step {idx + 1}</p>
                          </div>
                          <h3 className="small-scale font-bold text-slate-900 mb-3">{step.title}</h3>
                          <p className="caption-scale text-slate-500 leading-relaxed">{step.body}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        <section className="py-24 bg-white border-t border-slate-100">
          <Container>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              className="rounded-none bg-slate-900 p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-400/10 blur-[80px] rounded-full pointer-events-none" />

              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="font-[var(--font-display)] hero-title text-white mb-8">
                  Ready to talk about one pilot hub?
                </h2>
                <p className="body-scale text-slate-400 mb-12">
                  We walk through space, staffing, and timelines, and only scale when your institution is comfortable.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <Button
                    size="lg"
                    onClick={() => setPartnerDialogOpen(true)}
                    className="bg-primary text-white hover:bg-blue-600 h-14 px-8 rounded-none font-bold small-scale transition-all hover:-translate-y-1 shadow-lg"
                  >
                    Schedule a Conversation
                  </Button>
                  <Link href="/about">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/20 bg-white/5 text-white hover:bg-white/10 h-14 px-8 rounded-none font-bold small-scale backdrop-blur-md transition-all hover:-translate-y-1"
                    >
                      Learn More About Neeve
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>
      </div>
    </>
  );
}
