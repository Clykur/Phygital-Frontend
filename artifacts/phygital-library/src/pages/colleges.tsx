import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, TrendingUp, Users, ShieldCheck, ArrowRight } from "lucide-react";
import aerialShelf from "@/assets/images/aerial-shelf.png";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

export default function Colleges() {
  const [partnerDialogOpen, setPartnerDialogOpen] = useState(false);

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Application received. Our team will reach out within 48h.");
    setPartnerDialogOpen(false);
  };

  return (
    <div className="flex flex-col w-full bg-background pt-24">
      {/* Editorial Hero */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="lg:col-span-5 lg:col-start-1 order-2 lg:order-1">
              <span className="text-amber-600 font-serif italic text-xl mb-4 block">For Institutions</span>
              <h1 className="text-5xl md:text-6xl font-serif font-medium tracking-tight leading-[1.1] mb-8">
                Increase library usage by 4x without buying new books.
              </h1>
              <p className="text-lg text-muted-foreground font-light leading-relaxed mb-10 max-w-md">
                Digitize your library, improve student access, and maximize ROI - all with zero upfront cost.
              </p>
              
              <Dialog open={partnerDialogOpen} onOpenChange={setPartnerDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="h-14 px-8 rounded-lg bg-foreground text-background hover:bg-foreground/90 text-base font-medium shadow-lg hover:shadow-xl transition-all">
                    Schedule a Demo <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="font-serif text-2xl">Become a Partner</DialogTitle>
                    <DialogDescription>
                      Fill out this form and our team will get in touch within 48 hours to discuss integration.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handlePartnerSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="collegeName">College Name</Label>
                      <Input id="collegeName" placeholder="University of Technology" required className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Contact Name</Label>
                      <Input id="contactName" placeholder="Dr. Sarah Menon" required className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="sarah@university.edu" required className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="librarySize">Expected Library Size (Books)</Label>
                      <Input id="librarySize" type="number" placeholder="50000" required className="bg-background" />
                    </div>
                    <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-lg mt-4">
                      Submit Application
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2 relative"
            >
              <div className="aspect-[4/5] rounded-sm overflow-hidden relative shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-foreground/20 to-transparent z-10 mix-blend-overlay" />
                <img src={aerialShelf} alt="Aerial view of modern library shelves" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -left-12 bottom-12 glass-card bg-card/90 p-6 rounded-xl max-w-xs z-20 shadow-2xl hidden md:block border-l-4 border-l-amber-500">
                <p className="font-serif text-2xl font-medium mb-2">4x</p>
                <p className="text-sm text-muted-foreground">increase in book usage within the first semester</p>
                <p className="text-xs text-muted-foreground mt-1">Proven across early partner campuses</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Props — Side by Side Editorial Blocks */}
      <section className="py-32 bg-muted/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="mb-20">
             <h2 className="text-4xl md:text-5xl font-serif font-medium max-w-2xl">Why colleges are switching to a shared library network</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-x-12 gap-y-16">
            {[
              { icon: TrendingUp, title: "Increase ROI on existing library investments", desc: "Your books sit unused most of the year. We turn idle inventory into actively borrowed resources across your campus network." },
              { icon: Users, title: "Meet modern student expectations", desc: "Students expect app-based access. Give them instant discovery, reservations, and pickup - just like any modern platform." },
              { icon: ShieldCheck, title: "Reduce manual workload for staff", desc: "Automate tracking, reservations, waitlists, and reminders - so your team focuses on operations, not repetitive tasks." }
            ].map((prop, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: i * 0.1 }} className="group hover:-translate-y-2 transition-transform duration-300">
                <div className="mb-6 w-12 h-12 flex items-center justify-center rounded-full bg-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-amber-50 transition-colors duration-300">
                   <prop.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif font-medium mb-4">{prop.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">{prop.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation — Dark Section */}
      <section className="py-32 bg-slate-950 text-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl font-serif font-medium mb-12">Go live in under 14 days - no disruption to your current system</h2>
              <div className="space-y-8">
                {[
                  { title: "We digitize your existing inventory", desc: "We map and digitize your current physical inventory into the cloud." },
                  { title: "We set up a lightweight pickup point on campus", desc: "We set up a small, efficient physical pickup/drop-off hub on your campus." },
                  { title: "Your books become accessible across the network (priority to your students)", desc: "Your books enter the shared network, available to your students first." },
                  { title: "Students start borrowing via app with QR-based pickup", desc: "Students borrow via app and scan a QR code to collect instantly." }
                ].map((step, i) => (
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: i * 0.1 }} key={i} className="flex items-start gap-6 group">
                    <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center shrink-0 mt-1 group-hover:border-amber-500 transition-colors">
                      <span className="text-xs font-mono text-slate-400 group-hover:text-amber-400">0{i+1}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-medium mb-2">{step.title}</h4>
                      <p className="text-slate-400 font-light">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-slate-900/50 rounded-3xl p-10 backdrop-blur-md border border-slate-800">
              <span className="inline-block p-3 rounded-full bg-amber-500/10 text-amber-400 mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </span>
              <h3 className="text-3xl font-serif font-medium mb-4">No upfront cost. No operational risk.</h3>
              <ul className="list-disc list-inside text-slate-400 font-light text-lg mb-10 leading-relaxed space-y-2">
                <li>No hardware investment required</li>
                <li>No change to your existing library system</li>
                <li>Fully managed onboarding and support</li>
                <li>Start small - scale anytime</li>
              </ul>
              <h3 className="text-3xl font-serif font-medium mb-4">See how your library can increase utilization in 2 weeks</h3>
              <p className="text-slate-400 font-light text-lg mb-10 leading-relaxed">Get a personalized demo for your campus and see projected impact.</p>
              
              <Button onClick={() => setPartnerDialogOpen(true)} size="lg" className="w-full h-14 rounded-lg bg-slate-50 text-slate-950 hover:bg-slate-200 text-base font-medium shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all">
                Schedule a Demo
              </Button>
              <p className="text-center text-sm text-slate-500 mt-4">Limited onboarding slots available this semester</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}