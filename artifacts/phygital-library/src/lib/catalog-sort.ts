/** Client-side catalog ordering and pagination (shared by Borrow & buy + Library). */
export const CATALOG_PAGE_SIZE = 20;

/** Lower rank sorts earlier. Available / buyable-first. */
export function hubStatusRank(status: string): number {
  switch (status) {
    case "available":
      return 0;
    case "reserved":
      return 1;
    case "checked_out":
    case "overdue":
      return 2;
    case "unavailable":
      return 8;
    case "sold":
      return 9;
    case "transfer_pending":
    case "in_transit":
      return 6;
    default:
      return 4;
  }
}

/**
 * On-shelf peer copies (`available`) first, then reserved (rent), then pipeline states.
 * Keep in sync with `hubP2pPipelineListingsOrderBy` in the API (desk P2P pipeline query).
 */
export function p2pShelfStatusRank(status: string): number {
  switch (status) {
    case "available":
    case "approved":
      return 0;
    case "reserved":
    case "borrowed":
      return 1;
    case "listed":
      return 2;
    case "pending_dropoff":
      return 3;
    case "sold":
      return 4;
    case "rejected":
    case "expired":
      return 6;
    default:
      return 5;
  }
}

/** Shelf UI label for peer listing status. */
export function peerShelfStatusLabel(raw: string): string {
  if (raw === "approved" || raw === "available") return "available";
  if (raw === "borrowed" || raw === "reserved") return "on loan";
  return raw.replace(/_/g, " ");
}
