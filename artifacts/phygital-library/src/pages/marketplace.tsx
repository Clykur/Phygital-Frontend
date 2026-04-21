import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, BookOpen } from "lucide-react";

const MOCK_LISTINGS = [
  { id: 1, title: "Calculus: Early Transcendentals", author: "James Stewart", condition: "Like New", price: "₹850", seller: "Rahul M.", type: "Sale" },
  { id: 2, title: "Organic Chemistry", author: "Paula Y. Bruice", condition: "Good", price: "₹450", seller: "Priya S.", type: "Sale" },
  { id: 3, title: "Computer Networks", author: "Andrew S. Tanenbaum", condition: "Fair", price: "₹300", seller: "Amit K.", type: "Sale" },
  { id: 4, title: "Microelectronic Circuits", author: "Adel S. Sedra", condition: "Like New", price: "₹900", seller: "Neha Gupta", type: "Sale" },
  { id: 5, title: "Database System Concepts", author: "Abraham Silberschatz", condition: "Good", price: "₹500", seller: "Vikram R.", type: "Sale" },
  { id: 6, title: "Engineering Mechanics", author: "R.C. Hibbeler", condition: "Fair", price: "₹250", seller: "Sneha P.", type: "Sale" },
];

export default function Marketplace() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Student Marketplace</h1>
            <p className="text-muted-foreground">Buy and sell textbooks directly with peers on campus.</p>
          </div>
          <Button className="rounded-full shadow-md">List a Book</Button>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by title, author, or ISBN..." 
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-card shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
          <Button variant="outline" className="h-12 px-6 rounded-xl border-border bg-card">
            <Filter className="w-4 h-4 mr-2" /> Filters
          </Button>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_LISTINGS.map((listing, i) => (
            <motion.div 
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -4 }}
            >
              <Card className="h-full bg-card border-border overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="h-48 bg-muted/50 flex items-center justify-center p-4">
                   <div className="w-24 h-32 bg-card border border-border shadow-sm rounded flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10"></div>
                      <BookOpen className="w-8 h-8 text-primary/40 relative z-10" />
                   </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="bg-background text-xs font-normal border-border">
                      {listing.condition}
                    </Badge>
                    <span className="font-bold text-lg text-primary">{listing.price}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{listing.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-1">{listing.author}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                        {listing.seller.charAt(0)}
                      </div>
                      <span className="text-xs text-muted-foreground">{listing.seller}</span>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 text-xs hover:bg-primary/10 hover:text-primary">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}