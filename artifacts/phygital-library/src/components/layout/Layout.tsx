import { ReactNode } from "react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const padForFixedNav = location !== "/";

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      <Navbar />
      <main className={cn("flex-1 w-full flex flex-col", padForFixedNav && "pt-16")}>{children}</main>
      <Footer />
    </div>
  );
}
