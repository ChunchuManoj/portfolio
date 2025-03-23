"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    let mouseX = 0
    let mouseY = 0

    const isDark = theme === "dark"

    // Define Particle class first before using it
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5

        // Enhanced visibility in light mode
        this.color = isDark
          ? `rgba(${100 + Math.random() * 155}, ${100 + Math.random() * 155}, ${255}, ${0.3 + Math.random() * 0.3})`
          : `rgba(${50 + Math.random() * 100}, ${50 + Math.random() * 100}, ${200 + Math.random() * 55}, ${0.4 + Math.random() * 0.3})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Boundary check
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX
        }

        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY
        }

        // Mouse interaction
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const angle = Math.atan2(dy, dx)
          const force = (100 - distance) / 1500
          this.speedX -= Math.cos(angle) * force
          this.speedY -= Math.sin(angle) * force
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    function initParticles() {
      particles = []
      const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 10000), 150)

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    function drawConnections() {
      if (!ctx) return

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            // Enhanced visibility in light mode
            ctx.beginPath()
            ctx.strokeStyle = isDark
              ? `rgba(100, 100, 255, ${0.1 * (1 - distance / 150)})`
              : `rgba(50, 50, 200, ${0.2 * (1 - distance / 150)})`
            ctx.lineWidth = isDark ? 0.5 : 0.8
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Track mouse position
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    })

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      drawConnections()
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", () => {})
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />
}

