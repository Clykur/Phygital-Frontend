import { Switch, Route, Router as WouterRouter, useLocation, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/context/auth-context";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/layout/Layout";
import { StudentAppShell } from "@/components/layout/StudentAppShell";
import Home from "@/pages/home";
import Colleges from "@/pages/colleges";
import Marketplace from "@/pages/marketplace";
import About from "@/pages/about";
import SignInPage from "@/pages/sign-in";
import LibraryPage from "@/pages/library";
import HubOverviewPage from "@/pages/hub-overview";
import HubInventoryPage from "@/pages/hub-inventory";
import HubBookRequestsPage from "@/pages/hub-requests";
import HubCommercePage from "@/pages/hub-commerce";
import HubDeskP2pListingsPage from "@/pages/hub-desk-p2p-listings";
import StudentTrackingPage from "@/pages/student-tracking";
import StudentAlertsPage from "@/pages/student-alerts";
import StudentProfilePage from "@/pages/student-profile";
import StudentLibraryPage from "@/pages/student-library";
import {
  adminHubPath,
  adminUserPath,
  ADMIN_HUBS_PATH,
  ADMIN_USERS_PATH,
  defaultLoggedInHome,
  HUB_ACTIVITY_PATH,
  HUB_CATALOG_PATH,
  HUB_COMMERCE_PATH,
  HUB_INVENTORY_PATH,
  HUB_OVERVIEW_PATH,
  HUB_P2P_LISTINGS_PATH,
  HUB_REQUESTS_PATH,
  HUB_PROFILE_PATH,
  SUPER_ADMIN_ACTIVITY_PATH,
  SUPER_ADMIN_CATALOG_PATH,
  SUPER_ADMIN_COMMERCE_PATH,
  SUPER_ADMIN_INVENTORY_PATH,
  SUPER_ADMIN_OPERATIONS_PATH,
  SUPER_ADMIN_OVERVIEW_PATH,
  SUPER_ADMIN_P2P_LISTINGS_PATH,
  SUPER_ADMIN_PROFILE_PATH,
  SUPER_ADMIN_REQUESTS_PATH,
  STUDENT_ACTIVITY_PATH,
  STUDENT_ALERTS_PATH,
  STUDENT_BORROW_PATH,
  STUDENT_LIBRARY_PATH,
  STUDENT_PROFILE_PATH,
  STUDENT_SELL_PATH,
} from "@/lib/app-paths";
import AdminUsersPage from "@/pages/admin-users";
import AdminUserDetailPage from "@/pages/admin-user-detail";
import AdminHubsPage from "@/pages/admin-hubs";
import AdminHubDetailPage from "@/pages/admin-hub-detail";
import SuperAdminOperationsPage from "@/pages/superadmin-operations";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const queryClient = new QueryClient();

function hasHubPortalAccess(baseRole: string | undefined): boolean {
  return baseRole === "hub" || baseRole === "super_admin";
}

/** Hub staff use `/hub/overview`; super admin is redirected to `/superadmin/overview`. */
function HubStaffOverviewRoute() {
  const { user } = useAuth();
  if (user?.baseRole === "super_admin") return <Redirect to={SUPER_ADMIN_OVERVIEW_PATH} />;
  return <HubOverviewPage />;
}

function SuperAdminOverviewRoute() {
  const { user } = useAuth();
  if (user?.baseRole === "super_admin") return <HubOverviewPage />;
  if (user?.baseRole === "hub") return <Redirect to={HUB_OVERVIEW_PATH} />;
  return <Redirect to={STUDENT_BORROW_PATH} />;
}

function HubDeskLegacyHomeRedirect() {
  const { user } = useAuth();
  if (user) return <Redirect to={defaultLoggedInHome(user)} />;
  return <Redirect to={HUB_OVERVIEW_PATH} />;
}

function ScrollToTop() {
  const [pathname] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function LoggedInHomeRedirect() {
  const { user } = useAuth();
  return <Redirect to={defaultLoggedInHome(user)} />;
}

function LegacyAppRedirect({ suffix }: { suffix: string }) {
  const { user } = useAuth();
  if (hasHubPortalAccess(user?.baseRole) && suffix === "borrow") {
    return <Redirect to={user?.baseRole === "super_admin" ? SUPER_ADMIN_INVENTORY_PATH : HUB_CATALOG_PATH} />;
  }
  if (hasHubPortalAccess(user?.baseRole) && suffix === "sell") {
    return <Redirect to={user ? defaultLoggedInHome(user) : HUB_OVERVIEW_PATH} />;
  }
  const prefix = hasHubPortalAccess(user?.baseRole)
    ? user?.baseRole === "super_admin"
      ? "/superadmin"
      : "/hub"
    : "/student";
  return <Redirect to={`${prefix}/${suffix}`} />;
}

function LegacyAppBorrowRoute() {
  return <LegacyAppRedirect suffix="borrow" />;
}
function LegacyAppSellRoute() {
  return <LegacyAppRedirect suffix="sell" />;
}
function LegacyAppActivityRoute() {
  return <LegacyAppRedirect suffix="activity" />;
}
function LegacyAppProfileRoute() {
  return <LegacyAppRedirect suffix="profile" />;
}

function StudentBorrowRoute() {
  const { user } = useAuth();
  if (user?.baseRole === "super_admin") return <Redirect to={SUPER_ADMIN_INVENTORY_PATH} />;
  if (user?.baseRole === "hub") return <Redirect to={HUB_CATALOG_PATH} />;
  return <Marketplace studentMode="browse" />;
}

function HubCatalogRoute() {
  const { user } = useAuth();
  if (!hasHubPortalAccess(user?.baseRole)) return <Redirect to={STUDENT_BORROW_PATH} />;
  if (user?.baseRole === "super_admin") return <Redirect to={SUPER_ADMIN_INVENTORY_PATH} />;
  return <Marketplace studentMode="browse" />;
}

function SuperAdminCatalogRoute() {
  const { user } = useAuth();
  if (!hasHubPortalAccess(user?.baseRole)) return <Redirect to={STUDENT_BORROW_PATH} />;
  if (user?.baseRole === "hub") return <Redirect to={HUB_CATALOG_PATH} />;
  if (user?.baseRole !== "super_admin") return <Redirect to={STUDENT_BORROW_PATH} />;
  return <Redirect to={SUPER_ADMIN_INVENTORY_PATH} />;
}

function HubBorrowLegacyRedirect() {
  const { user } = useAuth();
  if (user && !hasHubPortalAccess(user.baseRole)) return <Redirect to={STUDENT_BORROW_PATH} />;
  return <Redirect to={user?.baseRole === "super_admin" ? SUPER_ADMIN_INVENTORY_PATH : HUB_CATALOG_PATH} />;
}

function StudentSellRoute() {
  const { user } = useAuth();
  if (user?.baseRole === "hub" || user?.baseRole === "super_admin") {
    return <Redirect to={defaultLoggedInHome(user)} />;
  }
  return <Marketplace studentMode="sell" />;
}

function HubSellRemovedRedirect() {
  const { user } = useAuth();
  return <Redirect to={user ? defaultLoggedInHome(user) : HUB_OVERVIEW_PATH} />;
}

function StudentActivityRoute() {
  const { user } = useAuth();
  if (user?.baseRole === "super_admin") return <Redirect to={SUPER_ADMIN_ACTIVITY_PATH} />;
  if (user?.baseRole === "hub") return <Redirect to={HUB_ACTIVITY_PATH} />;
  return <StudentTrackingPage />;
}

function StudentAlertsRoute() {
  const { user } = useAuth();
  if (user?.baseRole === "super_admin") return <Redirect to={SUPER_ADMIN_ACTIVITY_PATH} />;
  if (user?.baseRole === "hub") return <Redirect to={HUB_ACTIVITY_PATH} />;
  return <StudentAlertsPage />;
}

function HubActivityRoute() {
  const { user } = useAuth();
  if (!hasHubPortalAccess(user?.baseRole)) return <Redirect to={STUDENT_ACTIVITY_PATH} />;
  if (user?.baseRole === "super_admin") return <Redirect to={SUPER_ADMIN_ACTIVITY_PATH} />;
  return <StudentTrackingPage />;
}

function SuperAdminActivityRoute() {
  const { user } = useAuth();
  if (!hasHubPortalAccess(user?.baseRole)) return <Redirect to={STUDENT_ACTIVITY_PATH} />;
  if (user?.baseRole === "hub") return <Redirect to={HUB_ACTIVITY_PATH} />;
  if (user?.baseRole !== "super_admin") return <Redirect to={STUDENT_BORROW_PATH} />;
  return <StudentTrackingPage />;
}

function StudentProfileRoute() {
  const { user } = useAuth();
  if (user?.baseRole === "super_admin") return <Redirect to={SUPER_ADMIN_PROFILE_PATH} />;
  if (user?.baseRole === "hub") return <Redirect to={HUB_PROFILE_PATH} />;
  return <StudentProfilePage />;
}

function HubProfileRoute() {
  const { user } = useAuth();
  if (!hasHubPortalAccess(user?.baseRole)) return <Redirect to={STUDENT_PROFILE_PATH} />;
  if (user?.baseRole === "super_admin") return <Redirect to={SUPER_ADMIN_PROFILE_PATH} />;
  return <StudentProfilePage />;
}

function SuperAdminProfileRoute() {
  const { user } = useAuth();
  if (!hasHubPortalAccess(user?.baseRole)) return <Redirect to={STUDENT_PROFILE_PATH} />;
  if (user?.baseRole === "hub") return <Redirect to={HUB_PROFILE_PATH} />;
  if (user?.baseRole !== "super_admin") return <Redirect to={STUDENT_BORROW_PATH} />;
  return <StudentProfilePage />;
}

function HubInventoryDeskRoute() {
  const { user } = useAuth();
  if (user?.baseRole === "super_admin") return <Redirect to={SUPER_ADMIN_INVENTORY_PATH} />;
  return <HubInventoryPage />;
}

function SuperAdminInventoryRoute() {
  const { user } = useAuth();
  if (user?.baseRole === "hub") return <Redirect to={HUB_INVENTORY_PATH} />;
  if (user?.baseRole !== "super_admin") return <Redirect to={STUDENT_BORROW_PATH} />;
  return <HubInventoryPage />;
}

function HubBookRequestsDeskRoute() {
  const { user } = useAuth();
  if (user?.baseRole === "super_admin") return <Redirect to={SUPER_ADMIN_REQUESTS_PATH} />;
  return <HubBookRequestsPage />;
}

function SuperAdminBookRequestsRoute() {
  const { user } = useAuth();
  if (user?.baseRole === "hub") return <Redirect to={HUB_REQUESTS_PATH} />;
  if (user?.baseRole !== "super_admin") return <Redirect to={STUDENT_BORROW_PATH} />;
  return <Redirect to={SUPER_ADMIN_OVERVIEW_PATH} />;
}

function HubCommerceDeskRoute() {
  const { user } = useAuth();
  if (user?.baseRole === "super_admin") return <Redirect to={SUPER_ADMIN_COMMERCE_PATH} />;
  return <HubCommercePage />;
}

function SuperAdminCommerceRoute() {
  const { user } = useAuth();
  if (user?.baseRole === "hub") return <Redirect to={HUB_COMMERCE_PATH} />;
  if (user?.baseRole !== "super_admin") return <Redirect to={STUDENT_BORROW_PATH} />;
  return <HubCommercePage />;
}

function HubP2pListingsDeskRoute() {
  const { user } = useAuth();
  if (user?.baseRole === "super_admin") return <Redirect to={SUPER_ADMIN_P2P_LISTINGS_PATH} />;
  return <HubDeskP2pListingsPage />;
}

function SuperAdminP2pListingsRoute() {
  const { user } = useAuth();
  if (!hasHubPortalAccess(user?.baseRole)) return <Redirect to={STUDENT_BORROW_PATH} />;
  if (user?.baseRole === "hub") return <Redirect to={HUB_P2P_LISTINGS_PATH} />;
  if (user?.baseRole !== "super_admin") return <Redirect to={STUDENT_BORROW_PATH} />;
  return <HubDeskP2pListingsPage />;
}

function PublicRoutes() {
  return (
    <Layout>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/sign-in" component={SignInPage} />
        <Route path="/library" component={LibraryPage} />
        <Route path="/student/borrow">
          <Marketplace studentMode="browse" />
        </Route>
        <Route path="/student/sell">
          <Marketplace studentMode="sell" />
        </Route>
        <Route path={HUB_CATALOG_PATH}>
          <Marketplace studentMode="browse" />
        </Route>
        <Route path="/hub/borrow">
          <Redirect to={HUB_CATALOG_PATH} />
        </Route>
        <Route path="/hub/sell">
          <Redirect to={STUDENT_SELL_PATH} />
        </Route>
        <Route path={HUB_OVERVIEW_PATH} component={HubStaffOverviewRoute} />
        <Route path={HUB_INVENTORY_PATH} component={HubInventoryPage} />
        <Route path={HUB_REQUESTS_PATH} component={HubBookRequestsPage} />
        <Route path={HUB_COMMERCE_PATH} component={HubCommercePage} />
        <Route path="/hub/desk">
          <Redirect to={HUB_OVERVIEW_PATH} />
        </Route>
        <Route path="/hub-desk">
          <Redirect to={HUB_OVERVIEW_PATH} />
        </Route>
        <Route path="/hub">
          <Redirect to={HUB_CATALOG_PATH} />
        </Route>
        <Route path="/colleges" component={Colleges} />
        <Route path="/marketplace">
          <Marketplace />
        </Route>
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function LoggedInRoutes() {
  return (
    <StudentAppShell>
      <ScrollToTop />
      <Switch>
        <Route path="/student/borrow" component={StudentBorrowRoute} />
        <Route path="/student/buy">
          <Redirect to={STUDENT_BORROW_PATH} />
        </Route>
        <Route path="/student/sell" component={StudentSellRoute} />
        <Route path="/student/activity" component={StudentActivityRoute} />
        <Route path={STUDENT_LIBRARY_PATH} component={StudentLibraryPage} />
        <Route path={STUDENT_ALERTS_PATH} component={StudentAlertsRoute} />
        <Route path="/student/profile" component={StudentProfileRoute} />
        <Route path="/student/discover">
          <Redirect to={STUDENT_BORROW_PATH} />
        </Route>
        <Route path="/student/tracking">
          <Redirect to={STUDENT_ACTIVITY_PATH} />
        </Route>
        <Route path="/student">
          <Redirect to={STUDENT_BORROW_PATH} />
        </Route>

        <Route path={SUPER_ADMIN_CATALOG_PATH} component={SuperAdminCatalogRoute} />
        <Route path={HUB_CATALOG_PATH} component={HubCatalogRoute} />
        <Route path="/hub/borrow" component={HubBorrowLegacyRedirect} />
        <Route path="/hub/buy">
          <Redirect to={HUB_CATALOG_PATH} />
        </Route>
        <Route path="/hub/sell" component={HubSellRemovedRedirect} />
        <Route path={SUPER_ADMIN_ACTIVITY_PATH} component={SuperAdminActivityRoute} />
        <Route path="/hub/activity" component={HubActivityRoute} />
        <Route path={SUPER_ADMIN_PROFILE_PATH} component={SuperAdminProfileRoute} />
        <Route path="/hub/profile" component={HubProfileRoute} />
        <Route path="/hub/library">
          <Redirect to={HUB_CATALOG_PATH} />
        </Route>
        <Route path="/hub/discover">
          <Redirect to={HUB_CATALOG_PATH} />
        </Route>
        <Route path="/hub/tracking">
          <Redirect to={HUB_ACTIVITY_PATH} />
        </Route>
        <Route path={SUPER_ADMIN_OVERVIEW_PATH} component={SuperAdminOverviewRoute} />
        <Route path={HUB_OVERVIEW_PATH} component={HubStaffOverviewRoute} />
        <Route path={SUPER_ADMIN_INVENTORY_PATH} component={SuperAdminInventoryRoute} />
        <Route path={HUB_INVENTORY_PATH} component={HubInventoryDeskRoute} />
        <Route path={SUPER_ADMIN_REQUESTS_PATH} component={SuperAdminBookRequestsRoute} />
        <Route path={HUB_REQUESTS_PATH} component={HubBookRequestsDeskRoute} />
        <Route path={SUPER_ADMIN_COMMERCE_PATH} component={SuperAdminCommerceRoute} />
        <Route path={HUB_COMMERCE_PATH} component={HubCommerceDeskRoute} />
        <Route path={SUPER_ADMIN_P2P_LISTINGS_PATH} component={SuperAdminP2pListingsRoute} />
        <Route path={HUB_P2P_LISTINGS_PATH} component={HubP2pListingsDeskRoute} />
        <Route path={SUPER_ADMIN_OPERATIONS_PATH} component={SuperAdminOperationsPage} />
        <Route path={ADMIN_USERS_PATH} component={AdminUsersPage} />
        <Route path={`${ADMIN_USERS_PATH}/:userId`} component={AdminUserDetailPage} />
        <Route path={ADMIN_HUBS_PATH} component={AdminHubsPage} />
        <Route path={`${ADMIN_HUBS_PATH}/:hubId`} component={AdminHubDetailPage} />
        <Route path="/admin/users/:userId">
          {({ userId }) => <Redirect to={adminUserPath(userId!)} />}
        </Route>
        <Route path="/admin/users">
          <Redirect to={ADMIN_USERS_PATH} />
        </Route>
        <Route path="/admin/hubs/:hubId">
          {({ hubId }) => <Redirect to={adminHubPath(hubId!)} />}
        </Route>
        <Route path="/admin/hubs">
          <Redirect to={ADMIN_HUBS_PATH} />
        </Route>
        <Route path="/hub/desk" component={HubDeskLegacyHomeRedirect} />
        <Route path="/hub-desk" component={HubDeskLegacyHomeRedirect} />
        <Route path="/hub">
          <LoggedInHomeRedirect />
        </Route>

        <Route path="/app/buy" component={LegacyAppBorrowRoute} />
        <Route path="/app/borrow" component={LegacyAppBorrowRoute} />
        <Route path="/app/sell" component={LegacyAppSellRoute} />
        <Route path="/app/activity" component={LegacyAppActivityRoute} />
        <Route path="/app/profile" component={LegacyAppProfileRoute} />
        <Route path="/app/library" component={LegacyAppBorrowRoute} />
        <Route path="/app/discover" component={LegacyAppBorrowRoute} />
        <Route path="/app/tracking" component={LegacyAppActivityRoute} />
        <Route path="/app">
          <LoggedInHomeRedirect />
        </Route>

        <Route path="/library">
          <LoggedInHomeRedirect />
        </Route>
        <Route path="/marketplace">
          <LoggedInHomeRedirect />
        </Route>
        <Route path="/sign-in">
          <LoggedInHomeRedirect />
        </Route>
        <Route path="/">
          <LoggedInHomeRedirect />
        </Route>
        <Route path="/colleges">
          <LoggedInHomeRedirect />
        </Route>
        <Route path="/about">
          <LoggedInHomeRedirect />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </StudentAppShell>
  );
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-3 bg-background text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-sm">Loading…</p>
      </div>
    );
  }

  if (user) {
    return <LoggedInRoutes />;
  }

  return <PublicRoutes />;
}

function Router() {
  return <AppRoutes />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster theme="dark" position="bottom-right" />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
