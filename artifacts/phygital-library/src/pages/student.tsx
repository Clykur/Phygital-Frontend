import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, MapPin, Search } from "lucide-react";
import dashBg from "@/assets/images/dash-bg.png";

const MOCK_BORROWS = [
  { id: 1, title: "Introduction to Algorithms", author: "Thomas H. Cormen", due: "2 days", hub: "Engineering Block A" },
  { id: 2, title: "Principles of Physics", author: "Resnick, Halliday", due: "14 days", hub: "Main Library" }
];

const MOCK_RECOMMENDED = [
  { id: 3, title: "Clean Code", author: "Robert C. Martin", available: true },
  { id: 4, title: "Design Patterns", author: "Erich Gamma", available: false }
];

export default function Student() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/20 relative">
      <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay">
        <img src={dashBg} alt="" className="w-full h-full object-cover" />
      </div>
      
      <div className="container px-4 md:px-6 py-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">My Library</h1>
            <p className="text-muted-foreground">Welcome back, Alex. You have 2 books due soon.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search the network..." 
                className="h-10 pl-9 pr-4 rounded-full border border-border bg-background/50 backdrop-blur-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary w-64"
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Active Borrows */}
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" /> Active Borrows
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {MOCK_BORROWS.map((book) => (
                  <motion.div key={book.id} whileHover={{ y: -2 }}>
                    <Card className="bg-card/80 backdrop-blur-sm border-border shadow-sm hover:shadow-md transition-all">
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-10 h-12 bg-primary/10 rounded overflow-hidden flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-primary" />
                          </div>
                          <Badge variant="outline" className="text-orange-500 border-orange-500/20 bg-orange-500/5">
                            Due in {book.due}
                          </Badge>
                        </div>
                        <h3 className="font-medium text-foreground line-clamp-1">{book.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{book.author}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3 mr-1" /> Return to: {book.hub}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Recommended */}
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" /> Recommended for You
              </h2>
              <div className="space-y-3">
                {MOCK_RECOMMENDED.map((book) => (
                  <Card key={book.id} className="bg-card/80 backdrop-blur-sm border-border">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">{book.title}</h3>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {book.available ? (
                          <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 bg-emerald-500/5">Available</Badge>
                        ) : (
                          <Badge variant="outline" className="text-muted-foreground border-border bg-muted/50">Checked Out</Badge>
                        )}
                        <Button size="sm" variant={book.available ? "default" : "outline"} disabled={!book.available}>
                          {book.available ? "Borrow" : "Waitlist"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            {/* Status Card */}
            <Card className="bg-primary text-primary-foreground border-none shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-medium mb-1 text-primary-foreground/80">Membership Status</h3>
                <p className="text-2xl font-serif font-bold mb-4">Premium</p>
                <div className="space-y-2 text-sm text-primary-foreground/80">
                  <div className="flex justify-between">
                    <span>Books Borrowed</span>
                    <span className="font-medium text-primary-foreground">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Money Saved</span>
                    <span className="font-medium text-primary-foreground">₹4,500</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hub Status */}
            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" /> Nearest Hub
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-3 rounded-lg bg-muted/50 border border-border mb-3">
                  <p className="font-medium text-sm">Engineering Block A</p>
                  <p className="text-xs text-muted-foreground">0.2 miles away • Open until 8 PM</p>
                </div>
                <Button variant="outline" className="w-full text-xs h-8">View Map</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}