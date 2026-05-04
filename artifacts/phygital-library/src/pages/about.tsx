import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import constellation from "@/assets/images/constellation.png";
import { toast } from "sonner";
import { useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

export default function About() {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you shortly.");
    setContactDialogOpen(false);
  };

  return (
    <div className="flex flex-col w-full bg-background pt-24">
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Get in touch</DialogTitle>
            <DialogDescription>
              We'll typically reply within a few hours.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleContactSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="contactName">Name</Label>
              <Input id="contactName" placeholder="Your name" required className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email Address</Label>
              <Input id="contactEmail" type="email" placeholder="you@example.com" required className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="How can we help?" rows={4} required className="bg-background resize-none" />
            </div>
            <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-lg mt-4">
              Send Message
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Editorial Header */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <span className="text-amber-600 font-serif italic text-xl mb-6 block">Our Story</span>
            <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight leading-[1.05] mb-8">
              Making textbooks affordable and accessible for every student in India.
            </h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
              PSLN started with a simple problem: students are spending ₹8,000–₹15,000 every semester on textbooks they barely use. We're building a network where students can find, borrow, and reuse books across campuses instead of buying new ones every time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cinematic Full Bleed */}
      <section className="w-full h-[60vh] relative overflow-hidden my-10">
        <motion.div 
           initial={{ scale: 1.1 }}
           whileInView={{ scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1.5, ease: "easeOut" as const }}
           className="w-full h-full"
        >
          <img src={constellation} alt="Interconnected library network" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-950/40 mix-blend-overlay" />
        </motion.div>
      </section>

      {/* Narrative Flow */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="grid md:grid-cols-12 gap-12 mb-32">
            <div className="md:col-span-4">
              <h2 className="text-3xl font-serif font-medium border-b border-border/50 pb-4">The Mission</h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-2xl font-light leading-relaxed text-foreground">
                Our mission is to reduce textbook costs for students by 70%+ by turning existing college libraries into a shared, connected network. A shared library network connecting campuses across India.
              </p>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="grid md:grid-cols-12 gap-12 mb-32">
            <div className="md:col-span-4">
              <h2 className="text-3xl font-serif font-medium border-b border-border/50 pb-4">What we’re building</h2>
            </div>
            <div className="md:col-span-8">
              <ul className="space-y-4 text-xl font-light leading-relaxed text-foreground list-disc list-inside">
                <li>A platform to search books across campuses</li>
                <li>A network of physical pickup hubs inside colleges</li>
                <li>A peer-to-peer marketplace for student listings</li>
                <li>A routing system that finds the nearest available copy</li>
              </ul>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="text-3xl font-serif font-medium border-b border-border/50 pb-4">Core Values</h2>
            </div>
            <div className="md:col-span-8 grid sm:grid-cols-2 gap-x-8 gap-y-12">
              <div>
                <h3 className="font-serif text-xl font-medium mb-3 text-amber-600">Access over ownership</h3>
                <p className="text-muted-foreground font-light leading-relaxed">Students shouldn’t have to buy a book to use it for a few months. Shared access makes education more affordable and practical.</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium mb-3 text-amber-600">Built for reuse, not waste</h3>
                <p className="text-muted-foreground font-light leading-relaxed">Most textbooks are used once and forgotten. We extend their lifecycle across multiple students.</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium mb-3 text-amber-600">Simple, fast, and reliable</h3>
                <p className="text-muted-foreground font-light leading-relaxed">From search to pickup, everything is designed to work in minutes - not days.</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium mb-3 text-amber-600">Students helping students</h3>
                <p className="text-muted-foreground font-light leading-relaxed">Our peer marketplace allows students to lend, sell, and recover costs - safely and easily.</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="grid md:grid-cols-12 gap-12 mt-32">
            <div className="md:col-span-4">
              <h2 className="text-3xl font-serif font-medium border-b border-border/50 pb-4">Where we are today</h2>
            </div>
            <div className="md:col-span-8">
              <ul className="space-y-4 text-xl font-light leading-relaxed text-foreground list-disc list-inside">
                <li>Live with X books across X campuses</li>
                <li>Early student adoption and listings growing weekly</li>
                <li>Actively onboarding partner institutions</li>
              </ul>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Contact Banner */}
      <section className="py-32 bg-slate-950 text-slate-50 text-center px-6 border-t border-slate-800">
        <h2 className="text-4xl font-serif font-medium mb-6">Want to be part of this?</h2>
        <p className="text-slate-400 font-light mb-10 max-w-lg mx-auto text-lg">We’re actively working with students, colleges, and early supporters. If you’d like to collaborate, partner, or learn more - reach out.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button onClick={() => setContactDialogOpen(true)} className="inline-flex items-center justify-center h-14 px-10 rounded-lg bg-amber-500 text-slate-950 font-medium hover:bg-amber-400 transition-colors text-lg shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:scale-105 w-full sm:w-auto">
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
}