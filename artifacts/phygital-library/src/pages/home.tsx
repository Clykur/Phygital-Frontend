import { useEffect, useState } from "react";
import { Link } from "wouter";
import { BookOpen, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/home/Container";
import { Section } from "@/components/home/Section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, useReducedMotion } from "framer-motion";

import heroImage from "@/assets/images/hero.png";
import aerialShelf from "@/assets/images/aerial-shelf.png";
import studentHub from "@/assets/images/student-hub.png";
import libraryDusk from "@/assets/images/library-dusk.png";

const heroBackgroundImages = [
  { src: heroImage, alt: "Library shelves at a partner hub" },
  { src: aerialShelf, alt: "Organized stacks for borrowing and pickup" },
  { src: studentHub, alt: "Students at a Neeve-enabled study hub" },
  { src: libraryDusk, alt: "Reading and collaboration in a partner library" },
];

const heroStats = [
  { label: "Readers", value: "Borrow, exchange, or buy at a hub" },
  { label: "Partner colleges", value: "Upgraded space, zero capex" },
  { label: "Network", value: "Route and fulfill locally" },
];

const viewportOnce = { once: true, margin: "-80px", amount: 0.2 } as const;

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [heroBgIndex, setHeroBgIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || heroBackgroundImages.length <= 1) return;
    const id = window.setInterval(() => {
      setHeroBgIndex((i) => (i + 1) % heroBackgroundImages.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

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

  const card = "home-interactive-card border border-border bg-white p-6";

  return (
    <div className="home-page w-full bg-background">
      {/* Hero — full first screen only; navbar hidden until scroll (see Navbar) */}
      <section className="relative min-h-[100dvh] overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[#0F172A]" aria-hidden>
          {heroBackgroundImages.map((img, i) => (
            <div
              key={img.src}
              className="absolute inset-0 bg-cover bg-center motion-safe:transition-opacity motion-safe:duration-[1400ms] motion-safe:ease-in-out"
              style={{
                backgroundImage: `url(${img.src})`,
                opacity: reduceMotion ? (i === 0 ? 1 : 0) : i === heroBgIndex ? 1 : 0,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-[#0F172A]/82" />
        </div>

        <div className="relative z-10 flex min-h-[100dvh] flex-col justify-center">
          <Container className="px-4 py-10 md:px-6 md:py-12">
            <motion.div variants={stagger} initial="hidden" animate="visible" className="mx-auto max-w-3xl text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                Neeve · B2B2C library network
              </p>
              <motion.h1
                variants={fadeUp}
                className="mt-6 text-balance font-[var(--font-display)] text-[2rem] font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.1]"
              >
                Affordable textbooks through a network of{" "}
                <span className="border-b-2 border-[#F97316] pb-0.5 text-white">partner study hubs</span>, not another{" "}
                <span className="text-primary">shipping-only marketplace</span>.
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-6 text-base leading-[1.7] text-white/90 md:text-lg">
                <span className="relative inline-block rounded-none bg-primary/35 px-1.5 py-0.5 font-semibold text-white ring-1 ring-primary/50">
                  Neeve is infrastructure, not a university.
                </span>{" "}
                We upgrade underused library space inside partner colleges, run it as a hub, and connect every hub in{" "}
                <span className="font-semibold text-[#F97316] underline decoration-[#F97316] decoration-2 underline-offset-4">
                  one app
                </span>{" "}
                for borrowing, peer-to-peer exchanges, and retail pickup.
              </motion.p>

              <motion.div
                variants={stagger}
                className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap"
              >
                <motion.div variants={fadeUp} className="w-full sm:w-auto">
                  <Button asChild className="w-full sm:w-auto">
                    <Link href="/sign-in">Get started</Link>
                  </Button>
                </motion.div>
                <motion.div variants={fadeUp} className="w-full sm:w-auto">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-white bg-transparent text-white hover:bg-white hover:text-foreground sm:w-auto"
                  >
                    <Link href="/marketplace">Browse marketplace</Link>
                  </Button>
                </motion.div>
                <motion.div variants={fadeUp} className="w-full sm:w-auto">
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full text-white hover:bg-white/10 hover:text-white sm:w-auto"
                  >
                    <Link href="/colleges">Partner with Neeve</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </Container>
        </div>
      </section>

      <section className="border-t border-border bg-background pt-16 pb-10 md:pb-12">
        <Container>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center"
          >
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 md:gap-10">
              {heroStats.map((chip) => (
                <motion.div key={chip.label} variants={fadeUp} className="mx-auto max-w-xs sm:mx-0 sm:max-w-none">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">{chip.label}</p>
                  <p className="mt-2 text-sm font-semibold leading-snug text-foreground md:text-base">{chip.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Problem */}
      <section className="border-y border-border bg-white py-12 md:py-16">
        <Container>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <div className="grid grid-cols-1 gap-8 border border-border bg-background p-6 md:grid-cols-12 md:gap-10 md:p-8 lg:p-10">
              <div className="md:col-span-4 md:border-r md:border-border md:pr-8">
                <p className="home-kicker">THE PROBLEM</p>
                <motion.h2 variants={fadeUp} className="mt-4 font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                  Textbooks are expensive; library space is underused
                </motion.h2>
              </div>
              <div className="md:col-span-8">
                <motion.p variants={fadeUp} className="text-base leading-relaxed text-[#334155] md:pt-1 md:text-[1.05rem]">
                  Students pay semester prices for books they only need for a few months, then struggle to resell safely. Colleges own the foot traffic but often cannot fund a full library refresh. Neeve addresses both sides with hubs plus software.
                </motion.p>
              </div>
            </div>

            <motion.div variants={stagger} className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
              <motion.article variants={fadeUp} className={`${card} md:p-8`}>
                <div className="mb-4 h-1 w-12 bg-primary" aria-hidden />
                <h3 className="text-lg font-semibold text-foreground">Readers</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
                  High prices and low trust in random online deals. People need predictable pickup, clear condition, and a local loop instead of courier roulette.
                </p>
              </motion.article>
              <motion.article variants={fadeUp} className={`${card} md:p-8`}>
                <div className="mb-4 h-1 w-12 bg-[#F97316]" aria-hidden />
                <h3 className="text-lg font-semibold text-foreground">Institutions</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
                  Libraries should anchor study life, but capex is tight. A partner-led hub upgrade lifts the student experience without a massive capital project on day one.
                </p>
              </motion.article>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Model */}
      <Section>
        <Container>
          <motion.header variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce} className="max-w-2xl">
            <p className="home-kicker">HOW NEEVE WORKS</p>
            <motion.h2 variants={fadeUp} className="mt-4 font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Hubs in colleges, one network in the app
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-base leading-relaxed text-[#334155]">
              Each partner site is a physical node: shelving, desk handoff, and local inventory. The app is where discovery, routing, and membership live.
            </motion.p>
          </motion.header>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {[
              {
                title: "Hub inside the college",
                body: "We secure underused library space, upgrade it, and operate it as a node in the network. The college keeps its brand; students get a space that feels current.",
              },
              {
                title: "Search and routing",
                body: "Look up a title once. If it is not at your hub, the app checks nearby hubs before we fall back to central sourcing shipped to your pickup desk.",
              },
              {
                title: "Ways to get the book",
                body: "Premium membership for deeper borrowing, retail when you want to own, and P2P with desk-assisted handoff so exchanges stay local and accountable.",
              },
            ].map((c) => (
              <motion.article key={c.title} variants={fadeUp} className={card}>
                <h3 className="text-lg font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{c.body}</p>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Pricing — balanced twin columns, shared header */}
      <Section className="border-t border-border bg-white">
        <Container>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="overflow-hidden border border-border bg-[#F8FAFC]"
          >
            <div className="border-b border-border bg-white px-8 py-10 md:px-10 md:py-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748B]">Pricing</p>
              <motion.h2
                variants={fadeUp}
                className="mt-3 font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-foreground md:text-4xl"
              >
                Membership and purchase paths
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-base leading-relaxed text-[#334155]">
                Premium is for readers who want predictable access across the network. Retail and P2P stay optional so you are not forced
                into one shape of transaction.
              </motion.p>
            </div>
            <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0">
              <motion.article variants={fadeUp} className="bg-white p-8 md:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">Premium membership</p>
                <p className="mt-4 font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-foreground md:text-[2rem]">
                  ₹199
                  <span className="text-lg font-semibold text-[#64748B]"> / month</span>
                </p>
                <p className="mt-2 inline-block border border-border bg-[#F8FAFC] px-2.5 py-1 text-xs font-medium text-[#475569]">
                  or ₹999 / year
                </p>
                <p className="mt-6 text-sm leading-relaxed text-[#475569]">
                  Borrow from premium inventory and use the peer-to-peer lane under clear membership rules.
                </p>
              </motion.article>
              <motion.article variants={fadeUp} className="bg-[#FAFAF9] p-8 md:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9A3412]">Retail & peer-to-peer</p>
                <p className="mt-4 font-[var(--font-display)] text-xl font-bold tracking-tight text-foreground md:text-2xl">
                  Pay per title no subscription
                </p>
                <p className="mt-2 text-sm text-[#64748B]">Buy when you want to own; resell with a small platform fee.</p>
                <p className="mt-6 text-sm leading-relaxed text-[#475569]">
                  Desk pickup keeps money and books traceable, so exchanges stay local and accountable instead of anonymous meetups.
                </p>
              </motion.article>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Moat */}
      <Section className="border-t border-border bg-white">
        <Container>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 md:items-start">
            <motion.div variants={fadeUp}>
              <p className="home-kicker">WHY HUBS MATTER</p>
              <h2 className="mt-4 font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                Placement and logistics compound together
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#334155]">
                Every new hub shortens distance to pickup and strengthens trust. That is structurally different from a warehouse that only ships to hostels.
              </p>
            </motion.div>
            <div className="flex flex-col gap-4 md:gap-5">
              <motion.article variants={fadeUp} className={card}>
                <h3 className="text-lg font-semibold text-foreground">On-campus presence</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                  Agreements anchor Neeve where students already study. That footprint is costly for pure e-commerce to copy city by city.
                </p>
              </motion.article>
              <motion.article variants={fadeUp} className={card}>
                <h3 className="text-lg font-semibold text-foreground">Hub-first fulfillment</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                  Inbound stock and peer drop-off consolidate at the desk, which cuts last-mile cost versus repeated door delivery in dense corridors.
                </p>
              </motion.article>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Roadmap + impact (single panel) */}
      <Section>
        <Container>
          <div className="border border-border bg-white p-6 md:p-8 lg:p-10">
            <motion.header variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce} className="max-w-2xl">
              <p className="home-kicker">ROLL-OUT</p>
              <motion.h2 variants={fadeUp} className="mt-4 font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                One city, then a mesh
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-3 text-base leading-relaxed text-[#334155]">
                We prove unit economics and reader conversion locally before copying playbooks. No noisy national launch without ops backing.
              </motion.p>
            </motion.header>

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
              {[
                { title: "Phase 1", body: "Liquidity first: listings, exchanges, and reasons to visit the desk every week." },
                { title: "Phase 2", body: "Add a small set of colleges once conversion and staffing meet internal bars." },
                { title: "Phase 3", body: "Regional mesh: deeper catalog tools, institutional supply, and state-appropriate integrations." },
              ].map((c) => (
                <motion.article key={c.title} variants={fadeUp} className={`${card} bg-background`}>
                  <h3 className="text-lg font-semibold text-foreground">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{c.body}</p>
                </motion.article>
              ))}
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-8 border-t border-border pt-8">
              <p className="text-xs font-semibold tracking-wide text-[#64748B]">EXPECTED IMPACT (ILLUSTRATIVE)</p>
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
                {[
                  { k: "Pilot reach", v: "~3,000 students and ~500 local readers" },
                  { k: "Year-one vision", v: "10 hubs, 25,000+ readers in the model" },
                  { k: "Circular value", v: "Longer book life, less waste, lower out-of-pocket spend" },
                ].map((row) => (
                  <motion.div key={row.k} variants={fadeUp}>
                    <p className="text-sm font-semibold text-foreground">{row.k}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{row.v}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Reader steps */}
      <Section className="border-t border-border bg-white">
        <Container>
          <motion.header variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce} className="max-w-2xl">
            <p className="home-kicker">IN THE APP</p>
            <motion.h2 variants={fadeUp} className="mt-4 font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Four steps for readers
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-base leading-relaxed text-[#334155]">
              Search, choose how to get the book, pick up at the hub, then return or relist when the term ends.
            </motion.p>
          </motion.header>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {[
              { title: "Find your title", body: "See local hub stock, nearby hubs, and peer listings in one search." },
              { title: "Choose borrow, buy, or exchange", body: "Membership, retail, or P2P depending on what the network can offer for that copy." },
              { title: "Pick up at the desk", body: "Staffed handoff instead of anonymous meetups." },
              { title: "Close the loop", body: "Return on time, relist, or pass along so the next reader saves money." },
            ].map((item, idx) => (
              <motion.article key={item.title} variants={fadeUp} className={card}>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-primary bg-primary text-sm font-extrabold text-primary-foreground">
                    {(idx + 1).toString().padStart(2, "0")}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{item.body}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Discoverability (compact) */}
      <Section>
        <Container>
          <div className="border border-border border-l-4 border-l-primary bg-white p-6 md:p-8">
            <p className="home-kicker">DISCOVERABILITY</p>
            <h2 className="mt-4 font-[var(--font-display)] text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
              Built for how people search and how campuses actually operate
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#334155]">
              If you are looking for textbook sharing in India, a campus library network, affordable textbooks, or a peer-to-peer book loop with desk pickup, Neeve is built around hubs, not only courier cartons.
            </p>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="border-t border-border bg-white">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
            <motion.header variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce} className="md:col-span-4">
              <p className="home-kicker">FAQ</p>
              <motion.h2 variants={fadeUp} className="mt-4 font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                Common questions
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-3 text-sm leading-relaxed text-[#334155]">
                We publish what we can stand behind. No inflated proof.
              </motion.p>
            </motion.header>
            <div className="md:col-span-8">
              <div className="border border-border bg-white">
                <Accordion type="single" collapsible className="px-4">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Is Neeve a college or a university?</AccordionTrigger>
                    <AccordionContent className="text-[#64748B]">
                      No. Neeve is a company that partners with colleges to run hubs and software. Your institution remains the institution.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What do I pay as a reader?</AccordionTrigger>
                    <AccordionContent className="text-[#64748B]">
                      Premium is ₹199 per month or ₹999 per year where offered. You can also buy retail or use P2P flows; exact entitlements show in the app for your hub.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>What if my book is not at my hub?</AccordionTrigger>
                    <AccordionContent className="text-[#64748B]">
                      The app checks other hubs first, then central sourcing to your nearest desk when needed, which usually beats repeated door-to-door shipping on cost.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do colleges partner?</AccordionTrigger>
                    <AccordionContent className="text-[#64748B]">
                      MoU, space audit, operational plan, then hub launch. We fund the upgrade so the college gets a modern touchpoint without a large balance-sheet project up front.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section className="bg-background pb-16 md:pb-20">
        <Container>
          <div className="border border-border border-t-4 border-t-primary bg-white p-8 md:p-10">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                Less spend per semester. More access per city.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#334155]">
                Open the app for readers, or talk to us if you are ready to pilot a hub on campus.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button asChild className="w-full sm:w-auto">
                  <Link href="/sign-in">Get started</Link>
                </Button>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link href="/colleges">Partner with Neeve</Link>
                </Button>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link href="/about">About</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
