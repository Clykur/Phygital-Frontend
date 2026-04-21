import { motion } from "framer-motion";
import constellation from "@/assets/images/constellation.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function About() {
  return (
    <div className="flex flex-col w-full bg-background pt-24">
      {/* Editorial Header */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <span className="text-amber-600 font-serif italic text-xl mb-6 block">Our Story</span>
            <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight leading-[1.05] mb-8">
              Rewriting the rules <br/> of academic access.
            </h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
              We started PSLN with a simple belief: the cost of textbooks shouldn't be a barrier to education. We're building a sustainable, networked future for students in India.
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
           transition={{ duration: 1.5, ease: "easeOut" }}
           className="w-full h-full"
        >
          <img src={constellation} alt="Network Constellation" className="w-full h-full object-cover" />
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
                To eliminate the financial burden of academic resources by creating India's largest interconnected phygital library. We bridge the gap between underutilized college infrastructure and urgent student needs.
              </p>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="text-3xl font-serif font-medium border-b border-border/50 pb-4">Core Values</h2>
            </div>
            <div className="md:col-span-8 grid sm:grid-cols-2 gap-x-8 gap-y-12">
              <div>
                <h3 className="font-serif text-xl font-medium mb-3 text-amber-600">Access &gt; Ownership</h3>
                <p className="text-muted-foreground font-light leading-relaxed">You don't need to own a book to learn from it. We prioritize circulation and shared resources over private collections.</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium mb-3 text-amber-600">Sustainable Education</h3>
                <p className="text-muted-foreground font-light leading-relaxed">Reusing books reduces paper waste and environmental impact. Every book borrowed is a tree saved.</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium mb-3 text-amber-600">Frictionless Experience</h3>
                <p className="text-muted-foreground font-light leading-relaxed">From the app tap to physical pickup, every step must feel premium, effortless, and instantaneous.</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium mb-3 text-amber-600">Community Driven</h3>
                <p className="text-muted-foreground font-light leading-relaxed">Our P2P marketplace empowers students to help each other while recovering their own costs safely.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Contact Banner */}
      <section className="py-32 bg-slate-950 text-slate-50 text-center px-6 border-t border-slate-800">
        <h2 className="text-4xl font-serif font-medium mb-6">Let's shape the future.</h2>
        <p className="text-slate-400 font-light mb-10 max-w-lg mx-auto text-lg">Whether you're an investor, a college admin, or just curious about what we're building, we'd love to chat.</p>
        <a href="mailto:hello@psln.network" className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-amber-500 text-slate-950 font-medium hover:bg-amber-400 transition-colors text-lg shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:scale-105">
          hello@psln.network
        </a>
      </section>
    </div>
  );
}
