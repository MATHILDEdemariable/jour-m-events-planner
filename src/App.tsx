
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TeamSelectionProvider } from "./contexts/TeamSelectionContext";
import Index from "./pages/Index";
import AdminPortal from "./pages/AdminPortal";
import EventPortal from "./pages/EventPortal";
import TeamSelection from "./pages/TeamSelection";
import PersonalDashboard from "./pages/PersonalDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TeamSelectionProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<AdminPortal />} />
            <Route path="/team" element={<EventPortal />} />
            <Route path="/team-selection" element={<TeamSelection />} />
            <Route path="/dashboard/:personId" element={<PersonalDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TeamSelectionProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
