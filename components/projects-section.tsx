"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"

type Project = {
  title: string
  description: string
  image: string
  technologies: string[]
  github?: string
  link?: string
}

const projects: Project[] = [
  {
  "title": "AI-Based Gift Recommendation Platform",
  "description": "An AI-powered web platform that provides personalized gift recommendations based on user preferences, occasions, and detailed survey data. Features include tailored suggestions using Google Gemini AI, user authentication, an admin dashboard, saved/favorite gifts, and a responsive, modern UI for seamless gift discovery.",
  "image": "/gift-recommendation-platform.png",
  "technologies": [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "MongoDB",
    "NextAuth.js",
    "Google Gemini API"
  ],
  "github": "https://github.com/ChunchuManoj/AI-Based-Gift-recommendation"
},
  {
    title: "AI Powered Portfolio",
    description:
      "This portfolio website is designed to highlight the professional journey of Chunchu Manoj. It includes sections for skills, projects, certifications, experience, and contact information.",
    image: "/portfolio.png",
    technologies: ["React","Next.js","TypeScript","Tailwind CSS","Framer Motion","Lucide React"],
    github: "https://github.com/ChunchuManoj/portfolio"
  },
  {
    title: "Personal Portfolio",
    description:
      "A personal portfolio that showcase my skills, projects, intrests and can help you connect with me.",
    image: "/portfolio_old.png",
    technologies: ["HTML","CSS","JS"],
    github: "https://github.com/ChunchuManoj/Portfolio_old"
  },
  {
    title: "Teacher Track Smart Board",
    description:
      "A gesture-based smart board system enabling touch-free control for writing, drawing, and erasing tasks, integrated with secure teacher identification using wearables. Achieved 95% accuracy in gesture recognition, enhancing classroom interactivity.",
    image: "/gesture.png",
    technologies: ["Python", "MediaPipe", "OpenCV", "YOLOv11", "Deep Learning"],
    github: "https://github.com/ChunchuManoj/Gesture-Based-Drawing-Using-Object-Detection",
  },
  {
    title: "Connect Work",
    description:
      "A web application to securely connect customers with service providers. Implemented email verification and authentication using PHP Mailer and hashing algorithms, achieving a 97% match success rate.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Connect%20Work-KhQr4LMXl3dHrmgyt2x31EEHiu6Rfp.png",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "SQL"],
    github: "https://github.com/ChunchuManoj/Connect-Work",
  },
  {
    title: "Online Code Editor",
    description:
      "Interactive code editor with real-time preview and syntax highlighting. Built with modern web technologies for an optimal development experience.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Live%20Dode%20Editor-jKxq42t4I6Aw3eVvYXXJMtLZMBOHGF.png",
    technologies: ["React", "JavaScript", "HTML", "CSS", "CodeMirror"],
    github: "https://github.com/ChunchuManoj/Online-_code_editor",
  },
  {
    title: "To Do List",
    description:
      "Feature-rich task management application with filtering, status tracking, and data persistence. Clean and intuitive interface for efficient task organization.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/To%20Do%20List-sEZwiNtZJKB4Gv7gkH7pHUTUCSv1Qx.png",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Local Storage"],
    github: "https://github.com/ChunchuManoj/To_Do_List_Web_app",
  },
]

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="projects" ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              Featured Projects
            </span>
          </h2>
          <p className="mt-4 dark:text-foreground/70 text-black max-w-2xl mx-auto">
            Explore my latest work showcasing my skills in software development, AI, and web technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index, isInView }: { project: Project; index: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        y: -10,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.2 },
      }}
      className="group"
    >
      <Card className="overflow-hidden h-full border-primary/10 bg-card/30 backdrop-blur-xl transition-all duration-300">
        <div className="relative overflow-hidden h-48">
          <motion.div
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.4 },
            }}
            className="w-full h-full"
          >
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-cover transition-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </motion.div>

          <div className="absolute bottom-0 left-0 w-full p-4 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">{project.title}</h3>

            <div className="flex space-x-2">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black/30 backdrop-blur-sm p-2 rounded-full text-white hover:bg-primary/80 transition-colors hover:shadow-lg hover:shadow-primary/20"
                >
                  <Github className="w-4 h-4" />
                </motion.a>
              )}

              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black/30 backdrop-blur-sm p-2 rounded-full text-white hover:bg-primary/80 transition-colors hover:shadow-lg hover:shadow-primary/20"
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              )}
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <p className="dark:text-foreground/80 text-black mb-4">{project.description}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {project.technologies.map((tech, i) => (
              <Badge
                key={i}
                variant="outline"
                className="bg-primary/10 text-primary border-primary/20 transition-all duration-300 hover:bg-primary/20 hover:scale-105"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

