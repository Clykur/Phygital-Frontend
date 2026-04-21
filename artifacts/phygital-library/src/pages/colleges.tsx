import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, TrendingUp, Users, ShieldCheck } from "lucide-react";
import collegeImg from "@/assets/images/college.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Colleges() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="pt-24 pb-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-6">
                Transform Your Library into a Network Hub
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Join the Phygital Student Library Network to digitize your inventory, reach more students, and modernize your campus infrastructure at zero upfront cost.
              </p>
              <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20 h-12">
                Become a Partner
              </Button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl border border-border"
            >
              <img src={collegeImg} alt="Modern University Library" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">Why Partner with PSLN?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: TrendingUp, title: "Increase Utilization", desc: "Turn dusty shelves into active assets. Books in the network are borrowed 4x more often." },
              { icon: Users, title: "Student Satisfaction", desc: "Provide a modern, app-based experience that students actually want to use." },
              { icon: ShieldCheck, title: "Zero Admin Overhead", desc: "Our software handles the tracking, reservations, and reminders automatically." }
            ].map((prop, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <Card className="bg-card border-border h-full">
                  <CardContent className="p-8">
                    <prop.icon className="w-10 h-10 text-primary mb-6" />
                    <h3 className="text-xl font-semibold mb-3">{prop.title}</h3>
                    <p className="text-muted-foreground">{prop.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-8">Simple Integration</h2>
              <div className="space-y-6">
                {[
                  "We map and digitize your current inventory.",
                  "We set up a small physical pickup/drop-off hub.",
                  "Your books enter the shared network.",
                  "Students borrow via app, scan QR to collect."
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary-foreground/80 shrink-0" />
                    <p className="text-lg">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary-foreground/10 rounded-2xl p-8 backdrop-blur-sm border border-primary-foreground/20">
              <h3 className="text-2xl font-serif font-bold mb-4">Ready to modernize?</h3>
              <p className="text-primary-foreground/80 mb-8">Setup takes less than 2 weeks. No disruption to your current operations.</p>
              <Button size="lg" variant="secondary" className="w-full text-primary font-medium bg-primary-foreground hover:bg-primary-foreground/90">
                Contact our Partnerships Team
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}