import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { Link, useLocation } from "wouter";
import { LogOut, Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ProfileAvatar } from "@/components/profile-avatar";
import { useAuth } from "@/context/auth-context";
import { userFacingErrorMessage } from "@/lib/error-messages";
import { isPremiumOk } from "@/lib/rbac";
import { cn } from "@/lib/utils";
import { PORTAL_PAGE_CONTAINER } from "@/lib/student-ui";
import {
  hubOverviewPathForUser,
  isHubAccount,
  isHubDeskRoute,
  portalPathsForUser,
} from "@/lib/app-paths";
import {
  DeskSidebarNav,
  HubDeskSidebarNav,
  HubDeskTabBar,
  studentDeskGroupsForUser,
} from "@/components/layout/HubDeskNav";
import { toast } from "sonner";

const StudentShellContext = createContext(false);

export function useStudentShell() {
  return useContext(StudentShellContext);
}

function DesktopPrimaryNav({ user }: { user: ReturnType<typeof useAuth>["user"] }) {
  if (!user) return null;
  if (isHubAccount(user)) {
    return user.hubStaffHubIds.length > 0 ? <HubDeskSidebarNav /> : null;
  }
  return <DeskSidebarNav groups={studentDeskGroupsForUser(user)} headerTitle="" />;
}

function MobileSheetNav({
  user,
  onClose,
  onUpgrade,
}: {
  user: ReturnType<typeof useAuth>["user"];
  onClose: () => void;
  onUpgrade: () => void;
}) {
  return (
    <>
      <nav className="flex flex-col gap-0">
        {!user ? null : isHubAccount(user) && user.hubStaffHubIds.length > 0 ? (
          <div className="border-b border-border/50 pb-3">
            <HubDeskSidebarNav onNavigate={onClose} />
          </div>
        ) : (
          <DeskSidebarNav
            groups={studentDeskGroupsForUser(user)}
            headerTitle=""
            onNavigate={onClose}
          />
        )}
      </nav>
      <div className="mt-auto space-y-2 border-t border-border/60 pt-4">
        <SidebarProfileRow onNavigate={onClose} />
        {user && !isPremiumOk(user) && (
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2 rounded-lg border-primary/35 text-primary hover:bg-primary/10"
            onClick={() => {
              onClose();
              onUpgrade();
            }}
          >
            <Sparkles className="h-4 w-4" />
            Upgrade
          </Button>
        )}
      </div>
    </>
  );
}

export function StudentAppShell({ children }: { children: ReactNode }) {
  const { user, logout, activateDemoPremium } = useAuth();
  const [location, setLocation] = useLocation();
  const showHubDeskTabs =
    !!user?.hubStaffHubIds.length && isHubAccount(user) && isHubDeskRoute(location);
  const shellHome =
    user && user.hubStaffHubIds.length > 0
      ? hubOverviewPathForUser(user)
      : portalPathsForUser(user).borrow;
  const [sheetOpen, setSheetOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [upgradeBusy, setUpgradeBusy] = useState(false);

  const runUpgrade = async () => {
    setUpgradeBusy(true);
    try {
      await activateDemoPremium(1);
      toast.success("Premium active for this demo.");
      setUpgradeOpen(false);
    } catch (e) {
      toast.error(userFacingErrorMessage(e));
    } finally {
      setUpgradeBusy(false);
    }
  };

  return (
    <StudentShellContext.Provider value={true}>
      <div className="min-h-[100dvh] bg-background">
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-[#F8FAFC] backdrop-blur-sm md:flex">
          <div className="flex h-16 shrink-0 items-center border-b border-border px-4">
            <Link
              href={shellHome}
              className="font-[var(--font-display)] text-sm font-extrabold tracking-tight text-foreground"
            >
              Neeve
            </Link>
          </div>
          <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-3">
            <DesktopPrimaryNav user={user} />
            <div className="mt-auto space-y-2 border-t border-border/60 pt-4">
              <SidebarProfileRow />
              {user && !isPremiumOk(user) && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start gap-2 rounded-lg border-primary/35 text-primary hover:bg-primary/10"
                  onClick={() => setUpgradeOpen(true)}
                >
                  <Sparkles className="h-4 w-4" />
                  Upgrade
                </Button>
              )}
            </div>
          </div>
        </aside>

        <div className={cn("flex min-w-0 flex-1 flex-col", "md:pl-64")}>
          <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border/80 bg-background/95 px-4 backdrop-blur md:hidden">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="shrink-0" aria-label="Open menu">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 border-border bg-[#F8FAFC] p-0">
                  <div className="flex h-14 items-center border-b border-border px-4">
                    <span className="font-[var(--font-display)] text-sm font-extrabold tracking-tight text-foreground">
                      Neeve
                    </span>
                  </div>
                  <div className="flex h-[calc(100dvh-3.5rem)] flex-col gap-6 overflow-y-auto p-3">
                    <MobileSheetNav
                      user={user}
                      onClose={() => setSheetOpen(false)}
                      onUpgrade={() => setUpgradeOpen(true)}
                    />
                  </div>
                </SheetContent>
              </Sheet>
              <div className="min-w-0">
                <p className="truncate font-[var(--font-display)] text-base font-semibold text-foreground">
                  {isHubAccount(user) ? "Hub desk" : "Student"}
                </p>
                <p className="truncate text-[10px] text-muted-foreground">
                  {isHubAccount(user) ? "Desk · swipe tabs below" : "Borrow · buy · sell"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 text-muted-foreground hover:text-foreground"
              aria-label="Sign out"
              onClick={() => {
                logout();
                setLocation("/");
              }}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </header>

          <main className="min-h-[calc(100dvh-3.5rem)] flex-1 md:min-h-[100dvh]">
            <div className={cn(PORTAL_PAGE_CONTAINER, "h-full pb-16 pt-4")}>
              {showHubDeskTabs ? <HubDeskTabBar /> : null}
              {children}
            </div>
          </main>
        </div>
      </div>

      <Dialog open={upgradeOpen} onOpenChange={setUpgradeOpen}>
        <DialogContent className="rounded-none sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-[var(--font-display)] text-lg font-bold tracking-tight">
              Demo premium
            </DialogTitle>
            <DialogDescription>
              Unlock borrow, requests, and peer buy/sell for this prototype session.
            </DialogDescription>
          </DialogHeader>
          <Button
            className="h-11 w-full rounded-none font-semibold"
            disabled={upgradeBusy}
            onClick={() => void runUpgrade()}
          >
            {upgradeBusy ? "Applying…" : "Activate 1 month"}
          </Button>
        </DialogContent>
      </Dialog>
    </StudentShellContext.Provider>
  );
}

function SidebarProfileRow({ onNavigate }: { onNavigate?: () => void }) {
  const [location] = useLocation();
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();
  if (!user) return null;
  const profilePath = portalPathsForUser(user).profile;
  const active = location === profilePath;
  return (
    <div
      className={cn(
        "flex items-center rounded-xl border transition-colors",
        active
          ? "border-primary/30 bg-primary/10 text-foreground"
          : "border-border/50 bg-card/60 hover:bg-muted/50",
      )}
    >
      <Link
        href={profilePath}
        onClick={onNavigate}
        className="flex min-w-0 flex-1 items-center gap-3 py-2.5 pl-3 pr-1"
      >
        <ProfileAvatar name={user.name} size="sm" className="shrink-0" />
        <span className="min-w-0 flex-1 text-left">
          <span className="block truncate text-sm font-semibold leading-tight text-foreground">
            {user.name}
          </span>
          <span
            className={cn(
              "mt-0.5 block truncate text-[10px] leading-snug",
              active ? "text-primary/80" : "text-muted-foreground",
            )}
          >
            {user.email}
          </span>
        </span>
      </Link>
      <div className="flex h-full shrink-0 items-center pr-1.5">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn(
            "h-9 w-9 text-muted-foreground hover:text-foreground",
            active && "hover:bg-primary/15",
          )}
          aria-label="Sign out"
          onClick={() => {
            logout();
            setLocation("/");
            onNavigate?.();
          }}
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

