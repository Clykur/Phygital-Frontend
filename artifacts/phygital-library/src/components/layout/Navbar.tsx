import { Link, useLocation } from "wouter";
import {
  Menu,
  Library,
  Package,
  Shield,
  ClipboardList,
  BookOpen,
  History,
  LogOut,
  Sparkles,
  Wallet,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useAuth } from "@/context/auth-context";
import { ApiError } from "@/lib/api";
import { isPremiumOk } from "@/lib/rbac";
import { signInHref } from "@/lib/sign-in-return";
import { hubOverviewPathForUser, portalPathsForUser } from "@/lib/app-paths";
import { toast } from "sonner";

export function Navbar() {
  const [location] = useLocation();
  const { user, loading, logout, activateDemoPremium } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hubOverviewHref = user ? hubOverviewPathForUser(user) : null;
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [upgradeBusy, setUpgradeBusy] = useState(false);

  const isHome = location === "/";
  const onDarkHero = isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Library", path: "/library" },
    { name: "Discover", path: "/marketplace" },
    { name: "Colleges", path: "/colleges" },
    { name: "About", path: "/about" },
  ];

  const showHubDesk = user && user.hubStaffHubIds.length > 0;
  const deskNav = showHubDesk && user ? portalPathsForUser(user) : null;

  const runUpgrade = async () => {
    setUpgradeBusy(true);
    try {
      await activateDemoPremium(1);
      toast.success("Premium active for this demo.");
      setUpgradeOpen(false);
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : "Could not upgrade");
    } finally {
      setUpgradeBusy(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm py-3"
          : onDarkHero
            ? "bg-gradient-to-b from-slate-950/60 to-transparent backdrop-blur-[2px] py-6"
            : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`w-6 h-6 group-hover:text-amber-500 transition-colors ${onDarkHero ? "text-amber-400" : "text-foreground"}`}
              >
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
                <path
                  d="M12 4.5V19.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span
              className={`font-serif font-medium text-[15px] sm:text-lg tracking-[-0.02em] leading-tight ${onDarkHero ? "text-slate-50" : "text-foreground"}`}
            >
              Phygital <span className={`font-light ${onDarkHero ? "text-amber-300/95" : "text-amber-600"}`}>Library</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive =
                location === link.path || (link.path !== "/" && location.startsWith(link.path));
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm font-medium transition-colors relative group py-2 ${isActive
                      ? onDarkHero
                        ? "text-amber-400"
                        : "text-amber-600"
                      : onDarkHero
                        ? "text-slate-200 hover:text-white"
                        : "text-muted-foreground hover:text-foreground"
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
            {showHubDesk && deskNav && (
              <>
                <Link
                  href={hubOverviewHref!}
                  className={`flex items-center gap-1.5 text-sm font-medium ${location === hubOverviewHref
                      ? onDarkHero
                        ? "text-amber-400"
                        : "text-amber-600"
                      : onDarkHero
                        ? "text-slate-200 hover:text-white"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  <Shield className="h-3.5 w-3.5" />
                  Overview
                </Link>
                <Link
                  href={deskNav.requests}
                  className={`flex items-center gap-1.5 text-sm font-medium ${location === deskNav.requests
                      ? onDarkHero
                        ? "text-amber-400"
                        : "text-amber-600"
                      : onDarkHero
                        ? "text-slate-200 hover:text-white"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  <ClipboardList className="h-3.5 w-3.5" />
                  Book requests
                </Link>
                <Link
                  href={deskNav.inventory}
                  className={`flex items-center gap-1.5 text-sm font-medium ${location === deskNav.inventory
                      ? onDarkHero
                        ? "text-amber-400"
                        : "text-amber-600"
                      : onDarkHero
                        ? "text-slate-200 hover:text-white"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  <Package className="h-3.5 w-3.5" />
                  Inventory
                </Link>
                <Link
                  href={deskNav.catalog}
                  className={`flex items-center gap-1.5 text-sm font-medium ${location === deskNav.catalog
                      ? onDarkHero
                        ? "text-amber-400"
                        : "text-amber-600"
                      : onDarkHero
                        ? "text-slate-200 hover:text-white"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  Catalog
                </Link>
                <Link
                  href={deskNav.activity}
                  className={`flex items-center gap-1.5 text-sm font-medium ${location === deskNav.activity
                      ? onDarkHero
                        ? "text-amber-400"
                        : "text-amber-600"
                      : onDarkHero
                        ? "text-slate-200 hover:text-white"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  <History className="h-3.5 w-3.5" />
                  Activity
                </Link>
                <Link
                  href={deskNav.commerce}
                  className={`flex items-center gap-1.5 text-sm font-medium ${location === deskNav.commerce
                      ? onDarkHero
                        ? "text-amber-400"
                        : "text-amber-600"
                      : onDarkHero
                        ? "text-slate-200 hover:text-white"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  <Wallet className="h-3.5 w-3.5" />
                  Commerce
                </Link>
              </>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <span className={`text-sm ${onDarkHero ? "text-slate-400" : "text-muted-foreground"}`}>…</span>
            ) : user ? (
              <>
                {isPremiumOk(user) ? (
                  <span
                    className={`text-xs font-medium uppercase tracking-wider ${onDarkHero ? "text-emerald-400/90" : "text-emerald-600"}`}
                  >
                    {user.baseRole === "super_admin" && !user.premiumActive ? "Full access" : "Premium"}
                  </span>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className={`rounded-full border-amber-500/50 ${onDarkHero ? "border-amber-400/40 bg-white/5 text-slate-50" : ""}`}
                    onClick={() => setUpgradeOpen(true)}
                  >
                    <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                    Upgrade
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`rounded-full ${onDarkHero ? "text-slate-100 hover:bg-white/10" : ""}`}
                    >
                      Account
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                      {user.publicUserId ?? `${user.userId.slice(0, 8)}…`}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/library" className="flex items-center gap-2">
                        <Library className="h-4 w-4" />
                        Library
                      </Link>
                    </DropdownMenuItem>
                    {showHubDesk && deskNav && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href={hubOverviewHref!} className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Overview
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={deskNav.requests} className="flex items-center gap-2">
                            <ClipboardList className="h-4 w-4" />
                            Book requests
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={deskNav.inventory} className="flex items-center gap-2">
                            <Package className="h-4 w-4" />
                            Inventory
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={deskNav.catalog} className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            Catalog
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={deskNav.activity} className="flex items-center gap-2">
                            <History className="h-4 w-4" />
                            Activity
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={deskNav.commerce} className="flex items-center gap-2">
                            <Wallet className="h-4 w-4" />
                            Commerce
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logout()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className={onDarkHero ? "text-slate-200 hover:text-white" : ""}>
                  <Link href={signInHref(location)}>Sign in</Link>
                </Button>
                <Button
                  asChild
                  className={`rounded-full px-6 shadow-sm ${onDarkHero ? "bg-amber-500 text-slate-950 hover:bg-amber-400" : ""}`}
                >
                  <Link href={signInHref(location)}>Join</Link>
                </Button>
              </>
            )}
          </div>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button type="button" className={`md:hidden p-2 ${onDarkHero ? "text-slate-50" : "text-foreground"}`}>
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-l-border/50 flex flex-col pt-12">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <SheetDescription className="sr-only">Site links and account</SheetDescription>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xl font-serif p-2"
                  >
                    {link.name}
                  </Link>
                ))}
                {showHubDesk && deskNav && (
                  <>
                    <Link
                      href={hubOverviewHref!}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xl font-serif p-2"
                    >
                      Overview
                    </Link>
                    <Link
                      href={deskNav.requests}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xl font-serif p-2"
                    >
                      Book requests
                    </Link>
                    <Link
                      href={deskNav.inventory}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xl font-serif p-2"
                    >
                      Inventory
                    </Link>
                    <Link
                      href={deskNav.catalog}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xl font-serif p-2"
                    >
                      Catalog
                    </Link>
                    <Link
                      href={deskNav.activity}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xl font-serif p-2"
                    >
                      Activity
                    </Link>
                    <Link
                      href={deskNav.commerce}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xl font-serif p-2"
                    >
                      Commerce
                    </Link>
                  </>
                )}
              </div>
              <div className="mt-auto flex flex-col gap-3 border-t border-border pt-8">
                {user && !isPremiumOk(user) && (
                  <Button className="rounded-full" onClick={() => { setMobileMenuOpen(false); setUpgradeOpen(true); }}>
                    Upgrade
                  </Button>
                )}
                {user ? (
                  <Button variant="outline" className="rounded-full" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                    Sign out
                  </Button>
                ) : (
                  <Button asChild className="rounded-full">
                    <Link href={signInHref(location)} onClick={() => setMobileMenuOpen(false)}>
                      Sign in
                    </Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Dialog open={upgradeOpen} onOpenChange={setUpgradeOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Try Premium</DialogTitle>
            <DialogDescription>
              Demo billing extends your subscription by one month. Real payments can replace this
              endpoint later.
            </DialogDescription>
          </DialogHeader>
          <Button className="w-full rounded-full bg-amber-500 text-slate-950 hover:bg-amber-400" disabled={upgradeBusy} onClick={() => void runUpgrade()}>
            {upgradeBusy ? "…" : "Activate demo Premium"}
          </Button>
        </DialogContent>
      </Dialog>
    </header>
  );
}
