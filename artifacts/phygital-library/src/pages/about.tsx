import { motion } from "framer-motion";
import aboutImg from "@/assets/images/about.png";

export default function About() {
  return (
    <div className="flex flex-col w-full bg-background">
      <section className="py-20 md:py-32">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight">
              Knowledge Should Be <span className="text-primary italic">Accessible</span>, Not Owned.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We started PSLN with a simple belief: the cost of textbooks shouldn't be a barrier to education. 
              By networking existing college libraries and creating local physical hubs, we're building a sustainable, affordable future for students in India.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="rounded-3xl overflow-hidden mb-20 shadow-2xl border border-border"
          >
            <img src={aboutImg} alt="Cozy reading nook" className="w-full h-auto aspect-video object-cover" />
          </motion.div>

          <div className="space-y-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              <div className="md:col-span-1">
                <h2 className="text-2xl font-serif font-bold border-b-2 border-primary/20 pb-4 inline-block">Our Mission</h2>
              </div>
              <div className="md:col-span-2">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To eliminate the financial burden of academic resources by creating India's largest interconnected phygital library. We bridge the gap between underutilized college infrastructure and student needs.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              <div className="md:col-span-1">
                <h2 className="text-2xl font-serif font-bold border-b-2 border-primary/20 pb-4 inline-block">Core Values</h2>
              </div>
              <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Access Over Ownership</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">You don't need to own a book to learn from it. We prioritize circulation and shared resources.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Sustainable Education</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">Reusing books reduces paper waste and environmental impact.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Frictionless Experience</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">From the app tap to physical pickup, every step must feel premium and effortless.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Community Driven</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">Our P2P marketplace empowers students to help each other while recovering costs.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-card border-t border-border py-16">
        <div className="container px-4 md:px-6 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-serif font-bold mb-4">Want to talk to us?</h2>
          <p className="text-muted-foreground mb-8">Whether you're an investor, a college admin, or just curious about what we're building, we'd love to hear from you.</p>
          <a href="mailto:hello@psln.network" className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
            hello@psln.network
          </a>
        </div>
      </section>
    </div>
  );
}