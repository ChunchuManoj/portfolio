"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"

type Skill = {
  name: string
  category: string
  level: number
  description: string
  color: string
}

const skills: Skill[] = [
  {
    name: "Java",
    category: "Programming",
    level: 90,
    description: "Proficient in Java development with strong OOP concepts and experience building robust applications.",
    color: "#f89820",
  },
  {
    name: "Python",
    category: "Programming",
    level: 85,
    description: "Experienced in Python for data analysis, AI/ML applications, and general-purpose programming.",
    color: "#306998",
  },
  {
    name: "C",
    category: "Programming",
    level: 75,
    description: "Solid understanding of C programming for system-level development and algorithm implementation.",
    color: "#5c6bc0",
  },
  {
    name: "SQL",
    category: "Database",
    level: 80,
    description:
      "Strong database skills with experience in designing schemas, writing complex queries, and optimizing performance.",
    color: "#00758f",
  },
  {
    name: "MongoDB",
    category: "Database",
    level: 70,
    description: "Experience with NoSQL databases, document modeling, and integration with web applications.",
    color: "#4db33d",
  },
  {
    name: "HTML/CSS",
    category: "Web",
    level: 85,
    description: "Proficient in creating responsive, accessible, and modern web interfaces.",
    color: "#e34c26",
  },
  {
    name: "JavaScript",
    category: "Web",
    level: 80,
    description: "Strong JavaScript skills for building interactive web applications and dynamic user interfaces.",
    color: "#f7df1e",
  },
  {
    name: "Git",
    category: "Tools",
    level: 75,
    description: "Experienced with version control, branching strategies, and collaborative development workflows.",
    color: "#f05032",
  },
  {
    name: "Machine Learning",
    category: "AI",
    level: 70,
    description: "Knowledge of ML algorithms, model training, and implementation for data analysis and prediction.",
    color: "#ff6f61",
  },
  {
    name: "Data Structures",
    category: "Computer Science",
    level: 85,
    description: "Strong foundation in data structures and their implementation for efficient problem-solving.",
    color: "#9c27b0",
  },
  {
    name: "Algorithms",
    category: "Computer Science",
    level: 80,
    description: "Proficient in algorithm design, analysis, and optimization for various computational problems.",
    color: "#673ab7",
  },
  {
    name: "NumPy/Pandas",
    category: "Data Science",
    level: 75,
    description: "Experience with data manipulation, analysis, and visualization using Python libraries.",
    color: "#150458",
  },
]

export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let nodes: Node[] = []
    let connections: Connection[] = []

    class Node {
      x: number
      y: number
      radius: number
      skill: Skill
      targetX: number
      targetY: number
      velX: number
      velY: number
      highlighted: boolean

      constructor(skill: Skill) {
        this.skill = skill
        this.radius = 30 + skill.level / 10
        this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius
        this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius
        this.targetX = this.x
        this.targetY = this.y
        this.velX = 0
        this.velY = 0
        this.highlighted = false
      }

      update() {
        // Move towards target with easing
        this.velX = (this.targetX - this.x) * 0.05
        this.velY = (this.targetY - this.y) * 0.05

        this.x += this.velX
        this.y += this.velY

        // Boundary check
        if (this.x < this.radius) this.x = this.radius
        if (this.x > canvas.width - this.radius) this.x = canvas.width - this.radius
        if (this.y < this.radius) this.y = this.radius
        if (this.y > canvas.height - this.radius) this.y = canvas.height - this.radius
      }

      draw() {
        if (!ctx) return

        // Draw circle
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)

        // Create gradient
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)

        const baseColor = this.skill.color
        gradient.addColorStop(0, this.highlighted ? baseColor : baseColor + "99")
        gradient.addColorStop(1, this.highlighted ? baseColor + "80" : baseColor + "40")

        ctx.fillStyle = gradient
        ctx.fill()

        // Draw border
        ctx.strokeStyle = this.highlighted ? this.skill.color : this.skill.color + "60"
        ctx.lineWidth = this.highlighted ? 3 : 1
        ctx.stroke()

        // Draw text
        ctx.fillStyle = "#ffffff"
        ctx.font = `${this.highlighted ? "bold " : ""}${Math.max(12, this.radius / 2)}px sans-serif`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(this.skill.name, this.x, this.y)
      }
    }

    class Connection {
      nodeA: Node
      nodeB: Node
      strength: number

      constructor(nodeA: Node, nodeB: Node) {
        this.nodeA = nodeA
        this.nodeB = nodeB

        // Calculate connection strength based on category similarity
        this.strength = nodeA.skill.category === nodeB.skill.category ? 0.8 : 0.3
      }

      draw() {
        if (!ctx) return

        const dx = this.nodeB.x - this.nodeA.x
        const dy = this.nodeB.y - this.nodeA.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Only draw connections within a certain distance
        if (distance < 250) {
          const opacity = (1 - distance / 250) * this.strength

          // Create gradient line
          const gradient = ctx.createLinearGradient(this.nodeA.x, this.nodeA.y, this.nodeB.x, this.nodeB.y)

          gradient.addColorStop(
            0,
            this.nodeA.skill.color +
              Math.floor(opacity * 255)
                .toString(16)
                .padStart(2, "0"),
          )
          gradient.addColorStop(
            1,
            this.nodeB.skill.color +
              Math.floor(opacity * 255)
                .toString(16)
                .padStart(2, "0"),
          )

          ctx.beginPath()
          ctx.strokeStyle = gradient
          ctx.lineWidth = opacity * 3
          ctx.moveTo(this.nodeA.x, this.nodeA.y)
          ctx.lineTo(this.nodeB.x, this.nodeB.y)
          ctx.stroke()
        }
      }
    }

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initNodes()
    }

    function initNodes() {
      nodes = skills.map((skill) => new Node(skill))

      // Create connections between nodes
      connections = []
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          connections.push(new Connection(nodes[i], nodes[j]))
        }
      }

      // Position nodes in a more organized way
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(canvas.width, canvas.height) * 0.35

      nodes.forEach((node, index) => {
        const angle = (index / nodes.length) * Math.PI * 2
        node.targetX = centerX + Math.cos(angle) * radius
        node.targetY = centerY + Math.sin(angle) * radius
      })
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      let hoveredNode = null

      // Check if mouse is over any node
      for (const node of nodes) {
        const dx = mouseX - node.x
        const dy = mouseY - node.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < node.radius) {
          hoveredNode = node
          break
        }
      }

      // Update highlighted state
      for (const node of nodes) {
        node.highlighted = node === hoveredNode
      }

      // Update selected skill for detail display
      setSelectedSkill(hoveredNode ? hoveredNode.skill : null)

      // If a node is hovered, repel other nodes slightly
      if (hoveredNode) {
        for (const node of nodes) {
          if (node !== hoveredNode) {
            const dx = node.x - hoveredNode.x
            const dy = node.y - hoveredNode.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 150) {
              const angle = Math.atan2(dy, dx)
              const force = (150 - distance) / 1500
              node.targetX += Math.cos(angle) * force * 50
              node.targetY += Math.sin(angle) * force * 50
            }
          }
        }
      }
    })

    canvas.addEventListener("click", (e) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      // Check if a node was clicked
      for (const node of nodes) {
        const dx = mouseX - node.x
        const dy = mouseY - node.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < node.radius) {
          setSelectedSkill(node.skill)
          break
        }
      }
    })

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections first (behind nodes)
      for (const connection of connections) {
        connection.draw()
      }

      // Update and draw nodes
      for (const node of nodes) {
        node.update()
        node.draw()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", () => {})
      canvas.removeEventListener("click", () => {})
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="skills" ref={ref} className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
            Skills & Expertise
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-card/30 backdrop-blur-sm rounded-xl border border-primary/10 overflow-hidden h-[500px] relative">
            <canvas ref={canvasRef} className="w-full h-full cursor-pointer" />
          </div>

          <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-primary/10 p-6 h-[500px] overflow-auto">
            {selectedSkill ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <h3 className="text-2xl font-bold mb-2" style={{ color: selectedSkill.color }}>
                   {selectedSkill.name}
                </h3>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                    {selectedSkill.category}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${selectedSkill.level}%`,
                        backgroundColor: selectedSkill.color,
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-foreground/80 dark:text-foreground/60">
                    <span>Beginner</span>
                    <span>Advanced</span>
                  </div>
                </div>

                <p className="dark:text-foreground/80 text-black">{selectedSkill.description}</p>
              </motion.div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="h-full flex flex-col justify-center"
              >
                <motion.h3
                  variants={itemVariants}
                  className="text-xl font-medium mb-4 text-center dark:text-foreground/80 text-black"
                >
                  Hover or click on a skill node to see details
                </motion.h3>

                <motion.div variants={itemVariants} className="text-center dark:text-foreground/60 text-black">
                  <p>The interactive graph visualizes my technical skills and their relationships.</p>
                  <p className="mt-2">Skills in the same category have stronger connections.</p>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

