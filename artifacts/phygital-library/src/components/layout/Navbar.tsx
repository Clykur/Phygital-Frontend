import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [role, setRole] = useState("student");

  const isHome = location === "/";
  const onDarkHero = isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Discover", path: "/marketplace" },
    { name: "Students", path: "/student" },
    { name: "Colleges", path: "/colleges" },
    { name: "About", path: "/about" },
  ];

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("We'll be in touch — welcome to the Network.");
    setJoinDialogOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm py-3"
          : onDarkHero
            ? "bg-gradient-to-b from-slate-950/60 to-transparent backdrop-blur-[2px] py-6"
            : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            {/* Custom Monogram */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 group-hover:text-amber-500 transition-colors ${onDarkHero ? "text-amber-400" : "text-foreground"}`}>
                <path d="M4 19.5V4.5C4 3.67157 4.67157 3 5.5 3H10.5C11.3284 3 12 3.67157 12 4.5V19.5C12 20.3284 11.3284 21 10.5 21H5.5C4.67157 21 4 20.3284 4 19.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 4.5C12 3.67157 12.6716 3 13.5 3H18.5C19.3284 3 20 3.67157 20 4.5V19.5C20 20.3284 19.3284 21 18.5 21H13.5C12.6716 21 12 20.3284 12 19.5V4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 4.5V19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className={`font-serif font-medium text-lg tracking-tight ${onDarkHero ? "text-slate-50" : "text-foreground"}`}>
              PSLN
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location === link.path || (link.path !== '/' && location.startsWith(link.path));
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm font-medium transition-colors relative group py-2 ${
                    isActive
                      ? onDarkHero ? "text-amber-400" : "text-amber-600"
                      : onDarkHero ? "text-slate-200 hover:text-white" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-1 bg-amber-500 rounded-t-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" onClick={() => setJoinDialogOpen(true)} className={`hidden lg:inline-flex hover:bg-transparent transition-colors ${onDarkHero ? "text-slate-200 hover:text-white" : "hover:text-amber-600"}`}>Sign In</Button>
            <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
              <DialogTrigger asChild>
                <Button className={`rounded-full px-6 shadow-sm transition-colors ${onDarkHero ? "bg-amber-500 text-slate-950 hover:bg-amber-400" : "bg-foreground text-background hover:bg-foreground/90"}`}>
                  Join Network
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl">Join PSLN</DialogTitle>
                  <DialogDescription>
                    Enter your details to join the network or sign in to your account.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleJoinSubmit} className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Alex Sharma" required className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input id="email" type="email" placeholder="alex@example.com" required className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">I am a...</Label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="college">College Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-full mt-4">
                    Continue
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile Menu Toggle */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className={`md:hidden p-2 ${onDarkHero ? "text-slate-50" : "text-foreground"}`}>
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-l-border/50 flex flex-col pt-12">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">Access site pages and actions.</SheetDescription>
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => {
                  const isActive = location === link.path || (link.path !== '/' && location.startsWith(link.path));
                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-2xl font-serif tracking-tight p-2 flex items-center ${
                        isActive
                          ? "text-amber-600"
                          : "text-foreground"
                      }`}
                    >
                      {link.name}
                      {isActive && <div className="w-2 h-2 ml-3 rounded-full bg-amber-500" />}
                    </Link>
                  );
                })}
                <div className="pt-8 border-t border-border/50 flex flex-col gap-4 mt-auto">
                  <Button variant="outline" onClick={() => { setMobileMenuOpen(false); setJoinDialogOpen(true); }} className="w-full justify-center h-12 rounded-full border-border/50">Sign In</Button>
                  <Button onClick={() => { setMobileMenuOpen(false); setJoinDialogOpen(true); }} className="w-full justify-center h-12 rounded-full bg-foreground text-background">Join Network</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
