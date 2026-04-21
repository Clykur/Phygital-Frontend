import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, TrendingUp, Users, ShieldCheck, ArrowRight } from "lucide-react";
import aerialShelf from "@/assets/images/aerial-shelf.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Colleges() {
  return (
    <div className="flex flex-col w-full bg-background pt-24">
      {/* Editorial Hero */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="lg:col-span-5 lg:col-start-1 order-2 lg:order-1">
              <span className="text-amber-600 font-serif italic text-xl mb-4 block">For Institutions</span>
              <h1 className="text-5xl md:text-6xl font-serif font-medium tracking-tight leading-[1.1] mb-8">
                Turn your <br/> dusty shelves <br/> into <span className="text-amber-600">active assets.</span>
              </h1>
              <p className="text-lg text-muted-foreground font-light leading-relaxed mb-10 max-w-md">
                Join the Phygital Network to digitize your inventory, increase utilization by 4x, and modernize campus infrastructure at zero upfront cost.
              </p>
              <Button size="lg" className="h-14 px-8 rounded-full bg-foreground text-background hover:bg-foreground/90 text-base font-medium shadow-lg hover:shadow-xl transition-all">
                Partner with us <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
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
                <p className="font-serif text-2xl font-medium mb-2">400%</p>
                <p className="text-sm text-muted-foreground">Average increase in resource utilization within the first semester.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Props — Side by Side Editorial Blocks */}
      <section className="py-32 bg-muted/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="mb-20">
             <h2 className="text-4xl md:text-5xl font-serif font-medium max-w-2xl">Why forward-thinking colleges join the network.</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-x-12 gap-y-16">
            {[
              { icon: TrendingUp, title: "Maximize ROI", desc: "Your books currently sit idle 80% of the year. The network ensures your investments are actively used by students who need them." },
              { icon: Users, title: "Better Experience", desc: "Provide a modern, app-based library experience that matches how today's students actually discover and consume content." },
              { icon: ShieldCheck, title: "Zero Admin Overhead", desc: "Our software handles tracking, reservations, waitlists, and reminders automatically. Your staff focuses on strategy, not scanning." }
            ].map((prop, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: i * 0.1 }}>
                <div className="mb-6 w-12 h-12 flex items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
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
              <h2 className="text-4xl md:text-5xl font-serif font-medium mb-12">Simple, zero-disruption integration.</h2>
              <div className="space-y-8">
                {[
                  { title: "Catalog Digitization", desc: "We map and digitize your current physical inventory into the cloud." },
                  { title: "Hub Setup", desc: "We set up a small, efficient physical pickup/drop-off hub on your campus." },
                  { title: "Network Connection", desc: "Your books enter the shared network, available to your students first." },
                  { title: "Go Live", desc: "Students borrow via app and scan a QR code to collect instantly." }
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-6 group">
                    <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center shrink-0 mt-1 group-hover:border-amber-500 transition-colors">
                      <span className="text-xs font-mono text-slate-400 group-hover:text-amber-400">0{i+1}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-medium mb-2">{step.title}</h4>
                      <p className="text-slate-400 font-light">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-slate-900/50 rounded-3xl p-10 backdrop-blur-md border border-slate-800">
              <span className="inline-block p-3 rounded-full bg-amber-500/10 text-amber-400 mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </span>
              <h3 className="text-3xl font-serif font-medium mb-4">Ready to modernize?</h3>
              <p className="text-slate-400 font-light text-lg mb-10 leading-relaxed">Setup takes less than 2 weeks. There is absolutely no disruption to your current operations, and zero upfront hardware costs.</p>
              <Button size="lg" className="w-full h-14 rounded-full bg-slate-50 text-slate-950 hover:bg-slate-200 text-base font-medium shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all">
                Schedule a Demo
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
