import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, MapPin, Search, ArrowRight } from "lucide-react";
import studentHub from "@/assets/images/student-hub.png";

const MOCK_BORROWS = [
  { id: 1, title: "Introduction to Algorithms", author: "Thomas H. Cormen", due: "2 days", hub: "Engineering Block A" },
  { id: 2, title: "Principles of Physics", author: "Resnick, Halliday", due: "14 days", hub: "Main Library" }
];

const MOCK_RECOMMENDED = [
  { id: 3, title: "Clean Code", author: "Robert C. Martin", available: true },
  { id: 4, title: "Design Patterns", author: "Erich Gamma", available: false }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Student() {
  return (
    <div className="min-h-screen bg-background relative pt-24 pb-32">
      {/* Blurred Background Image for depth */}
      <div className="absolute top-0 left-0 w-full h-[50vh] overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
        <img src={studentHub} alt="" className="w-full h-full object-cover opacity-20 blur-xl mix-blend-overlay" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-border/50 pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-foreground tracking-tight mb-3">My Desk</h1>
            <p className="text-lg text-muted-foreground font-light">Welcome back, Alex. You have <span className="text-amber-600 font-medium">2 books</span> due soon.</p>
          </div>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search the network..." 
              className="h-12 pl-12 pr-4 rounded-full border border-border/50 bg-card/50 backdrop-blur-md text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 w-full md:w-80 shadow-sm transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Active Borrows */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif font-medium flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-500" /> Active Borrows
                </h2>
                <Button variant="ghost" className="text-sm font-medium hover:text-amber-600 hover:bg-transparent">View All</Button>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {MOCK_BORROWS.map((book, i) => (
                  <motion.div key={book.id} initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: i * 0.1 }}>
                    <div className="glass-card bg-card/60 p-6 rounded-2xl flex flex-col h-full relative group">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                         <BookOpen className="w-20 h-20" />
                      </div>
                      
                      <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="w-12 h-14 bg-slate-900 rounded-sm flex items-center justify-center shadow-md">
                          <BookOpen className="w-5 h-5 text-slate-50" />
                        </div>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20 px-3 py-1 font-medium">
                          Due in {book.due}
                        </Badge>
                      </div>
                      
                      <h3 className="font-serif font-medium text-xl mb-1 line-clamp-1 relative z-10">{book.title}</h3>
                      <p className="text-sm text-muted-foreground mb-6 relative z-10">{book.author}</p>
                      
                      <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between relative z-10">
                        <div className="flex items-center text-xs font-medium text-slate-500">
                          <MapPin className="w-3 h-3 mr-1.5" /> {book.hub}
                        </div>
                        <Button size="sm" variant="outline" className="h-8 rounded-full text-xs">Return</Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Recommended */}
            <section>
              <h2 className="text-2xl font-serif font-medium mb-6 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-500" /> Recommended
              </h2>
              <div className="space-y-4">
                {MOCK_RECOMMENDED.map((book, i) => (
                  <motion.div key={book.id} initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.2 + (i * 0.1) }}>
                    <div className="glass-card bg-card/60 p-4 rounded-xl flex items-center justify-between hover:bg-card/80 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-12 bg-slate-200 dark:bg-slate-800 rounded-sm border border-border flex items-center justify-center">
                           <BookOpen className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground text-base">{book.title}</h3>
                          <p className="text-sm text-muted-foreground">{book.author}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {book.available ? (
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">Available</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">Checked Out</Badge>
                        )}
                        <Button size="sm" className="rounded-full shadow-sm" variant={book.available ? "default" : "secondary"} disabled={!book.available}>
                          {book.available ? "Borrow" : "Waitlist"}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* ID Card */}
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <div className="rounded-2xl p-6 bg-slate-950 text-slate-50 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <span className="font-serif italic text-amber-400">PSLN Member</span>
                    <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center">
                       <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-slate-400">
                         <path d="M4 19.5V4.5C4 3.67157 4.67157 3 5.5 3H10.5C11.3284 3 12 3.67157 12 4.5V19.5C12 20.3284 11.3284 21 10.5 21H5.5C4.67157 21 4 20.3284 4 19.5Z" stroke="currentColor" strokeWidth="1.5"/>
                         <path d="M12 4.5C12 3.67157 12.6716 3 13.5 3H18.5C19.3284 3 20 3.67157 20 4.5V19.5C20 20.3284 19.3284 21 18.5 21H13.5C12.6716 21 12 20.3284 12 19.5V4.5Z" stroke="currentColor" strokeWidth="1.5"/>
                       </svg>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <p className="text-2xl font-medium tracking-tight mb-1">Alex Sharma</p>
                    <p className="text-slate-400 text-sm font-mono tracking-widest">ID: 8842-1099</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-4">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Borrowed</p>
                      <p className="text-lg font-medium">12</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Saved</p>
                      <p className="text-lg font-medium text-amber-400">₹4,500</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Nearest Hub widget */}
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.1 }}>
              <div className="glass-card bg-card/60 p-6 rounded-2xl">
                <h3 className="font-serif font-medium mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" /> Hub Location
                </h3>
                <div className="bg-muted/50 p-4 rounded-xl border border-border/50 mb-4">
                  <p className="font-medium mb-1">Engineering Block A</p>
                  <p className="text-sm text-muted-foreground">0.2 miles • Open till 8 PM</p>
                </div>
                <Button variant="outline" className="w-full rounded-full h-10 shadow-sm group">
                  Open Maps <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
