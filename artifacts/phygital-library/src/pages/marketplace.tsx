import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import cover1 from "@/assets/images/book-cover-1.png";
import cover2 from "@/assets/images/book-cover-2.png";
import cover3 from "@/assets/images/book-cover-3.png";
import cover4 from "@/assets/images/book-cover-4.png";

const MOCK_LISTINGS = [
  { id: 1, title: "Calculus: Early Transcendentals", author: "James Stewart", condition: "Like New", price: "₹850", seller: "Rahul M.", cover: cover1 },
  { id: 2, title: "Organic Chemistry", author: "Paula Y. Bruice", condition: "Good", price: "₹450", seller: "Priya S.", cover: cover2 },
  { id: 3, title: "Computer Networks", author: "Andrew S. Tanenbaum", condition: "Fair", price: "₹300", seller: "Amit K.", cover: cover3 },
  { id: 4, title: "Microelectronic Circuits", author: "Adel S. Sedra", condition: "Like New", price: "₹900", seller: "Neha Gupta", cover: cover4 },
  { id: 5, title: "Database System Concepts", author: "Abraham Silberschatz", condition: "Good", price: "₹500", seller: "Vikram R.", cover: cover1 },
  { id: 6, title: "Engineering Mechanics", author: "R.C. Hibbeler", condition: "Fair", price: "₹250", seller: "Sneha P.", cover: cover2 },
  { id: 7, title: "Data Structures", author: "Mark Allen Weiss", condition: "Good", price: "₹400", seller: "Rohan D.", cover: cover3 },
  { id: 8, title: "Modern Physics", author: "Kenneth Krane", condition: "Like New", price: "₹750", seller: "Anjali M.", cover: cover4 },
];

export default function Marketplace() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-3">Marketplace</h1>
            <p className="text-lg text-muted-foreground font-light">Buy and sell textbooks directly with peers on campus.</p>
          </div>
          <Button className="rounded-full h-12 px-6 shadow-md font-medium">
            List a Book
          </Button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 bg-card p-2 rounded-2xl border border-border shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by title, author, or ISBN..." 
              className="w-full h-12 pl-12 pr-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <div className="w-[1px] bg-border hidden sm:block mx-2" />
          <Button variant="ghost" className="h-12 px-6 rounded-xl text-muted-foreground hover:text-foreground">
            <SlidersHorizontal className="w-4 h-4 mr-2" /> Condition
          </Button>
          <Button variant="ghost" className="h-12 px-6 rounded-xl text-muted-foreground hover:text-foreground">
            <Filter className="w-4 h-4 mr-2" /> All Filters
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {MOCK_LISTINGS.map((listing, i) => (
            <motion.div 
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
              className="group cursor-pointer"
            >
              {/* Book Cover */}
              <div className="aspect-[3/4] mb-4 relative rounded-md overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                <img src={listing.cover} alt={listing.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Condition Badge */}
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur-md border-none text-xs font-medium text-foreground shadow-sm">
                    {listing.condition}
                  </Badge>
                </div>
                
                {/* Hover Action */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                   <Button size="sm" className="rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 border-none shadow-lg h-8 px-6 text-xs font-medium">
                     Quick View
                   </Button>
                </div>
              </div>
              
              {/* Details */}
              <div className="px-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-serif font-medium text-foreground line-clamp-1 text-lg group-hover:text-amber-600 transition-colors">{listing.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{listing.author}</p>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground text-lg">{listing.price}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Seller: {listing.seller.split(' ')[0]}</span>
                    <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[9px] font-bold text-foreground">
                      {listing.seller.charAt(0)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
           <Button variant="outline" className="rounded-full h-12 px-8">Load More Listings</Button>
        </div>

      </div>
    </div>
  );
}
