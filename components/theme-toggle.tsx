"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)

    // Apply appropriate class to body when theme changes
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  return (
    <motion.button
      whileHover={{ scale: 1.15, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-12 h-12 rounded-full bg-primary/10 backdrop-blur-md flex items-center justify-center overflow-hidden border border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 0 : 180,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
        className="absolute"
      >
        <Moon className="w-5 h-5 text-primary" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? -180 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ duration: 0.5 }}
        className="absolute"
      >
        <Sun className="w-5 h-5 text-primary" />
      </motion.div>

      <motion.div
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={{
          background: isDark
            ? "radial-gradient(circle, rgba(30,30,60,0.8) 0%, rgba(10,10,30,0) 70%)"
            : "radial-gradient(circle, rgba(255,200,100,0.2) 0%, rgba(255,255,255,0) 70%)",
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  )
}

