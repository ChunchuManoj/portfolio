"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap, Calendar } from "lucide-react"

type Experience = {
  title: string
  company: string
  period: string
  description: string
  type: "work" | "education" | "internship"
  skills?: string[]
}

const experiences: Experience[] = [
  {
    title: "Web Development Intern",
    company: "CodSoft",
    period: "Jun 2024 - Jul 2024",
    description:
      "Developed responsive, high-performance websites using HTML, CSS, and JavaScript, enhancing user experience and reducing page load times.",
    type: "internship",
    skills: ["HTML", "CSS", "JavaScript", "Responsive Design"],
  },
  {
    title: "Artificial Intelligence Intern",
    company: "IBM Skills Build",
    period: "Aug 2023 - Oct 2023",
    description:
      "Built and deployed AI-driven solutions for data analysis, delivering actionable business insights. Collaborated with developers and data scientists to deliver accurate predictions, enhancing the reliability of AI models.",
    type: "internship",
    skills: ["AI", "Data Analysis", "Machine Learning", "Collaboration"],
  },
  {
    title: "Artificial Intelligence Intern",
    company: "Math Works",
    period: "May 2023 - Sep 2023",
    description:
      "Applied advanced machine learning algorithms to solve real-world AI challenges, improving model efficiency.",
    type: "internship",
    skills: ["Machine Learning", "Algorithm Design", "Problem Solving"],
  },
  {
    title: "Subject Matter Expert",
    company: "Chegg",
    period: "Mar 2022 - Jul 2023",
    description:
      "Delivered solutions for complex subject-related queries using strong analytical and problem-solving skills, resulting in improved client satisfaction. Enhanced technical communication by explaining solutions with clarity and accuracy.",
    type: "work",
    skills: ["Problem Solving", "Technical Communication", "Analysis"],
  },
  {
    title: "Bachelor of Technology",
    company: "Nalla Malla Reddy College",
    period: "Aug 2021 - May 2025",
    description:
      "Computer Science and Engineering with a focus on software development, data analysis, and artificial intelligence. CGPA: 8.15/10",
    type: "education",
  },
  {
    title: "Intermediate",
    company: "Sr Junior College, Medchal",
    period: "May 2019 - Nov 2021",
    description: "Completed indermidiate in MPC education with a GPA of 8.94/10.",
    type: "education",
  },
  {
    title: "Secondary School",
    company: "TSMS Gundala",
    period: "Mar 2019",
    description: "Completed senior secondary education with a GPA of 9.3/10.",
    type: "education",
  },
]

export default function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="experience" ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              Experience & Education
            </span>
          </h2>
          <p className="mt-4 dark:text-foreground/70 text-black max-w-2xl mx-auto">
            My professional journey and educational background.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary/80 via-primary/50 to-primary/20" />

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <TimelineItem
                key={index}
                experience={experience}
                index={index}
                isInView={isInView}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineItem({
  experience,
  index,
  isInView,
  isLeft,
}: {
  experience: Experience
  index: number
  isInView: boolean
  isLeft: boolean
}) {
  const getIcon = () => {
    switch (experience.type) {
      case "work":
        return <Briefcase className="w-6 h-6" />
      case "education":
        return <GraduationCap className="w-6 h-6" />
      case "internship":
        return <Briefcase className="w-6 h-6" />
    }
  }

  const getColor = () => {
    switch (experience.type) {
      case "work":
        return "from-blue-500 to-blue-600"
      case "education":
        return "from-purple-500 to-purple-600"
      case "internship":
        return "from-primary to-primary-foreground"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: isLeft ? -20 : 20 }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 50, x: isLeft ? -20 : 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}
    >
      <div className={`w-1/2 ${isLeft ? "pr-8 text-right" : "pl-8"}`}>
        <Card className="overflow-hidden border-primary/10 bg-card/30 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold">{experience.title}</h3>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {experience.type}
              </Badge>
            </div>

            <div className="mb-4">
              <div className="text-lg font-medium text-foreground/80">{experience.company}</div>
              <div className="flex items-center text-sm text-foreground/60">
                <Calendar className="w-3 h-3 mr-1" />
                {experience.period}
              </div>
            </div>

            <p className="dark:text-foreground/70 text-black mb-4">{experience.description}</p>

            {experience.skills && (
              <div className="flex flex-wrap gap-2 mt-4">
                {experience.skills.map((skill, i) => (
                  <Badge key={i} variant="secondary" className="bg-secondary/20">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="relative flex items-center justify-center z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          className={`w-12 h-12 rounded-full bg-gradient-to-br ${getColor()} flex items-center justify-center text-white`}
        >
          {getIcon()}
        </motion.div>
      </div>

      <div className="w-1/2" />
    </motion.div>
  )
}

