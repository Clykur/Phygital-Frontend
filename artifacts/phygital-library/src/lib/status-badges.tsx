import { Badge } from "@/components/ui/badge";
import { peerShelfStatusLabel } from "@/lib/catalog-sort";
import { cn } from "@/lib/utils";

/** Same geometry as desk filter controls: `SelectTrigger` / inputs (`rounded-md border-border`, `h-8` chip height, uppercase label). */
export const shelfFilterChipClass =
  "inline-flex h-8 max-w-full min-w-0 shrink-0 items-center justify-center gap-1 rounded-md border border-border bg-background px-2.5 text-[10px] font-bold uppercase tracking-wide text-foreground antialiased";

/** For chips over cover art — read legible, still the same border/radius. */
export const shelfFilterChipOnCoverClass = "border-border/80 bg-background/90 shadow-sm backdrop-blur-sm";

/** Same chip shape on dark card overlays (prices / meta row). */
export const shelfFilterChipOnDarkClass =
  "inline-flex h-8 max-w-full min-w-0 shrink-0 items-center justify-center gap-1 rounded-md border border-white/20 bg-white/10 px-2.5 text-[10px] font-bold uppercase tracking-wide text-white/95 shadow-sm backdrop-blur-sm";

/** Staff-facing label: reserved copies are held for desk pickup. */
export function hubBookStatusLabel(status: string): string {
  if (status === "reserved") return "Set aside";
  if (status === "transfer_pending") return "Transfer pending";
  if (status === "in_transit") return "In transit";
  return status.replace(/_/g, " ");
}

function hubBookChipTone(status: string): string {
  switch (status) {
    case "available":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-950 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-100";
    case "sold":
      return "border-muted-foreground/25 bg-muted/50 text-muted-foreground";
    case "unavailable":
    case "overdue":
      return "border-destructive/30 bg-destructive/10 text-destructive";
    case "checked_out":
      return "border-amber-500/35 bg-amber-500/10 text-amber-950 dark:text-amber-100";
    case "reserved":
      return "border-sky-500/35 bg-sky-500/10 text-sky-950 dark:text-sky-100";
    case "transfer_pending":
    case "in_transit":
      return "border-violet-500/35 bg-violet-500/10 text-violet-950 dark:text-violet-100";
    default:
      return "";
  }
}

export function HubBookStatusBadge({
  status,
  className,
  /** `false` for table / light surfaces (chips sit on page background, not on cover art). @default true */
  onCover = true,
}: {
  status: string;
  className?: string;
  onCover?: boolean;
}) {
  return (
    <span
      className={cn(
        shelfFilterChipClass,
        onCover ? shelfFilterChipOnCoverClass : null,
        hubBookChipTone(status),
        className,
      )}
      role="status"
    >
      {hubBookStatusLabel(status)}
    </span>
  );
}

export function p2pBadgeVariant(
  status: string,
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "approved":
    case "available":
      return "default";
    case "sold":
      return "secondary";
    case "listed":
      return "outline";
    case "pending_dropoff":
      return "outline";
    case "borrowed":
    case "reserved":
      return "default";
    case "rejected":
      return "destructive";
    default:
      return "outline";
  }
}

export function P2pStatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <Badge variant={p2pBadgeVariant(status)} className={cn("text-[10px] uppercase", className)}>
      {status.replace("_", " ")}
    </Badge>
  );
}

/** P2P pipeline listing (desk) — same labels as `hub-desk-p2p-listings` status filter copy. */
export function p2pPipelineStatusLabel(s: string): string {
  switch (s) {
    case "listed":
      return "Listed (online)";
    case "pending_dropoff":
      return "Pending drop-off";
    case "available":
      return "On marketplace";
    case "reserved":
      return "Reserved";
    case "sold":
      return "Sold";
    case "expired":
      return "Expired";
    case "rejected":
      return "Rejected";
    default:
      return s.replace(/_/g, " ");
  }
}

function p2pPipelineChipTone(status: string): string {
  switch (status) {
    case "listed":
      return "border-sky-500/35 bg-sky-500/10 text-sky-950 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-100";
    case "pending_dropoff":
      return "border-violet-500/35 bg-violet-500/10 text-violet-950 dark:border-violet-500/40 dark:bg-violet-500/10 dark:text-violet-100";
    case "available":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-950 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-100";
    case "reserved":
      return "border-amber-500/35 bg-amber-500/10 text-amber-950 dark:text-amber-100";
    case "sold":
      return "border-muted-foreground/25 bg-muted/50 text-muted-foreground";
    case "expired":
    case "rejected":
      return "border-destructive/30 bg-destructive/10 text-destructive";
    default:
      return "";
  }
}

/** Cover corner badge for peer pipeline listings (hub desk P2P), matching All copies placement. */
export function P2pPipelineCoverStatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        shelfFilterChipClass,
        shelfFilterChipOnCoverClass,
        p2pPipelineChipTone(status),
        "normal-case", // labels like "Listed (online)" are mixed case
        "font-semibold",
        className,
      )}
      role="status"
    >
      {p2pPipelineStatusLabel(status)}
    </span>
  );
}

/** Peer tiles on the shelf: **approved** is labeled **available** (same idea as hub on-shelf). */
function shelfPeerChipTone(status: string): string {
  switch (status) {
    case "approved":
    case "available":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-950 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-100";
    case "sold":
      return "border-muted-foreground/25 bg-muted/50 text-muted-foreground";
    case "borrowed":
    case "reserved":
      return "border-amber-500/35 bg-amber-500/10 text-amber-950 dark:text-amber-100";
    case "rejected":
      return "border-destructive/30 bg-destructive/10 text-destructive";
    default:
      return "";
  }
}

export function ShelfPeerStatusBadge({
  status,
  className,
  onCover = true,
}: {
  status: string;
  className?: string;
  onCover?: boolean;
}) {
  return (
    <span
      className={cn(
        shelfFilterChipClass,
        onCover ? shelfFilterChipOnCoverClass : null,
        shelfPeerChipTone(status),
        className,
      )}
      role="status"
    >
      {peerShelfStatusLabel(status)}
    </span>
  );
}

export function requestStatusLabel(status: string): string {
  switch (status) {
    case "requested":
      return "New";
    case "routed":
      return "Finding";
    case "fulfilled":
      return "Set aside";
    case "ready":
      return "In catalog";
    case "picked":
      return "Completed";
    case "expired":
      return "Timed out";
    case "cancelled":
      return "Withdrawn";
    default:
      return status.replace(/_/g, " ");
  }
}

export function RequestStatusBadge({ status, className }: { status: string; className?: string }) {
  const variant =
    status === "expired" || status === "cancelled"
      ? ("destructive" as const)
      : status === "ready"
        ? ("default" as const)
        : status === "picked"
          ? ("secondary" as const)
          : status === "fulfilled"
            ? ("default" as const)
            : ("outline" as const);
  const label = requestStatusLabel(status);
  return (
    <Badge variant={variant} className={cn("text-[10px] capitalize", className)}>
      {label}
    </Badge>
  );
}
