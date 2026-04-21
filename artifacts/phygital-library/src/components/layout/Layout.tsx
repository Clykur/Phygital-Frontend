import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col w-full selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="flex-1 w-full pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}