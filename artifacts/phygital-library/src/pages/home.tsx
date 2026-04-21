import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  GraduationCap,
  Library,
  MapPin,
  RefreshCw,
  Search,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
  Wallet
} from "lucide-react";
import heroImg from "@/assets/images/hero.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-background z-0">
          {/* Subtle glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col space-y-6"
            >
              <motion.div variants={fadeInUp}>
                <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary px-3 py-1 text-sm rounded-full backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 mr-2" /> The Phygital Library Network
                </Badge>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-foreground leading-[1.1]"
              >
                Access Knowledge <br />
                <span className="text-muted-foreground italic font-light">Without Owning It.</span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed"
              >
                Discover, borrow, or buy textbooks through our digital app and pick them up at physical hubs across campus. The library of the future is here.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="text-base h-12 px-8 shadow-xl shadow-primary/20 rounded-full">
                  Explore Network
                </Button>
                <Button size="lg" variant="outline" className="text-base h-12 px-8 rounded-full border-border hover:bg-muted/50 backdrop-blur-sm">
                  Get Started
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto md:h-[600px] border border-border/50 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10"></div>
                <img
                  src={heroImg}
                  alt="Modern library interior"
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Floating cards */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-6 -left-6 md:-left-12 bg-card/80 backdrop-blur-xl p-4 rounded-xl border border-border shadow-xl flex items-center gap-4 z-20"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Nearby Hub</p>
                  <p className="text-xs text-muted-foreground">Engineering Block A</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">The Broken System</h2>
            <p className="text-muted-foreground text-lg">Education is evolving, but access to textbooks remains stuck in the past.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card className="h-full bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center mb-6">
                    <GraduationCap className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">For Students</h3>
                  <p className="text-muted-foreground">
                    Textbooks are prohibitively expensive and often left unused after a single semester. Selling them back is a hassle, leading to wasted money and resources.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card className="h-full bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6">
                    <Library className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">For Colleges</h3>
                  <p className="text-muted-foreground">
                    Physical libraries are underutilized. Outdated inventory and inefficient tracking systems make it hard to provide students with the resources they actually need.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 relative">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">The Phygital Solution</h2>
            <p className="text-muted-foreground text-lg">Bridging the gap between digital discovery and physical access.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Smartphone, title: "Digital App", desc: "Discover, reserve, and manage your books from anywhere.", color: "text-blue-500", bg: "bg-blue-500/10" },
              { icon: MapPin, title: "Physical Hubs", desc: "Convenient pickup and drop-off points right on your campus.", color: "text-emerald-500", bg: "bg-emerald-500/10" },
              { icon: RefreshCw, title: "Shared Network", desc: "Colleges pool their resources to create a massive, accessible inventory.", color: "text-purple-500", bg: "bg-purple-500/10" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1 } } }}
                className="flex flex-col items-center text-center group"
              >
                <div className={`w-20 h-20 ${item.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-10 h-10 ${item.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#fff,transparent_70%)] mix-blend-overlay"></div>
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-primary-foreground">How It Works</h2>
            <p className="text-primary-foreground/80 text-lg">Four simple steps to access the knowledge you need.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Search", desc: "Find the textbook you need on our app." },
              { num: "02", title: "Borrow/Buy", desc: "Reserve it for the semester or buy it." },
              { num: "03", title: "Raise Query", desc: "Request books not currently in stock." },
              { num: "04", title: "Pickup", desc: "Collect it at your nearest campus hub." },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { delay: i * 0.1 } } }}
              >
                <Card className="bg-primary-foreground/10 border-none text-primary-foreground backdrop-blur-sm h-full">
                  <CardContent className="p-6">
                    <div className="text-4xl font-serif font-bold text-primary-foreground/30 mb-4">{step.num}</div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-primary-foreground/80 text-sm">{step.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground text-lg">Designed for a frictionless learning experience.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, title: "Live Inventory", desc: "See real-time availability of books across all campus hubs." },
              { icon: Smartphone, title: "QR Scanning", desc: "Instant pickup and drop-off with a simple scan." },
              { icon: Users, title: "P2P Marketplace", desc: "Buy or sell directly with peers on your campus safely." },
              { icon: TrendingUp, title: "Smart Routing", desc: "Our algorithm finds the nearest available copy for you." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1 } } }}
              >
                <Card className="h-full bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Model Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Transparent Pricing</h2>
            <p className="text-muted-foreground text-lg">A model built for affordability and sustainability.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Subscription", price: "₹199", period: "/month", desc: "Unlimited borrowing from the physical network. Keep up to 3 books at a time.", popular: true },
              { title: "Book Sales", price: "Retail", period: "", desc: "Buy brand new textbooks directly through the app at discounted student rates.", popular: false },
              { title: "P2P Transactions", price: "Flexible", period: "", desc: "Buy pre-owned books from seniors. We take a minimal 5% platform fee.", popular: false }
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className={plan.popular ? "relative -mt-4 mb-4" : ""}
              >
                <Card className={`h-full border ${plan.popular ? "border-primary shadow-xl shadow-primary/10" : "border-border shadow-sm"} bg-card`}>
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      Most Popular
                    </div>
                  )}
                  <CardContent className="p-8 text-center flex flex-col h-full">
                    <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                    <div className="flex items-end justify-center gap-1 mb-6">
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground mb-1">{plan.period}</span>
                    </div>
                    <p className="text-muted-foreground mb-8 flex-grow">{plan.desc}</p>
                    <Button variant={plan.popular ? "default" : "outline"} className={`w-full ${plan.popular ? "shadow-md" : ""}`}>
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-muted/50 border-y border-border">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-emerald-500/10 rounded-full">
                  <Wallet className="w-8 h-8 text-emerald-500" />
                </div>
              </div>
              <h3 className="text-3xl font-serif font-bold text-foreground mb-2">₹12,000+</h3>
              <p className="text-muted-foreground">Average savings per student annually</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: 0.1 } } }}>
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-500/10 rounded-full">
                  <Library className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <h3 className="text-3xl font-serif font-bold text-foreground mb-2">4x</h3>
              <p className="text-muted-foreground">Increase in library utilization</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: 0.2 } } }}>
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-orange-500/10 rounded-full">
                  <RefreshCw className="w-8 h-8 text-orange-500" />
                </div>
              </div>
              <h3 className="text-3xl font-serif font-bold text-foreground mb-2">350kg</h3>
              <p className="text-muted-foreground">Of paper waste saved per campus</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative">
        <div className="container px-4 md:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Join the Library Network</h2>
            <p className="text-xl text-muted-foreground mb-10">
              Whether you're a student looking to save or a college aiming to modernize, PSLN is your partner in education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base h-14 px-8 rounded-full shadow-lg shadow-primary/20">
                <GraduationCap className="mr-2 h-5 w-5" /> I'm a Student
              </Button>
              <Button size="lg" variant="outline" className="text-base h-14 px-8 rounded-full border-border hover:bg-muted/50">
                <Library className="mr-2 h-5 w-5" /> I'm a College
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}