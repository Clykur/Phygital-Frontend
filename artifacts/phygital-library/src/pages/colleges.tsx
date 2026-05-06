import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Building2, CheckCircle2, Handshake, MapPin, ScanLine, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/home/Container";
import { Section } from "@/components/home/Section";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

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

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { type: "spring" as const, stiffness: 380, damping: 30, mass: 0.85 },
    },
  };
  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.05, delayChildren: reduceMotion ? 0 : 0.03 } },
  };

  const card = "home-interactive-card border border-border bg-white p-6 md:p-8";

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thanks. We will reach out within two business days.");
    setPartnerDialogOpen(false);
  };

  return (
    <>
      <Dialog open={partnerDialogOpen} onOpenChange={setPartnerDialogOpen}>
        <DialogContent className="max-h-[min(90vh,760px)] max-w-[440px] gap-0 overflow-y-auto rounded-none p-0 sm:max-w-[440px]">
          <div className="px-6 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-11">
            <DialogHeader className="space-y-3 text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#64748B]">
                Partner colleges
              </p>
              <DialogTitle className="font-[var(--font-display)] text-2xl font-extrabold leading-tight tracking-tight text-foreground sm:text-[1.65rem]">
                Pilot a hub with Neeve
              </DialogTitle>
              <DialogDescription className="text-base leading-relaxed text-[#64748B]">
                Share a few details. Our partnerships team typically responds within two business days.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handlePartnerSubmit} className="mt-8 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="collegeName" className="text-foreground">
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
                <Label htmlFor="contactName" className="text-foreground">
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
                <Label htmlFor="jobTitle" className="text-foreground">
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
                <Label htmlFor="email" className="text-foreground">
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
                <Label htmlFor="city" className="text-foreground">
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
              <Button type="submit" className="mt-2 h-11 w-full rounded-none font-semibold">
                Submit
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <div className="w-full bg-background">
      {/* Fills first viewport below fixed navbar (h-16): only this block + nav on initial load */}
      <section
        aria-labelledby="colleges-partner-heading"
        className="flex min-h-[calc(100dvh-4rem)] flex-col justify-center border-b border-border bg-white py-10 md:py-12"
      >
        <Container className="px-4 md:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-10 xl:gap-14">
            <div className="flex flex-col justify-center lg:col-span-7 lg:max-w-none">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#64748B]">For partner colleges</p>
              <h1
                id="colleges-partner-heading"
                className="mt-4 max-w-2xl text-balance font-[var(--font-display)] text-[2rem] font-extrabold leading-[1.12] tracking-tight text-foreground sm:text-4xl md:text-[2.65rem] md:leading-[1.1]"
              >
                Upgrade underused library space into a{" "}
                <span className="border-b-2 border-[#F97316] pb-0.5">Neeve study hub</span> with{" "}
                <span className="text-primary">zero upfront capex</span>.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-[1.75] text-[#334155] md:text-lg">
                Start with one MoU and one pilot hub. We align on space, traffic, and operations, then scale when your institution is
                ready. Students use the same app for borrowing, P2P, and retail pickup across the network.
              </p>
              <div className="mt-9">
                <Button size="lg" type="button" className="w-full sm:w-auto" onClick={() => setPartnerDialogOpen(true)}>
                  Schedule a conversation
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Button>
              </div>
            </div>

            <div className="flex flex-col justify-center lg:col-span-5">
              <div className="flex h-full flex-col overflow-hidden border border-border border-l-[3px] border-l-[#F97316] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
                <div className="border-b border-border bg-[#FAFBFC] px-5 py-5 md:px-6 md:py-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748B]">Pilot checklist</p>
                  <p className="mt-2 font-[var(--font-display)] text-lg font-bold leading-snug tracking-tight text-foreground md:text-xl">
                    What we align on before go live
                  </p>
                </div>
                <ul className="flex flex-1 flex-col divide-y divide-border bg-white" role="list">
                  {[
                    "Space audit: shelving, desk, and student flow",
                    "Traffic and term calendar for staffing",
                    "Inventory and handoff rules with your team",
                    "MoU scope: one hub, clear success gates",
                  ].map((line) => (
                    <li key={line} className="flex gap-3.5 px-5 py-4 md:px-6 md:py-[1.125rem]">
                      <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#EA580C]" aria-hidden />
                      <span className="text-[0.9375rem] leading-relaxed text-[#334155]">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-4 max-w-md text-xs leading-relaxed text-[#64748B] md:mt-5">
                Utilization varies by campus. We model impact with your inputs and keep MoU language grounded.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-white py-12 md:py-16">
        <Container>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <div className="grid grid-cols-1 gap-8 border border-border bg-background p-6 md:grid-cols-12 md:gap-10 md:p-8 lg:p-10">
              <div className="md:col-span-5 md:border-r md:border-border md:pr-8">
                <p className="home-kicker">WHY PARTNER</p>
                <motion.h2
                  variants={fadeUp}
                  className="mt-4 font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-foreground md:text-4xl"
                >
                  Foot traffic, underused space, a modern desk experience
                </motion.h2>
              </div>
              <div className="md:col-span-7">
                <motion.p variants={fadeUp} className="text-base leading-relaxed text-[#334155] md:pt-1 md:text-[1.05rem]">
                  Neeve is infrastructure. We help you turn library adjacency into a staffed hub for discovery, pickup, and accountable
                  peer exchanges, without a large capital project on day one.
                </motion.p>
              </div>
            </div>

            <motion.div variants={stagger} className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
              {[
                {
                  accent: "bg-primary" as const,
                  icon: Sparkles,
                  title: "Lift the physical experience",
                  body: "Refresh underused stacks and desk workflows so the library feels current. We co-design the hub layout with your team.",
                },
                {
                  accent: "bg-[#F97316]" as const,
                  icon: Users,
                  title: "Match how students move",
                  body: "App-based discovery, reservations, and desk handoff match expectations set by retail and mobility products.",
                },
                {
                  accent: "bg-primary" as const,
                  icon: ShieldCheck,
                  title: "Clear rules, traceable handoffs",
                  body: "P2P and retail use desk-assisted pickup so condition, fees, and accountability stay visible to staff.",
                },
              ].map((item) => (
                <motion.article key={item.title} variants={fadeUp} className={card}>
                  <div className={`mb-4 h-1 w-12 ${item.accent}`} aria-hidden />
                  <div className="mb-3 flex h-10 w-10 items-center justify-center border border-border bg-[#EFF6FF] text-primary">
                    <item.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#64748B]">{item.body}</p>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <Section className="border-t border-border bg-[#EEF2F6]">
        <Container>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border border-border bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)]"
          >
            <div className="grid grid-cols-1 gap-8 border-b border-border bg-[#FAFBFC] p-6 md:grid-cols-12 md:gap-10 md:p-8 lg:p-10 lg:gap-12">
              <div className="md:col-span-5 md:border-r md:border-border md:pr-8 lg:pr-10">
                <p className="home-kicker">HOW THE PILOT WORKS</p>
                <h2 className="mt-4 font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                  From MoU to first desk day
                </h2>
              </div>
              <div className="flex flex-col justify-center md:col-span-7">
                <p className="text-base leading-relaxed text-[#334155] md:text-[1.05rem]">
                  Legal scope, physical upgrade, training, then a controlled launch. Your gates for scale stay explicit from kickoff through
                  review.
                </p>
              </div>
            </div>

            <div className="bg-white px-5 py-10 md:px-10 md:py-12 lg:px-12">
              <ol className="relative m-0 list-none space-y-0 p-0">
                {PILOT_STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  const isLast = idx === PILOT_STEPS.length - 1;
                  return (
                    <motion.li
                      key={step.title}
                      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.4, delay: reduceMotion ? 0 : idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className="relative flex gap-5 pb-12 last:pb-0 md:gap-8"
                    >
                      {!isLast ? (
                        <span
                          className="absolute left-[21px] top-11 h-[calc(100%-0.25rem)] w-px bg-gradient-to-b from-primary/35 via-border to-[#F97316]/35"
                          aria-hidden
                        />
                      ) : null}
                      <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center border border-border bg-white text-sm font-extrabold tabular-nums text-primary shadow-[0_1px_2px_rgba(15,23,42,0.06)] ring-2 ring-white">
                        {(idx + 1).toString().padStart(2, "0")}
                      </div>
                      <div className="min-w-0 flex-1 pt-0.5">
                        <div className="border border-border border-l-[3px] border-l-primary bg-[#F8FAFC] p-5 md:p-6">
                          <div className="flex flex-wrap items-start gap-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-white text-primary">
                              <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Step {(idx + 1).toString()}</p>
                              <h3 className="mt-1 font-[var(--font-display)] text-lg font-bold tracking-tight text-foreground md:text-xl">
                                {step.title}
                              </h3>
                              <p className="mt-3 text-sm leading-relaxed text-[#64748B] md:text-[0.9375rem]">{step.body}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </ol>
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-white pb-16 md:pb-20">
        <Container>
          <div className="border border-border border-t-4 border-t-primary bg-[#F8FAFC] p-8 md:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                Ready to talk about one pilot hub?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#334155]">
                We walk through space, staffing, and timelines, and only scale when your institution is comfortable.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                <Button size="lg" className="w-full sm:w-auto" onClick={() => setPartnerDialogOpen(true)}>
                  Schedule a conversation
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      </div>
    </>
  );
}
