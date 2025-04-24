// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import ExploitHistory from "./pages/ExploitHistory";
// import Analytics from "./pages/Analytics";
// import Monitoring from "./pages/Monitoring";
// import SecurityHub from "./pages/SecurityHub";
// import Documentation from "./pages/Documentation";
// import Contribute from "./pages/Contribute";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Index />} />
//           <Route path="/exploit-history" element={<ExploitHistory />} />
//           <Route path="/analytics" element={<Analytics />} />
//           <Route path="/monitoring" element={<Monitoring />} />
//           <Route path="/security-hub" element={<SecurityHub />} />
//           <Route path="/docs" element={<Documentation />} />
//           <Route path="/contribute" element={<Contribute />} />
//           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;


import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Sidebar } from "./components/dashboard/Sidebar";
import { DashboardHeader } from "./components/dashboard/DashboardHeader";
import { ParticleBackground } from "./components/dashboard/ParticleBackground";
import { CyberGridBackground } from "./components/dashboard/CyberGridBackground";

// Pages
import Index from "./pages/Index";
import ExploitHistory from "./pages/ExploitHistory";
import Analytics from "./pages/Analytics";
import Monitoring from "./pages/Monitoring";
import SecurityHub from "./pages/SecurityHub";
import Documentation from "./pages/Documentation";
import Contribute from "./pages/Contribute";
import NotFound from "./pages/NotFound";
import { MonitoringPage } from './pages/MonitoringPage';

const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex h-screen overflow-hidden relative">
            <CyberGridBackground />
            <ParticleBackground />
            <Sidebar />
            <div className="flex-1 flex flex-col z-10">
              <DashboardHeader />
              <main className="flex-1 overflow-auto p-6">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/exploit-history" element={<ExploitHistory />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/monitoring" element={<Monitoring />} />
                  <Route path="/security-hub" element={<SecurityHub />} />
                  <Route path="/docs" element={<Documentation />} />
                  <Route path="/contribute" element={<Contribute />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
