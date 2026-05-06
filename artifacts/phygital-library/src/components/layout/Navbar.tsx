import { Link, useLocation } from "wouter";
import {
  Menu,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = location === "/";
  const [showNav, setShowNav] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setShowNav(true);
      return;
    }
    const update = () => {
      setShowNav(window.scrollY > window.innerHeight * 0.92);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isHome]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "Colleges", path: "/colleges" },
    { name: "About", path: "/about" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b bg-white transition-[transform,opacity,visibility] duration-300 ease-out motion-reduce:transition-none",
        showNav ? "translate-y-0 border-border opacity-100 visible" : "pointer-events-none -translate-y-full border-transparent opacity-0 invisible",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center border border-border bg-white">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foreground">
              <path
                d="M4 19.5V4.5C4 3.67157 4.67157 3 5.5 3H10.5C11.3284 3 12 3.67157 12 4.5V19.5C12 20.3284 11.3284 21 10.5 21H5.5C4.67157 21 4 20.3284 4 19.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 4.5C12 3.67157 12.6716 3 13.5 3H18.5C19.3284 3 20 3.67157 20 4.5V19.5C20 20.3284 19.3284 21 18.5 21H13.5C12.6716 21 12 20.3284 12 19.5V4.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M12 4.5V19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-[var(--font-display)] text-sm font-extrabold tracking-tight text-foreground">
            Neeve
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = location === link.path || (link.path !== "/" && location.startsWith(link.path));
            return (
              <Link
                key={link.path}
                href={link.path}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive ? "font-semibold text-primary" : "text-[#334155] hover:text-foreground",
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex">
            <Button asChild size="default">
              <Link href="/sign-in">Get Started</Link>
            </Button>
          </div>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="md:hidden inline-flex h-12 w-12 items-center justify-center border border-border bg-white text-foreground"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-l border-border flex flex-col pt-12">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <SheetDescription className="sr-only">Site links and account</SheetDescription>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => {
                  const isActive =
                    location === link.path || (link.path !== "/" && location.startsWith(link.path));
                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "text-lg font-semibold transition-colors",
                        isActive ? "text-primary" : "text-foreground",
                      )}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
              <div className="mt-auto flex flex-col gap-3 border-t border-border pt-8">
                <Button asChild onClick={() => setMobileMenuOpen(false)}>
                  <Link href="/sign-in">Get Started</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}