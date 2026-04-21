import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SlidersHorizontal, Heart, MapPin, BookOpen, MessageCircle } from "lucide-react";
import { useState, useMemo } from "react";
import cover1 from "@/assets/images/book-cover-1.png";
import cover2 from "@/assets/images/book-cover-2.png";
import cover3 from "@/assets/images/book-cover-3.png";
import cover4 from "@/assets/images/book-cover-4.png";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MOCK_LISTINGS = [
  { id: 1, title: "Calculus: Early Transcendentals", author: "James Stewart", condition: "Like New", price: 850, category: "Science", seller: "Rahul M.", location: "Engineering Block A", distance: "0.2 miles", cover: cover1 },
  { id: 2, title: "Organic Chemistry", author: "Paula Y. Bruice", condition: "Good", price: 450, category: "Science", seller: "Priya S.", location: "Main Library", distance: "0.5 miles", cover: cover2 },
  { id: 3, title: "Computer Networks", author: "Andrew S. Tanenbaum", condition: "Fair", price: 300, category: "Engineering", seller: "Amit K.", location: "CS Dept", distance: "0.3 miles", cover: cover3 },
  { id: 4, title: "Microelectronic Circuits", author: "Adel S. Sedra", condition: "Like New", price: 900, category: "Engineering", seller: "Neha Gupta", location: "Engineering Block B", distance: "0.4 miles", cover: cover4 },
  { id: 5, title: "Database System Concepts", author: "Abraham Silberschatz", condition: "Good", price: 500, category: "Engineering", seller: "Vikram R.", location: "Main Library", distance: "0.5 miles", cover: cover1 },
  { id: 6, title: "Engineering Mechanics", author: "R.C. Hibbeler", condition: "Fair", price: 250, category: "Engineering", seller: "Sneha P.", location: "Mech Dept", distance: "0.6 miles", cover: cover2 },
  { id: 7, title: "Data Structures", author: "Mark Allen Weiss", condition: "Good", price: 400, category: "Engineering", seller: "Rohan D.", location: "CS Dept", distance: "0.3 miles", cover: cover3 },
  { id: 8, title: "Modern Physics", author: "Kenneth Krane", condition: "Like New", price: 750, category: "Science", seller: "Anjali M.", location: "Physics Block", distance: "0.8 miles", cover: cover4 },
  { id: 9, title: "Principles of Economics", author: "N. Gregory Mankiw", condition: "Good", price: 600, category: "Business", seller: "Karan S.", location: "Business School", distance: "1.2 miles", cover: cover1 },
  { id: 10, title: "Marketing Management", author: "Philip Kotler", condition: "Like New", price: 800, category: "Business", seller: "Riya J.", location: "Business School", distance: "1.2 miles", cover: cover2 },
  { id: 11, title: "A History of Modern India", author: "Ishita Banerjee-Dube", condition: "Fair", price: 350, category: "Humanities", seller: "Arjun P.", location: "Arts Block", distance: "0.9 miles", cover: cover3 },
  { id: 12, title: "Introduction to Psychology", author: "Clifford T. Morgan", condition: "Good", price: 450, category: "Humanities", seller: "Meera K.", location: "Arts Block", distance: "0.9 miles", cover: cover4 },
  { id: 13, title: "Gray's Anatomy for Students", author: "Richard Drake", condition: "Good", price: 1200, category: "Medicine", seller: "Dr. Sharma", location: "Med School Library", distance: "2.1 miles", cover: cover1 },
  { id: 14, title: "Robbins Basic Pathology", author: "Vinay Kumar", condition: "Like New", price: 1500, category: "Medicine", seller: "Suresh R.", location: "Med School Library", distance: "2.1 miles", cover: cover2 },
  { id: 15, title: "Digital Design", author: "M. Morris Mano", condition: "Fair", price: 200, category: "Engineering", seller: "Nisha T.", location: "ECE Dept", distance: "0.4 miles", cover: cover3 },
  { id: 16, title: "Fundamentals of Management", author: "Stephen P. Robbins", condition: "Like New", price: 700, category: "Business", seller: "Tarun V.", location: "Business School", distance: "1.2 miles", cover: cover4 },
  { id: 17, title: "Financial Accounting", author: "Walter T. Harrison", condition: "Good", price: 550, category: "Business", seller: "Pooja M.", location: "Business School", distance: "1.2 miles", cover: cover1 },
  { id: 18, title: "Software Engineering", author: "Ian Sommerville", condition: "Good", price: 650, category: "Engineering", seller: "Vishal B.", location: "CS Dept", distance: "0.3 miles", cover: cover2 },
  { id: 19, title: "Concepts of Genetics", author: "William S. Klug", condition: "Fair", price: 400, category: "Science", seller: "Swati N.", location: "Bio Block", distance: "1.0 miles", cover: cover3 },
  { id: 20, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", condition: "Like New", price: 450, category: "Humanities", seller: "Rohit C.", location: "Arts Block", distance: "0.9 miles", cover: cover4 },
];

const CATEGORIES = ["All", "Engineering", "Science", "Humanities", "Business", "Medicine"];
const CONDITIONS = ["All", "New", "Like New", "Good", "Fair"];
const SORTS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" }
];

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [condition, setCondition] = useState("All");
  const [priceRange, setPriceRange] = useState([2000]);
  const [sort, setSort] = useState("newest");
  
  const [savedBooks, setSavedBooks] = useState<Set<number>>(new Set());
  const [selectedBook, setSelectedBook] = useState<typeof MOCK_LISTINGS[0] | null>(null);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState("");

  const filteredListings = useMemo(() => {
    let result = [...MOCK_LISTINGS];
    
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
    }
    
    if (category !== "All") {
      result = result.filter(b => b.category === category);
    }
    
    if (condition !== "All") {
      result = result.filter(b => b.condition === condition);
    }
    
    result = result.filter(b => b.price <= priceRange[0]);
    
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      // newest and popular keep default mock order for simplicity
      default:
        break;
    }
    
    return result;
  }, [search, category, condition, priceRange, sort]);

  const toggleSave = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setSavedBooks(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast("Removed from saved list.");
      } else {
        next.add(id);
        toast.success("Saved to your list.");
      }
      return next;
    });
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setCondition("All");
    setPriceRange([2000]);
    setSort("newest");
  };

  const handleAction = (action: string) => {
    toast.success(`Successfully ${action}! We've sent details to your email.`);
    setSelectedBook(null);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent to seller!");
    setMessageOpen(false);
    setMessageText("");
  };

  return (
    <div className="min-h-[100dvh] bg-background pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-3">Discover</h1>
            <p className="text-lg text-muted-foreground font-light">Buy and sell textbooks directly with peers on campus.</p>
          </div>
          <Button className="rounded-full h-12 px-6 shadow-md font-medium" onClick={() => toast.success("List a book feature coming soon!")}>
            List a Book
          </Button>
        </div>

        {/* Search & Filter Bar - Desktop */}
        <div className="hidden lg:flex flex-col sm:flex-row gap-4 mb-8 bg-card p-2 rounded-2xl border border-border shadow-sm">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by title or author..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <div className="w-[1px] bg-border mx-2" />
          
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[160px] border-none bg-transparent h-12 focus:ring-0">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>

          <div className="w-[1px] bg-border mx-2" />

          <Select value={condition} onValueChange={setCondition}>
            <SelectTrigger className="w-[140px] border-none bg-transparent h-12 focus:ring-0">
              <SlidersHorizontal className="w-4 h-4 mr-2 text-muted-foreground inline-block" />
              <SelectValue placeholder="Condition" />
            </SelectTrigger>
            <SelectContent>
              {CONDITIONS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>

          <div className="w-[1px] bg-border mx-2" />
          
          <div className="flex items-center px-4 gap-4 w-[200px]">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Max ₹{priceRange[0]}</span>
            <Slider 
              value={priceRange} 
              onValueChange={setPriceRange} 
              max={2000} 
              step={50}
              className="w-full"
            />
          </div>

          <div className="w-[1px] bg-border mx-2" />
          
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[160px] border-none bg-transparent h-12 focus:ring-0">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORTS.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Mobile Filters */}
        <div className="lg:hidden flex gap-2 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-card text-sm focus:outline-none"
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="h-10 px-4 rounded-xl"><Filter className="w-4 h-4 mr-2" /> Filters</Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Refine your search results.</SheetDescription>
              </SheetHeader>
              <div className="space-y-6 py-6">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Condition</Label>
                  <Select value={condition} onValueChange={setCondition}>
                    <SelectTrigger><SelectValue placeholder="Condition" /></SelectTrigger>
                    <SelectContent>
                      {CONDITIONS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <Label>Max Price: ₹{priceRange[0]}</Label>
                  <Slider value={priceRange} onValueChange={setPriceRange} max={2000} step={50} />
                </div>
                <div className="space-y-2">
                  <Label>Sort By</Label>
                  <Select value={sort} onValueChange={setSort}>
                    <SelectTrigger><SelectValue placeholder="Sort by" /></SelectTrigger>
                    <SelectContent>
                      {SORTS.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full" onClick={clearFilters} variant="outline">Reset Filters</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Results Header */}
        <div className="mb-6 flex justify-between items-center text-sm text-muted-foreground">
          <span>Showing {filteredListings.length} {filteredListings.length === 1 ? 'book' : 'books'}</span>
          {(search || category !== "All" || condition !== "All" || priceRange[0] < 2000) && (
            <button onClick={clearFilters} className="text-amber-600 hover:text-amber-700 font-medium">Clear filters</button>
          )}
        </div>

        {/* Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            <AnimatePresence mode="popLayout">
              {filteredListings.map((listing, i) => (
                <motion.div 
                  layout
                  key={listing.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer flex flex-col"
                  onClick={() => setSelectedBook(listing)}
                >
                  {/* Book Cover */}
                  <div className="aspect-[3/4] mb-4 relative rounded-md overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1">
                    <img src={listing.cover} alt={listing.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Condition Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-background/90 backdrop-blur-md border-none text-[10px] sm:text-xs font-medium text-foreground shadow-sm px-2 py-0.5">
                        {listing.condition}
                      </Badge>
                    </div>
                    
                    {/* Save Button */}
                    <button 
                      onClick={(e) => toggleSave(e, listing.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-sm"
                    >
                      <Heart className={`w-4 h-4 ${savedBooks.has(listing.id) ? 'fill-amber-500 text-amber-500' : ''}`} />
                    </button>
                    
                    {/* Hover Action */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                       <Button size="sm" className="rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 border-none shadow-lg h-8 px-6 text-xs font-medium">
                         Quick View
                       </Button>
                    </div>
                  </div>
                  
                  {/* Details */}
                  <div className="px-1 flex-1 flex flex-col">
                    <h3 className="font-serif font-medium text-foreground line-clamp-1 text-base sm:text-lg group-hover:text-amber-600 transition-colors">{listing.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{listing.author}</p>
                    
                    <div className="mt-auto flex items-center justify-between pt-1">
                      <span className="font-medium text-foreground text-lg">₹{listing.price}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground hidden sm:inline-block">Seller: {listing.seller.split(' ')[0]}</span>
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-foreground border border-border">
                          {listing.seller.charAt(0)}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center border border-dashed rounded-2xl bg-card/30"
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">No books found</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">We couldn't find any books matching your current filters. Try adjusting your search criteria.</p>
            <Button onClick={clearFilters} variant="outline" className="rounded-full">Clear all filters</Button>
          </motion.div>
        )}
        
        {filteredListings.length > 0 && (
          <div className="mt-16 flex justify-center">
             <Button variant="outline" className="rounded-full h-12 px-8" onClick={() => toast("No more results to load.")}>Load More Listings</Button>
          </div>
        )}

      </div>

      {/* Book Detail Dialog */}
      <Dialog open={!!selectedBook} onOpenChange={(open) => !open && setSelectedBook(null)}>
        <DialogContent className="max-w-2xl bg-card border-border p-0 overflow-hidden">
          {selectedBook && (
            <div className="flex flex-col md:flex-row h-full max-h-[80vh] md:max-h-[500px]">
              {/* Image Side */}
              <div className="w-full md:w-2/5 bg-muted relative shrink-0">
                <img src={selectedBook.cover} alt={selectedBook.title} className="w-full h-full object-cover" />
                <button 
                  onClick={(e) => toggleSave(e, selectedBook.id)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-sm"
                >
                  <Heart className={`w-5 h-5 ${savedBooks.has(selectedBook.id) ? 'fill-amber-500 text-amber-500' : ''}`} />
                </button>
              </div>
              
              {/* Content Side */}
              <div className="flex-1 p-6 md:p-8 flex flex-col overflow-y-auto">
                <div className="mb-2">
                  <Badge variant="outline" className="mb-3 text-xs">{selectedBook.category}</Badge>
                  <h2 className="text-2xl md:text-3xl font-serif font-medium leading-tight mb-2">{selectedBook.title}</h2>
                  <p className="text-muted-foreground text-lg">{selectedBook.author}</p>
                </div>
                
                <div className="flex items-center gap-4 my-6 py-4 border-y border-border/50">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Condition</p>
                    <p className="font-medium">{selectedBook.condition}</p>
                  </div>
                  <div className="w-[1px] h-8 bg-border" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Price</p>
                    <p className="font-medium text-lg">₹{selectedBook.price}</p>
                  </div>
                </div>
                
                <div className="mb-8 space-y-4">
                  <div className="flex items-start gap-3 bg-muted/30 p-3 rounded-lg">
                    <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Located at {selectedBook.location}</p>
                      <p className="text-xs text-muted-foreground">{selectedBook.distance} away from you</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-muted/30 p-3 rounded-lg">
                    <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {selectedBook.seller.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">Seller: {selectedBook.seller}</p>
                      <p className="text-xs text-muted-foreground">Very responsive • 4.9 ★</p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3">
                  <Button onClick={() => handleAction('borrowed')} variant="outline" className="w-full h-12">
                    <BookOpen className="w-4 h-4 mr-2" /> Borrow ₹49/day
                  </Button>
                  <Button onClick={() => handleAction('purchased')} className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-slate-950">
                    Buy for ₹{selectedBook.price}
                  </Button>
                  <Button onClick={() => setMessageOpen(true)} variant="ghost" className="col-span-2 w-full h-12 border border-dashed border-border">
                    <MessageCircle className="w-4 h-4 mr-2" /> Message Seller
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Message Dialog */}
      <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle>Message {selectedBook?.seller}</DialogTitle>
            <DialogDescription>
              Ask about {selectedBook?.title}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={sendMessage} className="space-y-4 py-4">
            <Textarea 
              placeholder="Hi, is this still available?" 
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="resize-none h-32 bg-background"
              required
            />
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
