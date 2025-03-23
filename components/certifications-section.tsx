"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar, ExternalLink } from "lucide-react"

type Certification = {
  title: string
  issuer: string
  date: string
  description: string
  skills: string[]
  credentialUrl?: string
  credentialId?: string
  image: string
}

const certifications: Certification[] = [
  {
    title: "Google Project Management",
    issuer: "Coursera - Google",
    date: "Aug 2024",
    description:
      "Professional certification covering project management methodologies, tools, and best practices. Completed comprehensive coursework in both traditional and Agile project management.",
    skills: ["Project Management", "Agile", "Scrum", "Leadership"],
    credentialUrl: "https://www.coursera.org/account/accomplishments/professional-cert/R7EZEPAYDWGU",
    credentialId: "R7EZEPAYDWGU",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Google%20Project%20Management-UydTc8hFhmN5exQakosdxdeGe5nFVN.jpeg",
  },
  {
    title: "Google Data Analytics",
    issuer: "Coursera - Google",
    date: "Feb 2024",
    description:
      "Comprehensive data analytics program covering data cleaning, analysis, and visualization using various tools and techniques.",
    skills: ["Data Analysis", "SQL", "R", "Tableau"],
    credentialUrl: "https://www.coursera.org/account/accomplishments/professional-cert/ANPZP5XQCEYA",
    credentialId: "ANPZP5XQCEYA",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Google%20Data%20Analytics-kLlFRkXeIGX7OcZLMfg4kgprwXkJnM.jpeg",
  },
  {
    title: "SQL Essential Training",
    issuer: "LinkedIn Learning",
    date: "Mar 2025",
    description: "Advanced SQL course covering database design, complex queries, and performance optimization.",
    skills: ["SQL", "Database Design", "Query Optimization"],
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/bfe63428d7e39989513c06df01b8290ad9857318584f255488f71dc51a6edd6c",
    credentialId: "bfe63428d7e3",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SQL%20Essential%20Training-1OzwJ20ZAoYYcX8OelbGlvOPaHKt3K.jpeg",
  },
  {
    title: "TCS ION Career Edge",
    issuer: "TCS ION",
    date: "Jul 2023",
    description:
      "Comprehensive professional development program covering communication, soft skills, and technical fundamentals.",
    skills: ["Communication", "Soft Skills", "Business Etiquette", "IT Skills"],
    credentialUrl: "https://drive.google.com/file/d/1X7yDDAi2JcnlPrLqeoUW0bT410DDiqro/view",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TCS%20ION%20Career%20Edge-h2iXKfXc29vaHmqtuFerriP7fk9sPA.png",
  },
]

export default function CertificationsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="certifications" ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              Certifications & Courses
            </span>
          </h2>
          <p className="mt-4 dark:text-foreground/70 text-black max-w-2xl mx-auto">
            Professional certifications and courses that have enhanced my skills and knowledge.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <CertificationCard key={index} certification={cert} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CertificationCard({
  certification,
  index,
  isInView,
}: {
  certification: Certification
  index: number
  isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.5) }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="overflow-hidden h-full border-primary/10 bg-card/30 backdrop-blur-xl">
        <CardContent className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{certification.title}</h3>
              <p className="text-foreground/70">{certification.issuer}</p>
              <div className="flex items-center text-sm text-foreground/60 mt-1">
                <Calendar className="w-3 h-3 mr-1" />
                {certification.date}
              </div>
            </div>
          </div>

          <div className="mb-4 relative overflow-hidden rounded-lg h-40">
            <img
              src={certification.image || "/placeholder.svg"}
              alt={certification.title}
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            />
          </div>

          <p className="dark:text-foreground/80 text-black mb-4">{certification.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {certification.skills.map((skill, i) => (
              <Badge
                key={i}
                variant="outline"
                className="bg-primary/10 text-primary border-primary/20 transition-all duration-300 hover:bg-primary/20 hover:scale-105"
              >
                {skill}
              </Badge>
            ))}
          </div>

          {certification.credentialUrl && (
            <motion.a
              href={certification.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-primary hover:underline mt-2 group"
              whileHover={{ x: 5 }}
            >
              <ExternalLink className="w-3 h-3 mr-1 transition-transform group-hover:scale-110" />
              Verify Credential {certification.credentialId && `(ID: ${certification.credentialId})`}
            </motion.a>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

