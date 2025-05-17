import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Analytics from "@/components/Analytics";
import Navbar from "@/components/Navbar";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import LoadingScreen from "@/components/LoadingScreen";

// Lazy load components
const Home = lazy(() => import("@/pages/Home"));
const Services = lazy(() => import("@/pages/Services"));
const ServiceDetail = lazy(() => import("@/pages/ServiceDetail"));
const Contact = lazy(() => import("@/pages/Contact"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("@/pages/TermsConditions"));
const ErrorPage = lazy(() => import("@/pages/ErrorPage"));

function App() {
  return (
    <>
      <Analytics />
      <Navbar />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Home />
            </Suspense>
          } />
          <Route path="/services" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Services />
            </Suspense>
          } />
          <Route path="/services/detail/:id" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ServiceDetail />
            </Suspense>
          } />
          <Route path="/contact" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Contact />
            </Suspense>
          } />
          <Route path="/privacy-policy" element={
            <Suspense fallback={<LoadingSpinner />}>
              <PrivacyPolicy />
            </Suspense>
          } />
          <Route path="/terms-conditions" element={
            <Suspense fallback={<LoadingSpinner />}>
              <TermsConditions />
            </Suspense>
          } />
          <Route path="*" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ErrorPage />
            </Suspense>
          } />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
