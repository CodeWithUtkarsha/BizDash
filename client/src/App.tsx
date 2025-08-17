import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { queryClient } from "./lib/queryClient";
import AuthPage from "@/pages/auth";
import DashboardPage from "@/pages/dashboard";
import SalesPage from "@/pages/sales";
import InventoryPage from "@/pages/inventory";
import UsersPage from "@/pages/users";
import ReportsPage from "@/pages/reports";
import ProfilePage from "@/pages/profile";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={AuthPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/sales" component={SalesPage} />
      <Route path="/inventory" component={InventoryPage} />
      <Route path="/users" component={UsersPage} />
      <Route path="/reports" component={ReportsPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <div className="dark">
            <Toaster />
            <Router />
          </div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
