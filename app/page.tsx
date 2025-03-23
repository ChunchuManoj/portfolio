"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import ParticleBackground from "@/components/particle-background";
import HeroSection from "@/components/hero-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import ExperienceSection from "@/components/experience-section";
import CertificationsSection from "@/components/certifications-section";
import ContactSection from "@/components/contact-section";
import ThemeToggle from "@/components/theme-toggle";
import LoadingScreen from "@/components/loading-screen";
import Navigation from "@/components/navigation";

// Dynamically import Skills3DNetwork with loading state
const Skills3DNetwork = dynamic(
  () => import("@/components/skills-3d-network"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] flex items-center justify-center bg-card/30 backdrop-blur-xl rounded-xl border border-primary/10">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-foreground/70">Initializing 3D environment...</p>
        </div>
      </div>
    ),
  }
);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  // Improve the initial loading and scroll behavior to ensure the hero section is displayed by default

  // Update the useEffect hook to ensure proper scrolling to the hero section
  useEffect(() => {
    try {
      // Set mounted state for client-side rendering
      setMounted(true);

      // Shorter loading time
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1500);

      // Force scroll to top and prevent any automatic navigation
      if (typeof window !== "undefined") {
        // Disable automatic scroll restoration
        window.history.scrollRestoration = "manual";

        // Force scroll to top
        window.scrollTo(0, 0);

        // Remove any hash from URL to prevent automatic scrolling
        if (window.location.hash) {
          window.history.replaceState(null, "", window.location.pathname);
        }

        // Additional measures to ensure we're at the top
        const scrollTimer = setTimeout(() => {
          window.scrollTo(0, 0);

          // Ensure the main element is scrolled to top
          if (mainRef.current) {
            mainRef.current.scrollTop = 0;
          }
        }, 100);

        return () => {
          clearTimeout(timer);
          clearTimeout(scrollTimer);
        };
      }

      return () => {
        clearTimeout(timer);
      };
    } catch (err) {
      setError("Failed to initialize the application");
      setLoading(false);
      console.error(err);
    }
  }, []);

  // Handle errors during loading
  if (!mounted || loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-destructive mb-4">
            Something went wrong
          </h1>
          <p className="text-foreground/70 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-background relative overflow-auto"
    >
      <ParticleBackground />
      <Navigation />
      <div className="fixed top-5 right-5 z-50">
        <ThemeToggle />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 py-8 relative z-10"
      >
        <HeroSection />
        <SkillsSection />
        <Skills3DNetwork />
        <ProjectsSection />
        <CertificationsSection />
        <ExperienceSection />
        <ContactSection />

        <footer className="mt-20 py-8 border-t border-primary/10 text-center">
          <p className="text-foreground/60">
            © {new Date().getFullYear()} Chunchu Manoj. All rights reserved.
          </p>
          <p className="text-sm text-foreground/40 mt-2">
            Built with Next.js, Tailwind CSS, and Framer Motion
          </p>
        </footer>
      </motion.div>
    </main>
  );
}
