import { Link } from "wouter";
import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card relative overflow-hidden border-t border-border pt-16 pb-8">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <span className="font-serif font-semibold text-xl tracking-tight text-foreground">
                PSLN
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              The phygital library network for modern students. Discover, borrow, and pick up books with zero friction.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-3">
              <li><Link href="/student" className="text-sm text-muted-foreground hover:text-primary transition-colors">Students</Link></li>
              <li><Link href="/colleges" className="text-sm text-muted-foreground hover:text-primary transition-colors">Colleges</Link></li>
              <li><Link href="/marketplace" className="text-sm text-muted-foreground hover:text-primary transition-colors">Marketplace</Link></li>
              <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Phygital Student Library Network. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span className="w-2 h-2 rounded-full bg-primary/50"></span>
            <span className="w-2 h-2 rounded-full bg-secondary/50"></span>
            <span className="w-2 h-2 rounded-full bg-accent/50"></span>
          </div>
        </div>
      </div>
    </footer>
  );
}