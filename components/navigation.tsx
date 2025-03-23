"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", id: "hero" },
  { name: "Skills", id: "skills" },
  { name: "Skills 3D", id: "skills-3d" },
  { name: "Projects", id: "projects" },
  { name: "Certifications", id: "certifications" },
  { name: "Experience", id: "experience" },
  { name: "Contact", id: "contact" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => {
      try {
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        let newActiveSection = "hero"; // Default to "Home"

        navItems.forEach((item) => {
          const element = document.getElementById(item.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            const position = rect.top + window.scrollY;

            if (scrollPosition >= position) {
              newActiveSection = item.id;
            }
          }
        });

        setActiveSection(newActiveSection);
      } catch (error) {
        console.error("Error handling scroll:", error);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    try {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
        setActiveSection(id);
      }
    } catch (error) {
      console.error("Error scrolling to section:", error);
    }
  };

  return (
    <>
      {/* Mobile Navigation Toggle */}
      <motion.button
        className="fixed top-5 left-5 z-50 md:hidden bg-card/30 backdrop-blur-md p-2 rounded-full border border-primary/20"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-primary" />
        ) : (
          <Menu className="w-6 h-6 text-primary" />
        )}
      </motion.button>

      {/* Desktop Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 hidden md:block"
      >
        <div
          className={`px-4 py-2 rounded-full ${
            isDark ? "bg-black/30" : "bg-white/30"
          } backdrop-blur-md border border-primary/20`}
        >
          <ul className="flex space-x-1 justify-center">
            {navItems.map((item) => (
              <motion.li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-primary/10 text-foreground/70"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 20 }}
        className="fixed inset-y-0 left-0 z-40 w-64 bg-card/95 backdrop-blur-xl border-r border-primary/10 md:hidden"
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-4">
          <ul className="space-y-2 flex-1">
            {navItems.map((item) => (
              <motion.li
                key={item.id}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-primary/20 text-primary font-medium"
                      : "hover:bg-primary/10 text-foreground/70"
                  }`}
                >
                  {item.name}
                </button>
              </motion.li>
            ))}
          </ul>

          <div className="pt-4 border-t border-primary/10 text-center text-xs text-foreground/40">
            Chunchu Manoj © {new Date().getFullYear()}
          </div>
        </div>
      </motion.div>
    </>
  );
}
