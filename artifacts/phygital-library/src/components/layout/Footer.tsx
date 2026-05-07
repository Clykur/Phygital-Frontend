import { Link, useLocation } from "wouter";

export function Footer() {
  const [location] = useLocation();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" onClick={handleLogoClick} className="flex items-center gap-3">
              <img src="/images/neev.png" alt="Neeve Logo" className="h-16 w-32" />
            </Link>
            <p className="mt-4 body-scale text-[#64748B]">
              The modern student library network for faster access, lower costs, and better reuse across campuses.
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm font-semibold text-foreground">Navigation</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/" className="text-sm md:text-base text-[#334155] hover:text-foreground transition-colors">Home</Link></li>
              <li><Link href="/marketplace" className="text-sm md:text-base text-[#334155] hover:text-foreground transition-colors">Marketplace</Link></li>
              <li><Link href="/colleges" className="text-sm md:text-base text-[#334155] hover:text-foreground transition-colors">Colleges</Link></li>
              <li><Link href="/about" className="text-sm md:text-base text-[#334155] hover:text-foreground transition-colors">About</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-sm font-semibold text-foreground">Contact</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a className="text-sm md:text-base text-[#334155] hover:text-foreground transition-colors" href="mailto:hello@phygitallibrary.com">hello@phygitallibrary.com</a></li>
              <li><a className="text-sm md:text-base text-[#334155] hover:text-foreground transition-colors" href="#">LinkedIn</a></li>
              <li><a className="text-sm md:text-base text-[#334155] hover:text-foreground transition-colors" href="#">Twitter</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-sm font-semibold text-foreground">Trust</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="text-sm md:text-base text-[#334155] hover:text-foreground transition-colors">Privacy</Link></li>
              <li><Link href="#" className="text-sm md:text-base text-[#334155] hover:text-foreground transition-colors">Terms</Link></li>
              <li><Link href="#" className="text-sm md:text-base text-[#334155] hover:text-foreground transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-sm text-[#64748B]">© {new Date().getFullYear()} Neeve. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}