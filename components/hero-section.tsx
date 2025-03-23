"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      if (typeof window !== "undefined") {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class HolographicElement {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.speed = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.y -= this.speed;
        this.opacity -= 0.002;

        if (this.y < 0 || this.opacity <= 0) {
          this.y = canvas.height;
          this.x = Math.random() * canvas.width;
          this.opacity = Math.random() * 0.5 + 0.1;
        }
      }

      draw() {
        if (!ctx) return;

        const color = isDark
          ? `rgba(100, 200, 255, ${this.opacity})`
          : `rgba(0, 100, 255, ${this.opacity * 0.7})`;

        ctx.fillStyle = color;
        ctx.beginPath();

        if (Math.random() > 0.8) {
          ctx.rect(this.x, this.y, this.size, this.size);
        } else {
          ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        }

        ctx.fill();
      }
    }

    const elements: HolographicElement[] = [];
    const elementCount = 50;

    for (let i = 0; i < elementCount; i++) {
      elements.push(new HolographicElement());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const element of elements) {
        element.update();
        element.draw();
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center relative py-20"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center relative z-10 grid md:grid-cols-2 gap-8 items-center w-full max-w-6xl px-4"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center md:items-start text-center md:text-left"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="text-lg font-medium text-primary/80">
              Hello, I am
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
          >
            Chunchu Manoj
          </motion.h1>

          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl text-foreground dark:text-foreground/80 light:text-foreground/90">
              Software Developer | AI Enthusiast | Web Developer
            </h2>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="max-w-2xl mx-auto mb-10 md:mx-0"
          >
            <p className="text-foreground/90 dark:text-foreground/70 text-sm sm:text-base">
              Final-year Computer Science student with expertise in software
              development, data analysis, and artificial intelligence.
              Passionate about delivering quality solutions and thriving in
              collaborative environments.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Projects
            </Button>
            <a
              href="/Chunchu_Manoj.pdf" // Ensure this path is correct
              target="_blank"
              download="Chunchu_Manoj.pdf"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Download Resume
              </Button>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="hidden md:flex justify-center items-center"
        >
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/30 shadow-xl">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/profiles-dOxcBJSu2H0xwDuEn1X9qvhnpo2gO9.jpeg"
              alt="Chunchu Manoj"
              className="w-full h-full object-cover"
            />
            <div
              className={`absolute inset-0 rounded-full ${
                isDark
                  ? "bg-gradient-to-tr from-primary/20 to-transparent"
                  : "bg-gradient-to-tr from-blue-500/10 to-transparent"
              }`}
            ></div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 2,
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer transition-all duration-300 hover:scale-125"
        onClick={() =>
          document
            .getElementById("skills")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <ArrowDown className="w-6 h-6 text-primary" />
      </motion.div>
    </section>
  );
}
