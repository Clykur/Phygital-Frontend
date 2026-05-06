import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("py-14 md:py-20", className)}>
      {children}
    </section>
  );
}

