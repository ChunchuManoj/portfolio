"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Send, MessageSquare, Phone, Code } from "lucide-react"

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hi there! How can I help you?", isUser: false },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // In the handleSubmit function, add a check for empty message
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!message || !message.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { text: message, isUser: true }])
    setMessage("")

    // Simulate AI response
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          text: "Thanks for your message! I'll get back to you as soon as possible.",
          isUser: false,
        },
      ])
    }, 1500)
  }

  // Scroll to bottom of messages


  return (
    <section id="contact" ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              Get In Touch
            </span>
          </h2>
          <p className="mt-4 dark:text-foreground/70 text-black max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="overflow-hidden border-primary/10 bg-card/30 backdrop-blur-xl h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <MessageSquare className="w-6 h-6 mr-2 text-primary" />
                  Chat with Me
                </h3>

                <div className="bg-background/50 rounded-lg p-4 h-[300px] overflow-y-auto mb-4">
                  {messages.map((msg, index) => (
                    <div key={index} className={`mb-4 flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.isUser ? "bg-primary text-primary-foreground" : "bg-secondary/30 text-foreground"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start mb-4">
                      <div className="bg-secondary/30 text-foreground max-w-[80%] rounded-lg p-3">
                        <span className="inline-flex gap-1">
                          <span className="animate-bounce">.</span>
                          <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
                            .
                          </span>
                          <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
                            .
                          </span>
                        </span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" className="hover:scale-105 transition-transform">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="overflow-hidden border-primary/10 bg-card/30 backdrop-blur-xl h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Mail className="w-6 h-6 mr-2 text-primary" />
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60">Phone</p>
                      <a href="tel:+918367092995" className="text-foreground hover:text-primary">
                        +91 8367092995
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60">Email</p>
                      <a href="mailto:chunchumanoj321@gmail.com" className="text-foreground hover:text-primary">
                        chunchumanoj321@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-lg font-medium mb-4">Connect with me</h4>
                  <div className="flex justify-center space-x-6">
                    <motion.a
                      href="https://github.com/ChunchuManoj"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -8, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-full bg-card flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                    >
                      <Github className="w-6 h-6" />
                    </motion.a>

                    <motion.a
                      href="https://www.linkedin.com/in/chunchu-manoj-4a66bb260/"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -8, rotate: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-full bg-card flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                    >
                      <Linkedin className="w-6 h-6" />
                    </motion.a>

                    <motion.a
                      href="https://leetcode.com/u/ManojChunchu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -8, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-full bg-card flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                    >
                      <Code className="w-6 h-6" />
                    </motion.a>

                    <motion.a
                      href="mailto:chunchumanoj321@gmail.com"
                      whileHover={{ scale: 1.2, y: -8, rotate: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-full bg-card flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                    >
                      <Mail className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

