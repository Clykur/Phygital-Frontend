import { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BookOpen, MapPin, MessageSquare, Network, Users, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/home/Container";
import { Section } from "@/components/home/Section";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ImageCarousel } from "@/components/home/ImageCarousel";

const PAGE_TITLE = "About Neeve | Campus library network and affordable textbooks";
const PAGE_DESCRIPTION =
  "Neeve connects partner college libraries into one network: study hubs for borrowing, peer exchanges, and retail pickup so students spend less on textbooks without relying on shipping-only marketplaces.";

const viewportOnce = { once: true, margin: "-80px", amount: 0.2 } as const;

function useAboutSeo() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = PAGE_TITLE;

    const headNodes: HTMLElement[] = [];
    const appendMeta = (attrs: Record<string, string>) => {
      const el = document.createElement("meta");
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      el.setAttribute("data-neeve-page", "about");
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
        name: "Neeve",
        description: PAGE_DESCRIPTION,
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-neeve-page", "about");
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
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const HERO_BG_IMAGES = [
    { src: "/images/hero-library.png", alt: "Premium Futuristic Library" },
    { src: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2000&auto=format&fit=crop", alt: "Campus Excellence" },
    { src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000&auto=format&fit=crop", alt: "Modern Education" },
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
              <p className="caption-scale font-semibold uppercase tracking-[0.22em] text-[#64748B]">Get in touch</p>
              <DialogTitle className="font-[var(--font-display)] h3-scale font-extrabold leading-tight tracking-tight text-foreground sm:text-[1.65rem]">
                Contact Neeve
              </DialogTitle>
              <DialogDescription className="body-scale leading-relaxed text-[#64748B]">
                We typically reply within one to two business days.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleContactSubmit} className="mt-8 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contactName" className="text-foreground small-scale">
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
                <Label htmlFor="contactEmail" className="text-foreground small-scale">
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
                <Label htmlFor="contactMessage" className="text-foreground small-scale">
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
              <Button type="submit" className="mt-2 h-11 w-full rounded-none font-semibold small-scale">
                Send message
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
                    <Sparkles className="h-3.5 w-3.5 fill-primary text-primary" />
                    <span>Redefining Campus Libraries</span>
                  </div>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  className="mt-8 text-balance font-[var(--font-display)] hero-title text-white"
                >
                  Affordable textbooks through <span className="text-blue-400">partner study hubs.</span>
                </motion.h1>

                <motion.p variants={fadeUp} className="mt-6 body-scale text-slate-200 max-w-xl">
                  Neeve builds the physical and software layer so borrowing, peer exchanges, and retail pickup stay local, traceable, and grounded in campus life.
                </motion.p>

                <motion.div variants={stagger} className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                  <motion.div variants={fadeUp} className="w-full sm:w-auto">
                    <Link href="/marketplace" className="magnetic-btn flex w-full items-center justify-center gap-2 rounded-none bg-primary px-6 py-3 small-scale font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:-translate-y-0.5">
                      Browse Marketplace <ArrowRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                  <motion.div variants={fadeUp} className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      onClick={() => setContactDialogOpen(true)}
                      className="magnetic-btn flex w-full items-center justify-center gap-2 rounded-none border border-white/20 bg-white/10 backdrop-blur-md px-6 py-3 small-scale font-semibold text-white shadow-sm transition-all hover:border-white/30 hover:bg-white/20 hover:-translate-y-0.5 h-auto"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Contact Us
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Right Column: Floating Visuals */}
              <motion.div
                className="relative hidden lg:block h-[500px] w-full perspective-1000"
                style={{ y: yParallax, opacity: opacityParallax }}
              >
                <div className="absolute top-[10%] right-[10%] w-[320px] h-[400px] rounded-none shadow-2xl overflow-hidden border border-white/30 bg-white">
                  <img src="/digital-library-preview.png" alt="Digital Library Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
                </div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-[40%] -left-[5%] bento-card p-4 flex items-center gap-3 w-[200px] z-20"
                >
                  <div className="h-10 w-10 rounded-none bg-blue-50 flex items-center justify-center">
                    <Network className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="caption-scale font-bold text-slate-500 uppercase tracking-wider">The Network</p>
                    <p className="small-scale font-bold text-slate-900 leading-none">Unified Ecosystem</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </Container>
        </section>

      <section className="py-20 bg-white border-y border-slate-100">
        <Container>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 rounded-none bg-emerald-50 px-4 py-1.5 caption-scale font-bold uppercase tracking-widest text-emerald-600 mb-6">
                  <Zap className="h-3.5 w-3.5" />
                  Our Mission
                </div>
                <motion.h2
                  variants={fadeUp}
                  className="font-[var(--font-display)] h1-scale text-slate-900 text-balance"
                >
                  Lower out of pocket spend, longer book life.
                </motion.h2>
              </div>
              <div className="lg:col-span-7">
                <motion.p variants={fadeUp} className="body-scale text-slate-600 leading-relaxed">
                  Neeve is not a university. We partner with colleges to run upgraded library-adjacent hubs and software so discovery,
                  routing, and desk handoff live in one place. The goal is predictable access and reuse without forcing every transaction
                  into the same shape.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="py-24 bg-[#FAFAFA]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-none bg-blue-50 px-4 py-1.5 caption-scale font-bold uppercase tracking-widest text-primary mb-6">
              Core Infrastructure
            </div>
            <h2 className="font-[var(--font-display)] h1-scale text-slate-900 text-balance">
              Hubs, routing, and peer flows in one network.
            </h2>
            <p className="mt-6 body-scale text-slate-600">
              Each partner site is a physical node. The app ties hubs together so students search once and pick up at a desk they trust.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: BookOpen,
                title: "Discovery",
                body: "Search titles, hub stock, nearby hubs, and peer listings together.",
                color: "bg-blue-50 text-primary",
              },
              {
                icon: MapPin,
                title: "Pickup Hubs",
                body: "Staffed desks on campus instead of anonymous courier drops.",
                color: "bg-emerald-50 text-emerald-600",
              },
              {
                icon: Network,
                title: "Routing",
                body: "Find the nearest copy before falling back to broader fulfillment.",
                color: "bg-orange-50 text-orange-600",
              },
              {
                icon: Users,
                title: "Peer & Retail",
                body: "Exchange or buy with desk-assisted handoff so money and books stay traceable.",
                color: "bg-purple-50 text-purple-600",
              },
            ].map((item) => (
              <motion.article key={item.title} variants={fadeUp} className={card}>
                <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-none ${item.color}`}>
                  <item.icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
                </div>
                <h3 className="h3-scale text-slate-900 mb-3">{item.title}</h3>
                <p className="small-scale text-slate-600 leading-relaxed">{item.body}</p>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      <section className="py-24 bg-white border-t border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <Container>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-4 lg:sticky lg:top-24">
                <div className="inline-flex items-center gap-2 rounded-none bg-slate-100 px-4 py-1.5 caption-scale font-bold uppercase tracking-widest text-slate-600 mb-6">
                  Our Values
                </div>
                <motion.h2
                  variants={fadeUp}
                  className="font-[var(--font-display)] h1-scale text-slate-900 text-balance mb-6"
                >
                  What guides the product.
                </motion.h2>
                <p className="body-scale text-slate-600">
                  We believe in sustainable knowledge access that respects both students and institutions.
                </p>
              </div>
              
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    accent: "bg-primary",
                    title: "Access over ownership",
                    body: "Borrowing and reuse should be viable for a semester without forcing a full retail purchase every time.",
                  },
                  {
                    accent: "bg-emerald-500",
                    title: "Reuse, not waste",
                    body: "Longer book life across readers cuts spend and clutter versus single-use buying patterns.",
                  },
                  {
                    accent: "bg-orange-400",
                    title: "Fast, reliable desk paths",
                    body: "Search to pickup should feel obvious: clear status, predictable hours, and staff-visible handoffs.",
                  },
                  {
                    accent: "bg-purple-500",
                    title: "Peers with guardrails",
                    body: "Student listings work best when the hub helps verify pickup and settle fees responsibly.",
                  },
                ].map((v) => (
                  <motion.article key={v.title} variants={fadeUp} className={card}>
                    <div className={`mb-6 h-1.5 w-16 rounded-none ${v.accent}`} aria-hidden />
                    <h3 className="h3-scale text-slate-900 mb-4">{v.title}</h3>
                    <p className="small-scale text-slate-600 leading-relaxed">{v.body}</p>
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
            className="rounded-none border border-slate-200 bg-white p-8 md:p-12 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 rounded-none bg-blue-50 px-4 py-1.5 caption-scale font-bold uppercase tracking-widest text-primary mb-6">
                  Where we are
                </div>
                <motion.h2
                  variants={fadeUp}
                  className="font-[var(--font-display)] h1-scale text-slate-900 text-balance"
                >
                  Building city by city.
                </motion.h2>
              </div>
              <motion.div variants={fadeUp} className="lg:col-span-7 space-y-6">
                <p className="body-scale text-slate-600 leading-relaxed">
                  We grow through pilots: partner hubs, real desk operations, and reader adoption before we chase a noisy national launch.
                  Metrics vary by campus; we publish what we can stand behind.
                </p>
                <ul className="grid grid-cols-1 gap-4">
                  {[
                    "Rolling onboarding with institutions that fit our ops bar.",
                    "Marketplace and hub flows in active iteration with early readers.",
                    "Room to collaborate if you are a student body, library lead, or administrator."
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-none bg-primary shrink-0 group-hover:scale-150 transition-transform" />
                      <span className="small-scale text-slate-600">{text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
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
            className="rounded-none bg-primary p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
          >
            {/* Background pattern or glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 blur-[80px] rounded-full" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="font-[var(--font-display)] hero-title text-white mb-8">
                Want to collaborate?
              </h2>
              <p className="body-scale text-slate-100 mb-12">
                Reach out for partnerships, campus questions, or reader support. Colleges can also start on the pilot path below.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Button 
                  size="lg" 
                  onClick={() => setContactDialogOpen(true)}
                  className="bg-white text-primary hover:bg-slate-100 h-14 px-8 rounded-none font-bold small-scale transition-all hover:-translate-y-1 shadow-lg"
                >
                  Contact Us
                </Button>
                <Link href="/colleges">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white/30 bg-white/10 text-white hover:bg-white/20 h-14 px-8 rounded-none font-bold small-scale backdrop-blur-md transition-all hover:-translate-y-1"
                  >
                    Partner with Neeve
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
