"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2 // Increase speed to avoid getting stuck
      })
    }, 20)

    // Ensure loading screen doesn't get stuck
    const timeout = setTimeout(() => {
      setProgress(100)
    }, 5000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-8 text-primary">
          <span className="text-primary">Initializing AI Portfolio</span>
        </h1>

        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="text-sm text-gray-400">
          {progress < 20 && "Loading modules..."}
          {progress >= 20 && progress < 40 && "Analyzing skills..."}
          {progress >= 40 && progress < 60 && "Rendering projects..."}
          {progress >= 60 && progress < 80 && "Initializing 3D environment..."}
          {progress >= 80 && "Finalizing interface..."}
        </div>

        <div className="mt-8">
          <div className="w-16 h-16 relative mx-auto">
            <motion.div
              className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 border-4 border-t-transparent border-r-primary border-b-transparent border-l-transparent rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

