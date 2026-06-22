import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingScreen from "./components/LoadingScreen";

// Lazy load all pages for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Features = lazy(() => import("./pages/Features"));
// const Roadmap = lazy(() => import("./pages/Roadmap"));
// HIDDEN: Pricing, Careers, Contact, Roadmap — disabled for now (no lazy load, no resources)
// const Pricing = lazy(() => import("./pages/Pricing"));
const About = lazy(() => import("./pages/About"));
// const Careers = lazy(() => import("./pages/Careers"));
// const Contact = lazy(() => import("./pages/Contact"));
// const Privacy = lazy(() => import("./pages/Privacy"));
// const Terms = lazy(() => import("./pages/Terms"));
// const Cookies = lazy(() => import("./pages/Cookies"));
// const Blog = lazy(() => import("./pages/Blog"));
// const Status = lazy(() => import("./pages/Status"));
const JarvisNexus = lazy(() => import("./pages/JarvisNexus"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/features" element={<Features />} />
            {/* <Route path="/roadmap" element={<Roadmap />} /> */}
            {/* HIDDEN: Pricing, Careers, Contact, Roadmap routes — disabled for now */}
            {/* <Route path="/pricing" element={<Pricing />} /> */}
            <Route path="/about" element={<About />} />
            {/* <Route path="/careers" element={<Careers />} /> */}
            {/* <Route path="/contact" element={<Contact />} /> */}
            {/* <Route path="/privacy" element={<Privacy />} /> */}
            {/* <Route path="/terms" element={<Terms />} /> */}
            {/* <Route path="/cookies" element={<Cookies />} /> */}
            {/* <Route path="/blog" element={<Blog />} /> */}
            {/* <Route path="/status" element={<Status />} /> */}
            <Route path="/JarvisNexus" element={<JarvisNexus />} />
            <Route path="/jarvis-nexus" element={<Navigate to="/JarvisNexus" replace />} />
            <Route path="/jarvis" element={<Navigate to="/JarvisNexus" replace />} />
            <Route path="/nexus" element={<Navigate to="/JarvisNexus" replace />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
