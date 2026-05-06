import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpen, MapPin, MessageSquare, Network, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/home/Container";
import { Section } from "@/components/home/Section";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thanks. We will get back to you shortly.");
    setContactDialogOpen(false);
  };

  return (
    <>
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="max-h-[min(90vh,720px)] max-w-[440px] gap-0 overflow-y-auto rounded-none p-0 sm:max-w-[440px]">
          <div className="px-6 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-11">
            <DialogHeader className="space-y-3 text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#64748B]">Get in touch</p>
              <DialogTitle className="font-[var(--font-display)] text-2xl font-extrabold leading-tight tracking-tight text-foreground sm:text-[1.65rem]">
                Contact Neeve
              </DialogTitle>
              <DialogDescription className="text-base leading-relaxed text-[#64748B]">
                We typically reply within one to two business days.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleContactSubmit} className="mt-8 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contactName" className="text-foreground">
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
                <Label htmlFor="contactEmail" className="text-foreground">
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
                <Label htmlFor="contactMessage" className="text-foreground">
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
              <Button type="submit" className="mt-2 h-11 w-full rounded-none font-semibold">
                Send message
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <div className="w-full bg-background">
      <section
        aria-labelledby="about-heading"
        className="flex min-h-[calc(100dvh-4rem)] flex-col justify-center border-b border-border bg-white py-10 md:py-12"
      >
        <Container className="px-4 md:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#64748B]">About Neeve</p>
          <h1
            id="about-heading"
            className="mt-4 max-w-3xl font-[var(--font-display)] text-[2rem] font-extrabold leading-[1.12] tracking-tight text-foreground sm:text-4xl md:text-[2.65rem] md:leading-[1.1]"
          >
            Affordable textbooks through{" "}
            <span className="border-b-2 border-[#F97316] pb-0.5">partner study hubs</span>, not another{" "}
            <span className="text-primary">shipping-only marketplace</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-[1.7] text-[#334155] md:text-lg">
            Students spend heavily each semester on books they only need for a few months. Neeve builds the physical and software layer so
            borrowing, peer exchanges, and retail pickup stay local, traceable, and grounded in campus life.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button size="lg" type="button" variant="outline" className="w-full border-foreground/20 sm:w-auto" onClick={() => setContactDialogOpen(true)}>
              <MessageSquare className="mr-2 h-4 w-4" aria-hidden />
              Contact us
            </Button>
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/marketplace">
                Browse marketplace
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-white py-12 md:py-16">
        <Container>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <div className="grid grid-cols-1 gap-8 border border-border bg-background p-6 md:grid-cols-12 md:gap-10 md:p-8 lg:p-10">
              <div className="md:col-span-4 md:border-r md:border-border md:pr-8">
                <p className="home-kicker">MISSION</p>
                <motion.h2
                  variants={fadeUp}
                  className="mt-4 font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-foreground md:text-4xl"
                >
                  Lower out of pocket spend, longer book life
                </motion.h2>
              </div>
              <div className="md:col-span-8">
                <motion.p variants={fadeUp} className="text-base leading-relaxed text-[#334155] md:pt-1 md:text-[1.05rem]">
                  Neeve is not a university. We partner with colleges to run upgraded library-adjacent hubs and software so discovery,
                  routing, and desk handoff live in one place. The goal is predictable access and reuse without forcing every transaction
                  into the same shape.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      <Section>
        <Container>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748B]">What we are building</p>
            <h2 className="mt-3 font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Hubs, routing, and peer flows in one network
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#334155]">
              Each partner site is a physical node. The app ties hubs together so students search once and pick up at a desk they trust.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
          >
            {[
              {
                icon: BookOpen,
                title: "Discovery",
                body: "Search titles, hub stock, nearby hubs, and peer listings together.",
              },
              {
                icon: MapPin,
                title: "Pickup hubs",
                body: "Staffed desks on campus instead of anonymous courier drops.",
              },
              {
                icon: Network,
                title: "Routing",
                body: "Find the nearest copy before falling back to broader fulfillment.",
              },
              {
                icon: Users,
                title: "Peer and retail",
                body: "Exchange or buy with desk-assisted handoff so money and books stay traceable.",
              },
            ].map((item) => (
              <motion.article key={item.title} variants={fadeUp} className={card}>
                <div className="mb-4 flex h-10 w-10 items-center justify-center border border-border bg-[#EFF6FF] text-primary">
                  <item.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{item.body}</p>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-[#EEF2F6]">
        <Container>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-4 md:border-r md:border-border md:pr-8">
                <p className="home-kicker">VALUES</p>
                <motion.h2
                  variants={fadeUp}
                  className="mt-4 font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-foreground md:text-4xl"
                >
                  What guides the product
                </motion.h2>
              </div>
              <motion.div variants={stagger} className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-8 md:gap-5">
                {[
                  {
                    accent: "bg-primary" as const,
                    title: "Access over ownership",
                    body: "Borrowing and reuse should be viable for a semester without forcing a full retail purchase every time.",
                  },
                  {
                    accent: "bg-[#F97316]" as const,
                    title: "Reuse, not waste",
                    body: "Longer book life across readers cuts spend and clutter versus single-use buying patterns.",
                  },
                  {
                    accent: "bg-primary" as const,
                    title: "Fast, reliable desk paths",
                    body: "Search to pickup should feel obvious: clear status, predictable hours, and staff-visible handoffs.",
                  },
                  {
                    accent: "bg-[#F97316]" as const,
                    title: "Peers with guardrails",
                    body: "Student listings work best when the hub helps verify pickup and settle fees responsibly.",
                  },
                ].map((v) => (
                  <motion.article key={v.title} variants={fadeUp} className={card}>
                    <div className={`mb-4 h-1 w-12 ${v.accent}`} aria-hidden />
                    <h3 className="text-lg font-semibold text-foreground">{v.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#64748B]">{v.body}</p>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-white">
        <Container>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="border border-border bg-[#F8FAFC] p-6 md:p-8 lg:p-10"
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10 md:items-start">
              <div className="md:col-span-5">
                <p className="home-kicker">WHERE WE ARE</p>
                <motion.h2
                  variants={fadeUp}
                  className="mt-4 font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-foreground md:text-4xl"
                >
                  Building city by city
                </motion.h2>
              </div>
              <motion.div variants={fadeUp} className="md:col-span-7 space-y-4 text-base leading-relaxed text-[#334155] md:text-[1.05rem]">
                <p>
                  We grow through pilots: partner hubs, real desk operations, and reader adoption before we chase a noisy national launch.
                  Metrics vary by campus; we publish what we can stand behind.
                </p>
                <ul className="list-none space-y-3 border-l-2 border-primary/30 pl-5">
                  <li className="text-sm md:text-base">Rolling onboarding with institutions that fit our ops bar.</li>
                  <li className="text-sm md:text-base">Marketplace and hub flows in active iteration with early readers.</li>
                  <li className="text-sm md:text-base">Room to collaborate if you are a student body, library lead, or administrator.</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-background pb-16 md:pb-20">
        <Container>
          <div className="border border-border border-t-4 border-t-primary bg-white p-8 md:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                Want to collaborate?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#334155]">
                Reach out for partnerships, campus questions, or reader support. Colleges can also start on the pilot path below.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                <Button size="lg" className="w-full sm:w-auto" onClick={() => setContactDialogOpen(true)}>
                  Contact us
                </Button>
                <Button size="lg" variant="outline" className="w-full border-foreground/20 sm:w-auto" asChild>
                  <Link href="/colleges">Partner with Neeve</Link>
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
