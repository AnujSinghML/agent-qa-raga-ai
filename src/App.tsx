import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BackendTesting from "./pages/BackendTesting";
import ScriptTesting from "./pages/ScriptTesting";
import CatalystEvaluation from "./pages/CatalystEvaluation";
import JailbreakSessions from "./pages/JailbreakSessions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/backend-testing" element={<BackendTesting />} />
          <Route path="/script-testing" element={<ScriptTesting />} />
          <Route path="/catalyst" element={<CatalystEvaluation />} />
          <Route path="/jailbreak" element={<JailbreakSessions />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
